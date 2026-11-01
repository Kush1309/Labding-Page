import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const require = createRequire(import.meta.url)
const formSubmissionHandler = require('./api/form-submission.js')

function localFormSubmission() {
  return {
    name: 'local-form-submission',
    configureServer(server) {
      server.middlewares.use('/api/form-submission', (req, res, next) => {
        const chunks = []
        let bodySize = 0
        let tooLarge = false

        req.on('data', chunk => {
          bodySize += chunk.length
          if (bodySize > 512 * 1024 && !tooLarge) {
            tooLarge = true
            res.statusCode = 413
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: false, message: 'Form submission is too large.' }))
            req.resume()
            return
          }
          if (!tooLarge) chunks.push(chunk)
        })

        req.on('end', async () => {
          if (tooLarge || res.writableEnded) return

          try {
            req.body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
          } catch {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: false, message: 'Invalid form submission.' }))
            return
          }

          const apiResponse = {
            setHeader: (name, value) => res.setHeader(name, value),
            status(code) {
              res.statusCode = code
              return this
            },
            json(payload) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(payload))
              return this
            }
          }

          try {
            await formSubmissionHandler(req, apiResponse)
          } catch (error) {
            next(error)
          }
        })
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), localFormSubmission()],
  build: {
    target: 'es2015'
  },
  server: {
    port: 3000,
    open: true
  }
})
