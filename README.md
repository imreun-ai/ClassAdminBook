# ClassAdminBook (សៀវភៅរដ្ឋបាលថ្នាក់)

Single-file app (`index.html`) for making a teacher's administrative book: settings, front cover,
inner covers and printable forms (meeting minutes, technical meeting, text extracts, student absence,
score extracts, slow-learner support). Exports PDFs, individually or as one ZIP.

- Source of truth for the app is the Claude artifact; this repo keeps a copy of the code.
- Student, class and teacher data are read from a Google Sheet through the Claude "Google Sheets"
  connector. That connector exists only inside claude.ai, so on GitHub Pages or a local file the
  sheet sync is unavailable; the manual paste import and everything else still work.
- Saving PDF/ZIP uses the claude.ai downloads feature and is also limited to claude.ai.
- Settings are kept in the browser's localStorage.
