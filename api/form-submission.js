const nodemailer = require('nodemailer')

const FORM_METADATA = {
  contact: { name: 'Contact Us / Request a Demo', page: 'Home' },
  registration: { name: 'School Registration', page: 'School Registration' },
  quote: { name: 'Request a Quote', page: 'Sales' },
  meeting: { name: 'Book a Meeting', page: 'Sales' }
}

const idempotencyKeys = new Map()
const IDEMPOTENCY_TTL_MS = 10 * 60 * 1000
const MAX_IDEMPOTENCY_KEYS = 1000
let transporter

function getEmailConfiguration() {
  const user = process.env.GMAIL_USER
  const password = process.env.GMAIL_APP_PASSWORD
  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || 'kushagrasaxena0913@gmail.com'

  if (!user || !password) {
    return null
  }

  return { user, password: password.replace(/\s/g, ''), recipient }
}

function getTransporter(configuration) {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: configuration.user,
        pass: configuration.password
      }
    })
  }

  return transporter
}

function getValidatedFields(fields) {
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    return null
  }

  const entries = Object.entries(fields)
  if (entries.length === 0 || entries.length > 50) {
    return null
  }

  const validatedFields = []
  for (const [name, value] of entries) {
    if (
      typeof name !== 'string' ||
      name.trim().length === 0 ||
      name.length > 80 ||
      /[\r\n]/.test(name)
    ) {
      return null
    }

    if (typeof value === 'string' && value.length <= 5000) {
      validatedFields.push([name, value])
    } else if (
      Array.isArray(value) &&
      value.length <= 50 &&
      value.every(item => typeof item === 'string' && item.length <= 200)
    ) {
      validatedFields.push([name, value.join(', ')])
    } else {
      return null
    }
  }

  return validatedFields
}

function clearExpiredIdempotencyKeys(now) {
  for (const [key, expiresAt] of idempotencyKeys) {
    if (expiresAt <= now) {
      idempotencyKeys.delete(key)
    }
  }

  while (idempotencyKeys.size >= MAX_IDEMPOTENCY_KEYS) {
    idempotencyKeys.delete(idempotencyKeys.keys().next().value)
  }
}

module.exports = async function formSubmission(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, message: 'Method not allowed.' })
  }

  const body = req.body
  const form = body && FORM_METADATA[body.formId]
  const fields = getValidatedFields(body && body.fields)
  const submissionId = body && body.submissionId

  if (
    !form ||
    !fields ||
    typeof submissionId !== 'string' ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(submissionId)
  ) {
    return res.status(400).json({ success: false, message: 'Invalid form submission.' })
  }

  const now = Date.now()
  clearExpiredIdempotencyKeys(now)
  if (idempotencyKeys.has(submissionId)) {
    return res.status(200).json({ success: true, duplicate: true })
  }

  const configuration = getEmailConfiguration()
  if (!configuration) {
    console.error('[form-submission] Gmail SMTP environment variables are not configured.')
    return res.status(503).json({
      success: false,
      message: 'Form email notifications are not configured on the server. Please contact the website administrator.'
    })
  }

  idempotencyKeys.set(submissionId, now + IDEMPOTENCY_TTL_MS)

  const details = fields.map(([name, value]) => `${name}: ${value}`).join('\n')
  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'long',
    timeZone: 'Asia/Kolkata'
  })
  const text = [
    'New submission received on SAMAGRA website.',
    '',
    `Form Name: ${form.name}`,
    `Page: ${form.page}`,
    '',
    'Submission Details:',
    details,
    '',
    `Submission Date: ${submittedAt} (Asia/Kolkata)`
  ].join('\n')

  try {
    await getTransporter(configuration).sendMail({
      from: configuration.user,
      to: configuration.recipient,
      subject: 'New Form Submission – SAMAGRA',
      text
    })
    return res.status(200).json({ success: true })
  } catch (error) {
    idempotencyKeys.delete(submissionId)
    console.error('[form-submission] Gmail SMTP delivery failed.', {
      formId: body.formId,
      code: error.code,
      message: error.message
    })
    return res.status(502).json({ success: false, message: 'Email delivery is temporarily unavailable.' })
  }
}
