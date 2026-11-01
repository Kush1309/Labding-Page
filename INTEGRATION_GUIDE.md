# SAMAGRA Form Email Notifications

All four website forms submit through the server-side `/api/form-submission`
endpoint:

| Form | Page |
| --- | --- |
| Contact Us / Request a Demo | Home |
| School Registration | School Registration |
| Request a Quote | Sales |
| Book a Meeting | Sales |

Each successful submission sends one plain-text notification to
`kushagrasaxena0913@gmail.com`. The message includes the form name, page, every
submitted field, and the submission time in India Standard Time. The API sends
the email before returning success; delivery errors are logged server-side and
the form reports a failure instead of claiming it was sent.

## SMTP configuration

Set these variables in the Vercel project's environment settings:

- `GMAIL_USER`: Gmail sender address
- `GMAIL_APP_PASSWORD`: Gmail App Password (not the account password)
- `ADMIN_NOTIFICATION_EMAIL`: recipient address; defaults to
  `kushagrasaxena0913@gmail.com`

Set them for every environment that needs to send mail, then redeploy. Keep the
values server-side. Do not use a `VITE_` prefix or commit credentials.

For local development, the Vite dev server exposes the same endpoint. Provide
the three variables in your local environment before running `npm run dev`.
The production frontend build does not include the credentials.

## Submission and storage behavior

The endpoint accepts only POST requests for the four known form IDs. It validates
the request, uses server-defined form/page names, and includes a unique request
ID to suppress replayed requests within the active serverless instance. The
frontend also coalesces concurrent submissions and disables its submit button
while a request is in progress. No shared database or durable idempotency store
is configured.

This project has no database or existing record-persistence API. Submissions
are emailed only; they are not saved to a database.

## Verification checklist

- Submit each form once and confirm the success status.
- Confirm each notification has the correct form name and page.
- Check that all submitted field values and the timestamp are present.
- Try an invalid request and verify it is rejected.
- Try with SMTP variables unset and verify the endpoint returns an error rather
  than a false success.
- Confirm no SMTP credential is present in frontend assets or browser requests.
