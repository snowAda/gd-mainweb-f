import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import solutionsRouter from './routes/solutions.js'
import productsRouter from './routes/products.js'
import adminRouter from './routes/admin.js'
import uploadRouter from './routes/upload.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 8002

app.use(cors())
app.use(express.json())

app.use('/api/solutions', solutionsRouter)
app.use('/api/products', productsRouter)
app.use('/api/upload', uploadRouter)
app.use('/api', adminRouter)

// 根据环境配置静态文件服务
const isProduction = process.env.NODE_ENV === 'production'
const DATA_DIR = isProduction 
  ? (process.env.DATA_DIR || '/data/www/guodong-cn.com/GD')
  : join(__dirname, '../public')

app.use('/GD/products', express.static(join(DATA_DIR, 'products')))
app.use('/GD/solutions', express.static(join(DATA_DIR, 'solutions')))
app.use('/img', express.static(join(__dirname, '../public')))

// 提供前端静态文件服务
app.use(express.static(join(__dirname, '../dist')))

// 处理所有其他路由，返回index.html（用于SPA应用）
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
