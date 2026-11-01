const pendingSubmissions = new Map()
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkjjqaqr'

async function submitToFormspree(formId, fields) {
  const formspreeFields = new URLSearchParams()
  formspreeFields.set('_subject', `SAMAGRA ${formId} submission`)
  Object.entries(fields).forEach(([name, value]) => {
    formspreeFields.set(name, Array.isArray(value) ? value.join(', ') : value)
  })

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: formspreeFields
  })
  const responseBody = await response.text()
  let result

  try {
    result = JSON.parse(responseBody)
  } catch {
    throw new Error('Your request reached our team, but the Formspree notification could not be confirmed.')
  }

  if (!response.ok || result.ok !== true) {
    throw new Error('Your request reached our team, but the Formspree notification could not be delivered.')
  }
}

export async function submitForm(formId, fields) {
  if (pendingSubmissions.has(formId)) {
    return pendingSubmissions.get(formId)
  }

  const request = fetch('/api/form-submission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      formId,
      submissionId: window.crypto.randomUUID(),
      fields
    })
  })
    .then(async response => {
      const responseBody = await response.text()
      let result

      try {
        result = JSON.parse(responseBody)
      } catch {
        throw new Error('The form service is unavailable. Please contact the website administrator.')
      }

      if (!response.ok || result.success !== true) {
        throw new Error(result.message || 'Form submission could not be delivered.')
      }

      return result
    })
    .then(async result => {
      await submitToFormspree(formId, fields)
      return result
    })
    .finally(() => pendingSubmissions.delete(formId))

  pendingSubmissions.set(formId, request)
  return request
}
