import express from 'express'
import db from '../db.js'
import {
  getLocale,
  isRaw,
  localizeCategory,
  localizeListItem,
  localizeDetail,
  mergeI18nField
} from '../lib/localize.js'

const router = express.Router()

router.get('/categories', async (req, res) => {
  await db.read()
  const locale = getLocale(req)
  const raw = isRaw(req)
  const categories = db.data.products.categories
    .filter((c) => c.status === 1)
    .map((c) => (raw ? c : localizeCategory(c, locale)))
  res.json(categories)
})

router.post('/categories', async (req, res) => {
  await db.read()

  const { name, description, parent_id, ...rest } = req.body
  const newCategory = {
    id: Date.now(),
    ...rest,
    name: mergeI18nField(undefined, name ?? ''),
    description: mergeI18nField(undefined, description ?? ''),
    parent_id: parent_id ?? 0,
    create_time: new Date().toLocaleString('zh-CN'),
    status: 1
  }

  db.data.products.categories.push(newCategory)
  await db.write()

  res.json({ success: true, data: newCategory })
})

router.put('/categories/:id', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const index = db.data.products.categories.findIndex((c) => c.id === id)

  if (index === -1) {
    return res.status(404).json({ success: false, message: '分类不存在' })
  }

  const prev = db.data.products.categories[index]
  db.data.products.categories[index] = {
    ...prev,
    ...req.body,
    name: mergeI18nField(prev.name, req.body.name !== undefined ? req.body.name : prev.name),
    description: mergeI18nField(
      prev.description,
      req.body.description !== undefined ? req.body.description : prev.description
    )
  }
  await db.write()

  res.json({ success: true, data: db.data.products.categories[index] })
})

router.delete('/categories/:id', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const index = db.data.products.categories.findIndex((c) => c.id === id)

  if (index === -1) {
    return res.status(404).json({ success: false, message: '分类不存在' })
  }

  db.data.products.categories[index].status = 0
  await db.write()

  res.json({ success: true, message: '删除成功' })
})

router.get('/:id/detail', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const detail = db.data.products.details.find((d) => d.id === id && d.status === 1)

  if (!detail) {
    return res.json({ success: false, message: '暂无详情' })
  }

  const locale = getLocale(req)
  const raw = isRaw(req)
  res.json({ success: true, data: raw ? detail : localizeDetail(detail, locale) })
})

router.put('/:id/detail', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)

  const existingIndex = db.data.products.details.findIndex((d) => d.id === id)

  if (existingIndex !== -1) {
    const prev = db.data.products.details[existingIndex]
    db.data.products.details[existingIndex] = {
      ...prev,
      ...req.body,
      title: mergeI18nField(prev.title, req.body.title !== undefined ? req.body.title : prev.title),
      description: mergeI18nField(
        prev.description,
        req.body.description !== undefined ? req.body.description : prev.description
      ),
      update_time: new Date().toLocaleString('zh-CN')
    }
  } else {
    const { title, description, ...rest } = req.body
    const newDetail = {
      id,
      ...rest,
      title: mergeI18nField(undefined, title ?? ''),
      description: mergeI18nField(undefined, description ?? ''),
      create_time: new Date().toLocaleString('zh-CN'),
      update_time: new Date().toLocaleString('zh-CN'),
      status: 1
    }
    db.data.products.details.push(newDetail)
  }

  await db.write()

  res.json({ success: true, message: '保存成功' })
})

router.delete('/:id/detail', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const index = db.data.products.details.findIndex((d) => d.id === id)

  if (index === -1) {
    return res.status(404).json({ success: false, message: '详情不存在' })
  }

  db.data.products.details[index].status = 0
  await db.write()

  res.json({ success: true, message: '删除成功' })
})

