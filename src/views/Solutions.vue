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
const solutions = ref([])
const loading = ref(true)
const selectedCategoryId = ref(null)

// 分页逻辑
const currentPage = ref(1)
const totalPages = ref(2)
const itemsPerPage = 9

const goToPage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    await fetchSolutions(page, selectedCategoryId.value)
  }
}

const goToPrevPage = async () => {
  if (currentPage.value > 1) {
    await fetchSolutions(currentPage.value - 1, selectedCategoryId.value)
  }
}

const goToNextPage = async () => {
  if (currentPage.value < totalPages.value) {
    await fetchSolutions(currentPage.value + 1, selectedCategoryId.value)
  }
}

// 选择分类
const selectCategory = (categoryId) => {
  selectedCategoryId.value = categoryId
  currentPage.value = 1
  fetchSolutions(1, categoryId)
}

// 动态获取数据
const fetchSolutions = async (page = 1, categoryId = null) => {
  try {
    loading.value = true
    let url = withLocale(`/api/solutions?page=${page}&pageSize=${itemsPerPage}`)
    if (categoryId) {
      url += `&category_id=${categoryId}`
    }
    const data = await fetchApiJson(url)
    solutions.value = (data.solutions || []).map((s) => normalizeListApiRow(s))
    totalPages.value = data.pagination.totalPages
    currentPage.value = data.pagination.page
  } catch (error) {
    console.error('Failed to fetch solutions data:', error)
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
    const data = await fetchApiJson(withLocale('/api/solutions/categories'))
    const flat = Array.isArray(data) ? data.map((c) => normalizeCategoryApiRow(c)) : []
    categories.value = processCategories(flat)
  } catch (error) {
    console.error('Failed to fetch categories data:', error)
  }
}

watch(currentLocale, async () => {
  await fetchCategories()
  await fetchSolutions(currentPage.value, selectedCategoryId.value)
})

onMounted(async () => {
  await fetchCategories()

  // 获取解决方案数据
  await fetchSolutions()
  
  // 检查URL查询参数中的categoryId
  if (route.query.categoryId) {
    selectedCategoryId.value = parseInt(route.query.categoryId)
    await fetchSolutions(1, selectedCategoryId.value)
  }
  
  // 数据加载完成后滚动到页面顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// 监听路由变化，更新分类选择
watch(() => route.query.categoryId, async (newCategoryId) => {
  if (newCategoryId) {
    selectedCategoryId.value = parseInt(newCategoryId)
    await fetchSolutions(1, selectedCategoryId.value)
    // 数据加载完成后滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
</script>

<template>
  <div class="solutions-page">
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
              <div class="w-nav-item current">
                <router-link to="/solutions" class="w-nav-item-link">
                  <span class="w-link-txt">{{ t('solutions') }}</span>
                </router-link>
              </div>
            </li>
            <li class="w-nav-inner">
              <div class="w-nav-item">
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
    <section class="solutions-header-section">
      <div class="solutions-header-content">
        <h1 class="solutions-s-bg-title">Solutions.</h1>
        <h2 class="solutions-s-title">{{ t('solutionsPageTitle') }}</h2>
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
            <span class="breadcrumb-current">{{ t('solutionsBreadcrumb') }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- 解决方案内容 -->
    <section class="solutions-page-content">
      <div class="solutions-page-container">
        <!-- 左侧导航 -->
        <div class="solutions-sidebar">
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
        <div class="solutions-main">
          <div class="solutions-page-grid">
            <template v-if="loading">
              <div class="loading">{{ t('loading') }}</div>
            </template>
            <template v-else>
              <router-link v-for="solution in solutions" :key="solution.id" :to="`/solutions/${solution.id}`" class="solution-item-link">
                <div class="solution-item">
                  <div class="solution-item-image">
                    <img :src="solution.cover" :alt="solution.title" />
                  </div>
                  <h4 class="solution-item-title">{{ solution.title }}</h4>
                  <p class="solution-item-date">{{ solution.create_time }}</p>
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
  color: var(--accent);
}

.w-nav-item:hover a {
  color: var(--accent);
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
.solutions-header-section {
  height: 400px;
  background-image: url('/10974887.jpeg');
  background-position: 50% 50%;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.solutions-header-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.solutions-header-content {
  text-align: left;
  position: relative;
  z-index: 1;
  color: #fff;
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.solutions-s-bg-title {
  font-size: clamp(32px, 8vw, 96px);
  font-weight: bold;
  color: rgba(255, 255, 255, 0.2);
  
  margin-bottom: 20px;
  line-height: 1;
  white-space: nowrap;
}

.solutions-s-title {
  font-size: clamp(18px, 3.5vw, 48px);
  font-weight: bold;
  color: #fff;
  
  line-height: 1.15;
  white-space: nowrap;
}

/* 面包屑导航样式 */
.breadcrumb {
  height: 34px;
  padding: 8px 0;
  background-color: #fff;
  margin-top: 20px;
}

.breadcrumb-container {
  width: 1200px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
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
  font-size: 12px;
}

.breadcrumb-link:hover {
  color: var(--accent);
}

.breadcrumb-separator {
  margin: 0 10px;
  color: var(--text-muted);
}

.breadcrumb-current {
  color: #333;
  font-weight: bold;
}

/* 解决方案内容样式 */
.solutions-page-content {
  padding: 60px 0;
  background-color: #fff;
}

.solutions-page-container {
  width: 1200px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 20px;
  display: flex;
  gap: 40px;
}

/* 左侧导航样式 */
.solutions-sidebar {
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
  
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-title:hover {
  color: var(--accent);
}

.category-title.active {
  color: var(--accent);
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
  color: var(--accent);
  padding-left: 5px;
}

.category-link.active {
  color: var(--accent);
  font-weight: bold;
}

/* 右侧内容样式 */
.solutions-main {
  flex: 1;
}

.solutions-page-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.solution-item {
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.solution-item-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.solution-item-link:hover .solution-item {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.solution-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.solution-item-image {
  height: 180px;
  overflow: hidden;
}

.solution-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.solution-item-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 15px;
  
}

.solution-item-date {
  font-size: 12px;
  color: var(--text-muted);
  margin: 0 15px 15px;
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
  border-color: var(--accent);
  color: var(--accent);
}

.pagination-link.active {
  background-color: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

/* 页脚样式 */
.footer {
  background-color: #070707;
  padding: 20px 0;
  color: var(--text-subtle);
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
  color: var(--text-subtle);
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
  .solutions-s-bg-title,
  .solutions-s-title {
    white-space: normal;
  }
}
</style>