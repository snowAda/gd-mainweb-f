<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { currentLocale, setLocale, getMessages } from '../i18n'
import { withLocale, normalizeCategoryApiRow, normalizeListApiRow } from '../utils/apiLocale.js'
import { fetchApiJson } from '../utils/fetchApi.js'

const route = useRoute()

// 备案号，从环境变量获取
const beianCode = ref('')

onMounted(() => {
  beianCode.value = window.BEIAN_CODE || ''
})

const languages = [
  { id: '2', culture: 'zh-CN', name: '简体中文', flag: 'cn.png' },
  { id: '1', culture: 'en-US', name: 'English', flag: 'us.png' },
  { id: '3', culture: 'ja-JP', name: '日本語', flag: 'jp.png' }
]

const changeLanguage = (languageId, languageCulture) => {
  setLocale(languageCulture)
}

// 获取当前语言的消息
const messages = computed(() => getMessages())

// 翻译函数
const t = (key) => {
  return messages.value[key] || key
}

// 数据相关
const categories = ref([])
const products = ref([])
const loading = ref(true)
const selectedCategoryId = ref(null)

// 分页逻辑
const currentPage = ref(1)
const totalPages = ref(3)
const itemsPerPage = 9

const goToPage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    await fetchProducts(page, selectedCategoryId.value)
  }
}

const goToPrevPage = async () => {
  if (currentPage.value > 1) {
    await fetchProducts(currentPage.value - 1, selectedCategoryId.value)
  }
}

const goToNextPage = async () => {
  if (currentPage.value < totalPages.value) {
    await fetchProducts(currentPage.value + 1, selectedCategoryId.value)
  }
}

// 选择分类
const selectCategory = (categoryId) => {
  selectedCategoryId.value = categoryId
  currentPage.value = 1
  fetchProducts(1, categoryId)
}

// 动态获取数据
const fetchProducts = async (page = 1, categoryId = null) => {
  try {
    loading.value = true
    let url = withLocale(`/api/products?page=${page}&pageSize=${itemsPerPage}`)
    if (categoryId) {
      url += `&category_id=${categoryId}`
    }
    const data = await fetchApiJson(url)
    products.value = (data.products || []).map((p) => normalizeListApiRow(p))
    totalPages.value = data.pagination.totalPages
    currentPage.value = data.pagination.page
  } catch (error) {
    console.error('Failed to fetch products data:', error)
  } finally {
    loading.value = false
  }
}

// 处理分类父子关系
const processCategories = (categories) => {
  const categoryMap = {}
  const rootCategories = []
  
  // 先创建分类映射
  categories.forEach(category => {
    categoryMap[category.id] = {
      ...category,
      children: []
    }
  })
  
  // 构建树形结构
  categories.forEach(category => {
    if (category.parent_id === 0) {
      rootCategories.push(categoryMap[category.id])
    } else if (categoryMap[category.parent_id]) {
      categoryMap[category.parent_id].children.push(categoryMap[category.id])
    }
  })
  
  return rootCategories
}

const fetchCategories = async () => {
  try {
    const data = await fetchApiJson(withLocale('/api/products/categories'))
    const flat = Array.isArray(data) ? data.map((c) => normalizeCategoryApiRow(c)) : []
    categories.value = processCategories(flat)
  } catch (error) {
    console.error('Failed to fetch categories data:', error)
  }
}

watch(currentLocale, async () => {
  await fetchCategories()
  await fetchProducts(currentPage.value, selectedCategoryId.value)
})

