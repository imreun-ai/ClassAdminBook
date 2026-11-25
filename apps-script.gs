const KEY = '';  // (ជម្រើស) ពាក្យសម្ងាត់ — ត្រូវដូចក្នុង App
const TABS = {subject: 'កិច្ចព្រមព្រៀង គ្រូមុខវិជ្ជា', homeroom: 'កិច្ចព្រមព្រៀង គ្រូបន្ទុកថ្នាក់'};
const HEAD = ['ឈ្មោះគ្រូ', 'មុខវិជ្ជា / ថ្នាក់', 'ធ្វើបច្ចុប្បន្នភាព', 'ទិន្នន័យ (JSON) ១', 'ទិន្នន័យ (JSON) ២', 'ទិន្នន័យ (JSON) ៣', 'ទិន្នន័យ (JSON) ៤'];
const norm = s => String(s).replace(/\s+/g, '');
function doPost(e) {
  let out;
  try {
    const r = JSON.parse(e.postData.contents);
    if (KEY && r.key !== KEY) throw new Error('ពាក្យសម្ងាត់មិនត្រូវ');
    const name = TABS[r.kind]; if (!name) throw new Error('kind');
    const ss = SpreadsheetApp.getActive();
    let sh = ss.getSheetByName(name);
    if (!sh) { sh = ss.insertSheet(name); sh.getRange(1, 1, 1, 7).setValues([HEAD]); sh.setFrozenRows(1); }
    const last = Math.max(sh.getLastRow(), 1);
    const names = last > 1 ? sh.getRange(2, 1, last - 1, 1).getValues().map(x => norm(x[0])) : [];
    const idx = names.indexOf(norm(r.teacher));
    if (r.op === 'save') {
      const ch = []; for (let i = 0; i < 4; i++) ch.push(String(r.data).slice(i * 40000, (i + 1) * 40000));
      const row = idx >= 0 ? idx + 2 : last + 1;
      sh.getRange(row, 1, 1, 7).setValues([[r.teacher, r.desc || '', Utilities.formatDate(new Date(), 'Asia/Phnom_Penh', 'dd/MM/yyyy HH:mm'), ch[0], ch[1], ch[2], ch[3]]]);
      out = {ok: true, row: row};
    } else if (r.op === 'load') {
      if (idx < 0) out = {ok: true, found: false};
      else { const v = sh.getRange(idx + 2, 1, 1, 7).getValues()[0]; out = {ok: true, found: true, at: String(v[2]), data: v.slice(3).join('')}; }
    } else throw new Error('op');
  } catch (err) { out = {ok: false, error: String(err.message || err)}; }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}