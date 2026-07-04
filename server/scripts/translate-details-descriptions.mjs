/**
 * 将 solutions.details / products.details 中 description 的 en-US、ja-JP
 * 按 zh-CN 通过 Google 翻译接口生成（结构不变）。
 *
 * 用法: node server/scripts/translate-details-descriptions.mjs
 * 需可访问外网；运行前自动备份 db.json。
 */
import { readFileSync, writeFileSync, copyFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { translate } from 'google-translate-api-x'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, '../data/db.json')

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

/** 按行合并成不超过 maxLen 的块，避免在汉字中间硬切 */
function splitForTranslate(text, maxLen = 3200) {
  const lines = text.split('\n')
  const groups = []
  let cur = ''
  for (const line of lines) {
    const next = cur + (cur ? '\n' : '') + line
    if (next.length > maxLen && cur) {
      groups.push(cur)
      cur = line
    } else {
      cur = next
    }
  }
  if (cur) groups.push(cur)
  return groups.length ? groups : [text]
}

async function translateZhTo(zhText, toLang) {
  if (!zhText || !String(zhText).trim()) return zhText
  const paragraphs = zhText.split(/\n\n/)
  const outParas = []
  for (const para of paragraphs) {
    if (!para.trim()) {
      outParas.push(para)
      continue
    }
    const groups = splitForTranslate(para)
    const merged = []
    for (const g of groups) {
      const chunk = g.trimEnd()
      if (!chunk) continue
      const res = await translate(chunk, { from: 'zh-CN', to: toLang })
      merged.push(res.text)
      await delay(400)
    }
    outParas.push(merged.join('\n'))
  }
  return outParas.join('\n\n')
}

async function processDetailsArray(details, label) {
  const out = []
  for (let idx = 0; idx < details.length; idx++) {
    const item = details[idx]
    const d = item.description
    if (!d || typeof d !== 'object' || typeof d['zh-CN'] !== 'string') {
      console.log(`  [skip] ${label} id=${item.id} (no i18n description)`)
      out.push(item)
      continue
    }
    const zh = d['zh-CN']
    console.log(`  [translate] ${label} id=${item.id} (${zh.length} chars zh)`)
    const en = await translateZhTo(zh, 'en')
    const ja = await translateZhTo(zh, 'ja')
    out.push({
      ...item,
      description: {
        'zh-CN': zh,
        'en-US': en,
        'ja-JP': ja
      }
    })
  }
  return out
}

async function main() {
  const raw = readFileSync(dbPath, 'utf8')
  const db = JSON.parse(raw)

  const backup = join(__dirname, '../data/db.json.bak-before-detail-translate')
  copyFileSync(dbPath, backup)
  console.log('Backup:', backup)

  console.log('Translating solutions.details...')
  db.solutions.details = await processDetailsArray(db.solutions.details, 'solutions')

  console.log('Translating products.details...')
  db.products.details = await processDetailsArray(db.products.details, 'products')

  writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8')
  console.log('Done. Updated', dbPath)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
