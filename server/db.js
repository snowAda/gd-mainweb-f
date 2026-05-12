import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dataFile = path.join(__dirname, 'data', 'db.json')

const adapter = new JSONFile(dataFile)
const db = new Low(adapter, {
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
})

await db.read()

db.data ||= {
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

await db.write()

export default db