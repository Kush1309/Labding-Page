const pendingSubmissions = new Map()

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
      const result = await response.json()

      if (!response.ok || result.success !== true) {
        throw new Error(result.message || 'Form submission could not be delivered.')
      }

      return result
    })
    .finally(() => pendingSubmissions.delete(formId))

  pendingSubmissions.set(formId, request)
  return request
}
