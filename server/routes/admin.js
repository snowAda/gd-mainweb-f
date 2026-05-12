import express from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const db = new Low(new JSONFile(join(__dirname, '../data/db.json')), {})

const generateToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

router.post('/login', async (req, res) => {
  await db.read()
  
  const { username, password } = req.body
  
  const admin = db.data.admin
  
  if (!admin) {
    return res.json({
      success: false,
      message: '管理员账户未配置'
    })
  }
  
  if (username === admin.username && password === admin.password) {
    const token = generateToken()
    db.data.admin.token = token
    await db.write()
    
    res.json({
      success: true,
      message: '登录成功',
      token: token
    })
  } else {
    res.json({
      success: false,
      message: '用户名或密码错误'
    })
  }
})

router.get('/admin/info', async (req, res) => {
  await db.read()
  
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: '未授权'
    })
  }
  
  const token = authHeader.substring(7)
  const admin = db.data.admin
  
  if (!admin || admin.token !== token) {
    return res.status(401).json({
      success: false,
      message: 'Token无效'
    })
  }
  
  res.json({
    success: true,
    data: {
      username: admin.username,
      role: 'admin'
    }
  })
})

export default router