router.get('/', async (req, res) => {
  await db.read()
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 9
  const category_id = req.query.category_id ? parseInt(req.query.category_id) : null
  const locale = getLocale(req)
  const raw = isRaw(req)

  let filteredProducts = db.data.products.list.filter((p) => p.status === 1)

  if (category_id) {
    const getAllCategoryIds = (categoryId) => {
      const categoryIds = [categoryId]
      const categories = db.data.products.categories

      const findChildren = (parentId) => {
        const children = categories.filter((c) => c.parent_id === parentId)
        children.forEach((child) => {
          categoryIds.push(child.id)
          findChildren(child.id)
        })
      }

      findChildren(categoryId)
      return categoryIds
    }

    const categoryIds = getAllCategoryIds(category_id)
    filteredProducts = filteredProducts.filter((p) => categoryIds.includes(p.category_id))
  }

  const total = filteredProducts.length
  const totalPages = Math.ceil(total / pageSize)
  const startIndex = (page - 1) * pageSize
  const slice = filteredProducts.slice(startIndex, startIndex + pageSize)
  const paginatedProducts = raw ? slice : slice.map((p) => localizeListItem(p, locale))

  res.json({
    pagination: {
      page,
      pageSize,
      total,
      totalPages
    },
    products: paginatedProducts
  })
})

router.get('/:id', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const product = db.data.products.list.find((p) => p.id === id && p.status === 1)

  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }

  const locale = getLocale(req)
  const raw = isRaw(req)
  res.json(raw ? product : localizeListItem(product, locale))
})

router.get('/:id/details', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const productDetail = db.data.products.details.find((d) => d.id === id && d.status === 1)

  if (!productDetail) {
    return res.status(404).json({ error: 'Product detail not found' })
  }

  const locale = getLocale(req)
  const raw = isRaw(req)
  res.json(raw ? productDetail : localizeDetail(productDetail, locale))
})

router.get('/:id/materials', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const productMaterialsList = db.data.products.materials.filter((m) => m.product_id === id && m.status === 1)

  res.json(productMaterialsList)
})

router.post('/', async (req, res) => {
  await db.read()

  const { title, description, ...rest } = req.body
  const newProduct = {
    id: Date.now(),
    ...rest,
    title: mergeI18nField(undefined, title ?? ''),
    description: mergeI18nField(undefined, description ?? ''),
    create_time: new Date().toLocaleString('zh-CN'),
    status: 1
  }

  db.data.products.list.push(newProduct)
  await db.write()

  res.json({ success: true, data: newProduct })
})

router.put('/:id', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const index = db.data.products.list.findIndex((p) => p.id === id)

  if (index === -1) {
    return res.status(404).json({ success: false, message: '产品不存在' })
  }

  const prev = db.data.products.list[index]
  db.data.products.list[index] = {
    ...prev,
    ...req.body,
    title: mergeI18nField(prev.title, req.body.title !== undefined ? req.body.title : prev.title),
    description: mergeI18nField(
      prev.description,
      req.body.description !== undefined ? req.body.description : prev.description
    )
  }
  await db.write()

  res.json({ success: true, data: db.data.products.list[index] })
})

router.delete('/:id', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const index = db.data.products.list.findIndex((p) => p.id === id)

  if (index === -1) {
    return res.status(404).json({ success: false, message: '产品不存在' })
  }

  db.data.products.list[index].status = 0
  await db.write()

  res.json({ success: true, message: '删除成功' })
})

router.post('/:id/materials', async (req, res) => {
  await db.read()
  const productId = parseInt(req.params.id)

  const newMaterial = {
    id: Date.now(),
    product_id: productId,
    ...req.body,
    create_time: new Date().toLocaleString('zh-CN'),
    status: 1
  }

  db.data.products.materials.push(newMaterial)
  await db.write()

  res.json({ success: true, data: newMaterial })
})

router.delete('/:id/materials/:materialId', async (req, res) => {
  await db.read()
  const materialId = parseInt(req.params.materialId)
  const index = db.data.products.materials.findIndex((m) => m.id === materialId)

  if (index === -1) {
    return res.status(404).json({ success: false, message: '素材不存在' })
  }

  db.data.products.materials[index].status = 0
  await db.write()

  res.json({ success: true, message: '删除成功' })
})

export default router
