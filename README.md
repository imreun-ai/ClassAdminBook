# ClassAdminBook (សៀវភៅរដ្ឋបាលថ្នាក់)

Single-file app (`index.html`) for making a teacher's administrative book: settings, front cover,
inner covers and printable forms (meeting minutes, technical meeting, text extracts, student absence,
score extracts, slow-learner support). Saves PDFs, individually or as one ZIP.

## Running
Open `index.html` in a browser, or serve the repo with GitHub Pages.

## Google Sheet
The app reads three tabs: `ឈ្មោះសិស្ស` (ល.រ, ឈ្មោះ, ភេទ, ថ្នាក់), `ថ្នាក់` (Class) and
`ឈ្មោះគ្រូ` (ឈ្មោះ, មុខវិជ្ជា, លេខទូរស័ព្ទ). Set the sheet URL in the Settings tab.

- Outside claude.ai it reads the sheet's CSV export, so the sheet must be shared as
  "Anyone with the link: Viewer".
- Inside claude.ai it uses the Google Sheets connector instead.

## Notes
- PDFs are page images (text is not selectable). Fonts and PDF/ZIP libraries load from CDNs, so the
  first run needs internet.
- Settings are kept in the browser's localStorage.
