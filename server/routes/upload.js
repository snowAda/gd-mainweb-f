import express from 'express'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

// 使用绝对路径，确保正确指向挂载目录
const PUBLIC_DIR = resolve(__dirname, '../../public')
const PRODUCTS_DIR = resolve(PUBLIC_DIR, 'products')
const SOLUTIONS_DIR = resolve(PUBLIC_DIR, 'solutions')

// 确保目录存在
if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true })
}
if (!fs.existsSync(SOLUTIONS_DIR)) {
  fs.mkdirSync(SOLUTIONS_DIR, { recursive: true })
}

console.log('=== 上传配置 ===')
console.log('__dirname:', __dirname)
console.log('PUBLIC_DIR:', PUBLIC_DIR)
console.log('PRODUCTS_DIR:', PRODUCTS_DIR)
console.log('SOLUTIONS_DIR:', SOLUTIONS_DIR)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.query.type || req.body.type || 'products'
    const dir = type === 'solutions' ? SOLUTIONS_DIR : PRODUCTS_DIR
    console.log('上传目录:', dir)
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    const filename = `${Date.now()}.${ext}`
    console.log('文件名:', filename)
    cb(null, filename)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/jpg', 'image/gif',
      'video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm'
    ]
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('只支持JPEG、PNG、JPG、GIF格式的图片和MP4、MPEG、MOV、WebM格式的视频'))
    }
  }
})

router.get('/env', (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    __dirname: __dirname,
    PUBLIC_DIR: PUBLIC_DIR,
    PRODUCTS_DIR: PRODUCTS_DIR,
    SOLUTIONS_DIR: SOLUTIONS_DIR
  })
})

router.post('/image', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      console.log('错误：没有上传文件')
      return res.json({ success: false, message: '请选择要上传的文件' })
    }
    
    console.log('上传文件:', req.file)
    
    const type = req.body.type || req.query.type || 'products'
    const prefix = type === 'solutions'
      ? 'http://www.guodong-cn.com/GD/solutions/'
      : 'http://www.guodong-cn.com/GD/products/'
    
    const url = prefix + req.file.filename
    
    const isImage = req.file.mimetype.startsWith('image/')
    const fileType = isImage ? 'image' : 'video'
    
    console.log('上传成功:', url)
    
    res.json({
      success: true,
      message: '上传成功',
      url: url,
      file_type: fileType
    })
  } catch (error) {
    console.error('上传错误:', error)
    res.json({ success: false, message: error.message })
  }
})

export default router
