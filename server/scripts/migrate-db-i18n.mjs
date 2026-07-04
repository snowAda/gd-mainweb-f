/**
 * 将 db.json 中 name / title / description 转为 { zh-CN, en-US, ja-JP }
 * 运行: node server/scripts/migrate-db-i18n.mjs
 */
import { readFileSync, writeFileSync, copyFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { default as messages } from '../../src/i18n/messages.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, '../data/db.json')

function buildTriMap() {
  const zh = messages['zh-CN']
  const en = messages['en-US']
  const ja = messages['ja-JP']
  const map = new Map()
  for (const key of Object.keys(zh)) {
    const zv = zh[key]
    if (typeof zv !== 'string') continue
    const e = en[key]
    const j = ja[key]
    if (typeof e === 'string' && typeof j === 'string') {
      if (!map.has(zv)) map.set(zv, { 'zh-CN': zv, 'en-US': e, 'ja-JP': j })
    }
  }
  return map
}

const z = (s) => ({ 'zh-CN': s, 'en-US': s, 'ja-JP': s })

function buildManual() {
  const m = (zh, en, ja) => ({ 'zh-CN': zh, 'en-US': en, 'ja-JP': ja })
  return {
    科研与临床无缝协作: m(
      '科研与临床无缝协作',
      messages['en-US'].solutionItem1,
      messages['ja-JP'].solutionItem1
    ),
    全流程智能化诊断支持: m(
      '全流程智能化诊断支持',
      messages['en-US'].solutionItem2,
      messages['ja-JP'].solutionItem2
    ),
    加油站人车识别: m(
      '加油站人车识别',
      messages['en-US'].solutionCategory3Item2,
      messages['ja-JP'].solutionCategory3Item2
    ),
    生产卫生安全合规: m(
      '生产卫生安全合规',
      'Production sanitation and safety compliance',
      '生産衛生・安全コンプライアンス'
    ),
    视频转换网关: m(
      '视频转换网关',
      messages['en-US'].productCategory6,
      messages['ja-JP'].productCategory6
    ),
    明厨亮灶: m('明厨亮灶', 'Bright kitchen / open kitchen monitoring', '明厨亮竈（厨房モニタリング）'),
    物流快递: m('物流快递', 'Logistics and express delivery', '物流・宅配'),
    营业厅: m('营业厅', messages['en-US'].solutionCategory5Item4, messages['ja-JP'].solutionCategory5Item4),
    一级分类: m('一级分类', 'Primary category', '一次分類'),
    二级分类: m('二级分类', 'Secondary category', '二次分類'),
    测试: m('测试', 'Test', 'テスト')
  }
}

function toTri(str, triMap, manual) {
  if (typeof str !== 'string') return str
  if (manual[str]) return { ...manual[str] }
  if (triMap.has(str)) return { ...triMap.get(str) }
  return z(str)
}

function migrateRow(row, fields, triMap, manual) {
  const o = { ...row }
  for (const f of fields) {
    if (o[f] == null) continue
    if (typeof o[f] === 'object' && o[f] !== null && 'zh-CN' in o[f]) continue
    if (typeof o[f] === 'string') o[f] = toTri(o[f], triMap, manual)
  }
  return o
}

const triMap = buildTriMap()
const manual = buildManual()

const raw = readFileSync(dbPath, 'utf8')
const db = JSON.parse(raw)

for (const section of ['solutions', 'products']) {
  db[section].categories = db[section].categories.map((r) =>
    migrateRow(r, ['name', 'description'], triMap, manual)
  )
  db[section].list = db[section].list.map((r) =>
    migrateRow(r, ['title', 'description'], triMap, manual)
  )
  db[section].details = db[section].details.map((r) =>
    migrateRow(r, ['title', 'description'], triMap, manual)
  )
}

const backup = join(__dirname, '../data/db.json.bak-migrate-i18n')
copyFileSync(dbPath, backup)
writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8')
console.log('Migrated i18n fields. Backup:', backup)
