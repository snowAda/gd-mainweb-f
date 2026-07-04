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
  const categories = db.data.solutions.categories
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

  db.data.solutions.categories.push(newCategory)
  await db.write()

  res.json({ success: true, data: newCategory })
})

router.put('/categories/:id', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const index = db.data.solutions.categories.findIndex((c) => c.id === id)

  if (index === -1) {
    return res.status(404).json({ success: false, message: '分类不存在' })
  }

  const prev = db.data.solutions.categories[index]
  db.data.solutions.categories[index] = {
    ...prev,
    ...req.body,
    name: mergeI18nField(prev.name, req.body.name !== undefined ? req.body.name : prev.name),
    description: mergeI18nField(
      prev.description,
      req.body.description !== undefined ? req.body.description : prev.description
    )
  }
  await db.write()

  res.json({ success: true, data: db.data.solutions.categories[index] })
})

router.delete('/categories/:id', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const index = db.data.solutions.categories.findIndex((c) => c.id === id)

  if (index === -1) {
    return res.status(404).json({ success: false, message: '分类不存在' })
  }

  db.data.solutions.categories[index].status = 0
  await db.write()

  res.json({ success: true, message: '删除成功' })
})

router.get('/:id/detail', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const detail = db.data.solutions.details.find((d) => d.id === id && d.status === 1)

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

  const existingIndex = db.data.solutions.details.findIndex((d) => d.id === id)

  if (existingIndex !== -1) {
    const prev = db.data.solutions.details[existingIndex]
    db.data.solutions.details[existingIndex] = {
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
    db.data.solutions.details.push(newDetail)
  }

  await db.write()

  res.json({ success: true, message: '保存成功' })
})

router.delete('/:id/detail', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const index = db.data.solutions.details.findIndex((d) => d.id === id)

  if (index === -1) {
    return res.status(404).json({ success: false, message: '详情不存在' })
  }

  db.data.solutions.details[index].status = 0
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

  let filteredSolutions = db.data.solutions.list.filter((s) => s.status === 1)

  if (category_id) {
    const getAllCategoryIds = (categoryId) => {
      const categoryIds = [categoryId]
      const categories = db.data.solutions.categories

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
    filteredSolutions = filteredSolutions.filter((s) => categoryIds.includes(s.category_id))
  }

  const total = filteredSolutions.length
  const totalPages = Math.ceil(total / pageSize)
  const startIndex = (page - 1) * pageSize
  const slice = filteredSolutions.slice(startIndex, startIndex + pageSize)
  const paginatedSolutions = raw ? slice : slice.map((s) => localizeListItem(s, locale))

  res.json({
    pagination: {
      page,
      pageSize,
      total,
      totalPages
    },
    solutions: paginatedSolutions
  })
})

router.get('/:id', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const solution = db.data.solutions.list.find((s) => s.id === id && s.status === 1)

  if (!solution) {
    return res.status(404).json({ error: 'Solution not found' })
  }

  const locale = getLocale(req)
  const raw = isRaw(req)
  res.json(raw ? solution : localizeListItem(solution, locale))
})

router.get('/:id/details', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const solutionDetail = db.data.solutions.details.find((d) => d.id === id && d.status === 1)

  if (!solutionDetail) {
    return res.status(404).json({ error: 'Solution detail not found' })
  }

  const locale = getLocale(req)
  const raw = isRaw(req)
  res.json(raw ? solutionDetail : localizeDetail(solutionDetail, locale))
})

router.get('/:id/materials', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const solutionMaterialsList = db.data.solutions.materials.filter((m) => m.solution_id === id && m.status === 1)

  res.json(solutionMaterialsList)
})

router.post('/', async (req, res) => {
  await db.read()

  const { title, description, ...rest } = req.body
  const newSolution = {
    id: Date.now(),
    ...rest,
    title: mergeI18nField(undefined, title ?? ''),
    description: mergeI18nField(undefined, description ?? ''),
    create_time: new Date().toLocaleString('zh-CN'),
    status: 1
  }

  db.data.solutions.list.push(newSolution)
  await db.write()

  res.json({ success: true, data: newSolution })
})

router.put('/:id', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const index = db.data.solutions.list.findIndex((s) => s.id === id)

  if (index === -1) {
    return res.status(404).json({ success: false, message: '解决方案不存在' })
  }

  const prev = db.data.solutions.list[index]
  db.data.solutions.list[index] = {
    ...prev,
    ...req.body,
    title: mergeI18nField(prev.title, req.body.title !== undefined ? req.body.title : prev.title),
    description: mergeI18nField(
      prev.description,
      req.body.description !== undefined ? req.body.description : prev.description
    )
  }
  await db.write()

  res.json({ success: true, data: db.data.solutions.list[index] })
})

router.delete('/:id', async (req, res) => {
  await db.read()
  const id = parseInt(req.params.id)
  const index = db.data.solutions.list.findIndex((s) => s.id === id)

  if (index === -1) {
    return res.status(404).json({ success: false, message: '解决方案不存在' })
  }

  db.data.solutions.list[index].status = 0
  await db.write()

  res.json({ success: true, message: '删除成功' })
})

router.post('/:id/materials', async (req, res) => {
  await db.read()
  const solutionId = parseInt(req.params.id)

  const newMaterial = {
    id: Date.now(),
    solution_id: solutionId,
    ...req.body,
    create_time: new Date().toLocaleString('zh-CN'),
    status: 1
  }

  db.data.solutions.materials.push(newMaterial)
  await db.write()

  res.json({ success: true, data: newMaterial })
})

router.delete('/:id/materials/:materialId', async (req, res) => {
  await db.read()
  const materialId = parseInt(req.params.materialId)
  const index = db.data.solutions.materials.findIndex((m) => m.id === materialId)

  if (index === -1) {
    return res.status(404).json({ success: false, message: '素材不存在' })
  }

  db.data.solutions.materials[index].status = 0
  await db.write()

  res.json({ success: true, message: '删除成功' })
})

export default router
