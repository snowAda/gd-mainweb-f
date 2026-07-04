import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dataFile = path.join(__dirname, 'data', 'db.json')

const defaultData = {
  solutions: {
    categories: [],
    list: [],
    details: [],
    materials: []
  },
  products: {
    categories: [],
    list: [],
    details: [],
    materials: []
  }
}

const adapter = new JSONFile(dataFile)
const db = new Low(adapter, defaultData)

/** 合并手工编辑后缺失的键，避免 routes 对 undefined 调用 .filter */
function normalizeDbData(data) {
  if (!data || typeof data !== 'object') {
    return { ...defaultData }
  }
  if (!data.solutions || typeof data.solutions !== 'object') data.solutions = {}
  const s = data.solutions
  s.categories = Array.isArray(s.categories) ? s.categories : []
  s.list = Array.isArray(s.list) ? s.list : []
  s.details = Array.isArray(s.details) ? s.details : []
  s.materials = Array.isArray(s.materials) ? s.materials : []

  if (!data.products || typeof data.products !== 'object') data.products = {}
  const p = data.products
  p.categories = Array.isArray(p.categories) ? p.categories : []
  p.list = Array.isArray(p.list) ? p.list : []
  p.details = Array.isArray(p.details) ? p.details : []
  p.materials = Array.isArray(p.materials) ? p.materials : []

  return data
}

const _read = db.read.bind(db)
db.read = async () => {
  await _read()
  normalizeDbData(db.data)
}

await db.read()

db.data ||= structuredClone(defaultData)
normalizeDbData(db.data)

await db.write()

export default db