onMounted(async () => {
  await fetchCategories()

  // 获取产品数据
  await fetchProducts()
  
  // 检查URL查询参数中的categoryId
  if (route.query.categoryId) {
    selectedCategoryId.value = parseInt(route.query.categoryId)
    await fetchProducts(1, selectedCategoryId.value)
  }
  
  // 数据加载完成后滚动到页面顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// 监听路由变化，更新分类选择
watch(() => route.query.categoryId, async (newCategoryId) => {
  if (newCategoryId) {
    selectedCategoryId.value = parseInt(newCategoryId)
    await fetchProducts(1, selectedCategoryId.value)
    // 数据加载完成后滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
</script>

<template>
  <div class="products-page">
    <!-- 导航栏 -->
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <router-link to="/">
            <img src="/logo.png" alt="Logo" />
          </router-link>
        </div>
        <nav class="nav">
          <ul class="w-nav">
            <li class="w-nav-inner">
              <div class="w-nav-item">
                <router-link to="/" class="w-nav-item-link">
                  <span class="w-link-txt">{{ t('home') }}</span>
                </router-link>
              </div>
            </li>
            <li class="w-nav-inner">
              <div class="w-nav-item">
                <router-link to="/about" class="w-nav-item-link">
                  <span class="w-link-txt">{{ t('about') }}</span>
                </router-link>
              </div>
            </li>
            <li class="w-nav-inner">
              <div class="w-nav-item">
                <router-link to="/solutions" class="w-nav-item-link">
                  <span class="w-link-txt">{{ t('solutions') }}</span>
                </router-link>
              </div>
            </li>
            <li class="w-nav-inner">
              <div class="w-nav-item current">
                <router-link to="/products" class="w-nav-item-link">
                  <span class="w-link-txt">{{ t('products') }}</span>
                </router-link>
              </div>
            </li>
          </ul>
        </nav>
        <div class="language-selector">
          <ul class="w-language-group">
            <li class="w-language-item" v-for="lang in languages" :key="lang.id">
              <a href="javascript:void(0)" class="w-language-link" :languageid="lang.id" :languageculture="lang.culture" @click="changeLanguage(lang.id, lang.culture)">
                <span class="w-language-img">
                  <img :src="`/${lang.flag}`" :alt="lang.name" />
                  <span class="w-language-img-line"></span>
                </span>
                <span>{{ lang.name }}</span>
              </a>
              <span class="w-language-item-line"></span>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <!-- 页面头部 -->
    <section class="products-header-section">
      <div class="products-header-content">
        <h1 class="products-bg-title">Products&Services</h1>
        <h2 class="products-title">{{ t('productsPageTitle') }}</h2>
      </div>
    </section>

    <!-- 面包屑导航 -->
    <section class="breadcrumb">
      <div class="breadcrumb-container">
        <ul class="breadcrumb-list">
          <li class="breadcrumb-item">
            <router-link to="/" class="breadcrumb-link">{{ t('home') }}</router-link>
          </li>
          <li class="breadcrumb-item">
            <span class="breadcrumb-separator">></span>
          </li>
          <li class="breadcrumb-item">
            <span class="breadcrumb-current">{{ t('productsBreadcrumb') }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- 产品服务内容 -->
    <section class="products-content">
      <div class="products-container">
        <!-- 左侧导航 -->
        <div class="products-sidebar">
          <div class="solution-category">
            <h3 class="category-title" @click="selectCategory(null)" :class="{ 'active': selectedCategoryId === null }" style="cursor: pointer;">{{ t('categoryAll') }}</h3>
          </div>
          <div v-for="category in categories" :key="category.id" class="solution-category">
            <h3 class="category-title" @click="selectCategory(category.id)" :class="{ 'active': selectedCategoryId === category.id }" style="cursor: pointer;">{{ category.name }}</h3>
            <ul class="category-list" v-if="category.children && category.children.length > 0">
              <li v-for="childCategory in category.children" :key="childCategory.id" class="category-item">
                <a href="#" class="category-link" @click.prevent="selectCategory(childCategory.id)" :class="{ 'active': selectedCategoryId === childCategory.id }">{{ childCategory.name }}</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 右侧内容 -->
        <div class="products-main">
          <div class="products-grid">
            <template v-if="loading">
              <div class="loading">{{ t('loading') }}</div>
            </template>
            <template v-else>
              <router-link v-for="product in products" :key="product.id" :to="`/products/${product.id}`" class="product-item-link">
                <div class="product-item">
                  <div class="product-item-image">
                    <img :src="product.cover" :alt="product.title" />
                  </div>
                  <h4 class="product-item-title">{{ product.title }}</h4>
                  <p class="product-item-date">{{ product.create_time }}</p>
                </div>
              </router-link>
            </template>
          </div>

          <!-- 分页 -->
          <div class="pagination">
            <a href="#" class="pagination-link" @click.prevent="goToPrevPage">{{ t('paginationPrev') }}</a>
            <a v-for="page in totalPages" :key="page" href="#" class="pagination-link" :class="{ active: currentPage === page }" @click.prevent="goToPage(page)">{{ page }}</a>
            <a href="#" class="pagination-link" @click.prevent="goToNextPage">{{ t('paginationNext') }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="copyright-area">
            <div class="copyright-left">{{ t('footerCopyrightLeft') }}</div>
            <div class="copyright-center"><a href="https://beian.miit.gov.cn/" target="_blank" style="color: inherit; text-decoration: none;" v-if="beianCode">{{ beianCode }}</a></div>
            <div class="copyright-right">{{ t('footerCopyrightRight') }}</div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* 导航栏样式 */
.header {
  background-color: #070707;
  height: 80px;
  position: relative;
  z-index: 100;
}

.header-container {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  padding: 0 20px;
}

.logo {
  width: 111px;
  height: 41px;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.nav {
  flex: 1;
  margin-left: 60px;
}

.w-nav {
  display: flex;
  list-style: none;
  height: 80px;
}

.w-nav-inner {
  flex: 1;
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.w-nav-item a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  display: block;
  transition: all 0.3s ease;
}

.w-nav-item.current a {
  color: #856dcc;
}

.w-nav-item:hover a {
  color: #856dcc;
}

.language-selector {
  width: 241px;
}

.w-language-group {
  display: flex;
  list-style: none;
  align-items: center;
}

.w-language-item {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.w-language-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #666;
  font-size: 12px;
  
  white-space: nowrap;
}

.w-language-img {
  margin-right: 5px;
  position: relative;
}

.w-language-img img {
  width: 20px;
  height: 20px;
}

.w-language-item-line {
  width: 1px;
  height: 12px;
  background-color: #666;
  margin-left: 10px;
  align-self: center;
}

/* 页面头部样式 */
.products-header-section {
  height: 400px;
  background-image: url('/10974886.jpeg');
  background-position: 50% 50%;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.products-header-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.products-header-content {
  text-align: left;
  position: relative;
  z-index: 1;
  color: #fff;
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.products-bg-title {
  font-size: clamp(32px, 8vw, 96px);
  font-weight: bold;
  color: rgba(255, 255, 255, 0.2);
  
  margin-bottom: 20px;
  line-height: 1;
  white-space: nowrap;
}

.products-title {
  font-size: clamp(18px, 3.5vw, 48px);
  font-weight: bold;
  color: #fff;
  
  line-height: 1.15;
  white-space: nowrap;
}

/* 面包屑导航样式 */
.breadcrumb {
  padding: 20px 0;
  background-color: #fff;
}

.breadcrumb-container {
  width: 1200px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 20px;
}

.breadcrumb-list {
  display: flex;
  list-style: none;
  font-size: 12px;
  color: #666;
}

.breadcrumb-item {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: #666;
  text-decoration: none;
}

.breadcrumb-link:hover {
  color: #856dcc;
}

.breadcrumb-separator {
  margin: 0 10px;
  color: #999;
}

.breadcrumb-current {
  color: #333;
  font-weight: bold;
}

/* 产品服务内容样式 */
.products-content {
  padding: 60px 0;
  background-color: #fff;
}

.products-container {
  width: 1200px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 20px;
  display: flex;
  gap: 40px;
}

/* 左侧导航样式 */
.products-sidebar {
  flex: 0 0 200px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.solution-category {
  margin-bottom: 30px;
}

.category-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  
}

.category-list {
  list-style: none;
}

.category-item {
  margin-bottom: 10px;
}

.category-link {
  color: #666;
  text-decoration: none;
  font-size: 12px;
  display: block;
  padding: 5px 0;
  transition: all 0.3s ease;
}

.category-link:hover {
  color: #856dcc;
  padding-left: 5px;
}

.category-link.active {
  color: #856dcc;
  font-weight: bold;
}

/* 右侧内容样式 */
.products-main {
  flex: 1;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.product-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-item-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-item-link:hover .product-item {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-item-image {
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}

.product-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-item-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 15px;
  
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.product-item-date {
  font-size: 12px;
  color: #999;
  margin: 0 15px 15px;
  flex-shrink: 0;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination-link {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
}

.pagination-link:hover {
  border-color: #856dcc;
  color: #856dcc;
}

.pagination-link.active {
  background-color: #856dcc;
  border-color: #856dcc;
  color: #fff;
}

/* 页脚样式 */
.footer {
  background-color: #070707;
  padding: 20px 0;
  color: #989898;
}

.footer-container {
  width: 1200px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 20px;
}

.footer-content {
  text-align: center;
}

.copyright-area {
  font-size: 14px;
  color: #989898;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  max-width: 100%;
  margin: 0 auto 10px;
}

.copyright-left {
  text-align: left;
}

.copyright-center {
  text-align: center;
}

.copyright-right {
  text-align: right;
}

@media (max-width: 640px) {
  .products-bg-title,
  .products-title {
    white-space: normal;
  }
}
</style>