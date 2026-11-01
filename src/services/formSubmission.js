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
    throw new Error('Formspree returned an unexpected response. Please try again.')
  }

  if (!response.ok || result.ok !== true) {
    throw new Error('Formspree could not deliver your request. Please try again.')
  }
}

async function submitToBackend(formId, fields) {
  const response = await fetch('/api/form-submission', {
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
  const responseBody = await response.text()
  let result

  try {
    result = JSON.parse(responseBody)
  } catch {
    throw new Error('The existing server notification returned an unexpected response.')
  }

  if (!response.ok || result.success !== true) {
    throw new Error(result.message || 'The existing server notification could not be delivered.')
  }

  return result
}

export async function submitForm(formId, fields) {
  if (pendingSubmissions.has(formId)) {
    return pendingSubmissions.get(formId)
  }

  const request = Promise.allSettled([
    submitToBackend(formId, fields),
    submitToFormspree(formId, fields)
  ])
    .then(([backendResult, formspreeResult]) => {
      if (backendResult.status === 'rejected') {
        console.warn('[form-submission] Existing server notification failed; Formspree was attempted.', backendResult.reason)
      }

      if (formspreeResult.status === 'rejected') {
        throw formspreeResult.reason
      }

      return backendResult.status === 'fulfilled'
        ? backendResult.value
        : { success: true }
    })
    .finally(() => pendingSubmissions.delete(formId))

  pendingSubmissions.set(formId, request)
  return request
}
