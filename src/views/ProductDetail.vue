<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { currentLocale, setLocale, getMessages } from '../i18n'
import { withLocale, normalizeCategoryApiRow, normalizeDetailApiRow } from '../utils/apiLocale.js'
import { fetchApiJson } from '../utils/fetchApi.js'

const route = useRoute()
const router = useRouter()

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

// 产品数据
const product = ref(null)
const productMaterials = ref([])
const loading = ref(true)
const error = ref(null)
const categories = ref([])

// 从后端 API 获取产品数据和分类数据
const loadData = async () => {
  const id = route.params.id
  try {
    loading.value = true
    error.value = null
    const rawProduct = await fetchApiJson(withLocale(`/api/products/${id}/details`))
    if (!rawProduct || rawProduct.error) {
      throw new Error('Product not found')
    }
    product.value = normalizeDetailApiRow(rawProduct)

    productMaterials.value = await fetchApiJson(`/api/products/${id}/materials`)

    const data2 = await fetchApiJson(withLocale('/api/products/categories'))
    const flat = Array.isArray(data2) ? data2.map((c) => normalizeCategoryApiRow(c)) : []
    categories.value = processCategories(flat)
  } catch (err) {
    error.value = err.message
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(loadData)

watch(currentLocale, () => {
  loadData()
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) loadData()
  }
)

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

// 选择分类并跳转到产品列表页面
const selectCategory = (categoryId) => {
  router.push({
    path: '/products',
    query: { categoryId: categoryId }
  })
}

// 获取素材类型文本
const getMaterialTypeText = (type) => {
  const key = {
    image: 'materialTypeImage',
    video: 'materialTypeVideo',
    document: 'materialTypeDocument',
    other: 'materialTypeOther'
  }[type]
  return key ? t(key) : type
}

// 从文件URL中提取文件名
const getFileName = (url) => {
  return url.split('/').pop()
}

/** 详情正文已规范为字符串，再换行转 <br> */
const productDescriptionHtml = computed(() => {
  const text = product.value?.description
  if (!text || typeof text !== 'string') return ''
  return text.replace(/\n/g, '<br>')
})
</script>

<template>
  <div class="product-detail-page">
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
              <router-link to="/" class="w-nav-item">{{ t('home') }}</router-link>
            </li>
            <li class="w-nav-inner">
              <router-link to="/about" class="w-nav-item">{{ t('about') }}</router-link>
            </li>
            <li class="w-nav-inner">
              <router-link to="/solutions" class="w-nav-item">{{ t('solutions') }}</router-link>
            </li>
            <li class="w-nav-inner">
              <router-link to="/products" class="w-nav-item current">{{ t('products') }}</router-link>
            </li>
          </ul>
        </nav>
        <div class="language-selector">
          <div class="language-selector-title">
            <img :src="`/${languages.find(lang => lang.culture === currentLocale).flag}`" :alt="currentLocale" />
            <span>{{ languages.find(lang => lang.culture === currentLocale).name }}</span>
          </div>
          <div class="language-selector-dropdown">
            <div 
              v-for="lang in languages" 
              :key="lang.id"
              class="language-selector-item"
              @click="changeLanguage(lang.id, lang.culture)"
            >
              <img :src="`/${lang.flag}`" :alt="lang.culture" />
              <span>{{ lang.name }}</span>
            </div>
          </div>
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
            <router-link to="/products" class="breadcrumb-link">{{ t('productsBreadcrumb') }}</router-link>
          </li>
          <li class="breadcrumb-item">
            <span class="breadcrumb-separator">></span>
          </li>
          <li class="breadcrumb-item">
            <span class="breadcrumb-current">{{ product ? product.title : t('loading') }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- 产品详情内容 -->
    <section class="product-detail-content">
      <div class="product-detail-container">
        <!-- 左侧导航 -->
        <div class="products-sidebar">
          <div v-for="category in categories" :key="category.id" class="product-category">
            <h3 class="category-title" @click="selectCategory(category.id)" style="cursor: pointer;">{{ category.name }}</h3>
            <ul class="category-list" v-if="category.children && category.children.length > 0">
              <li v-for="childCategory in category.children" :key="childCategory.id" class="category-item">
                <a href="#" class="category-link" @click.prevent="selectCategory(childCategory.id)">{{ childCategory.name }}</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 右侧内容 -->
        <div class="product-detail-main">
          <template v-if="loading">
            <div class="loading">{{ t('loading') }}</div>
          </template>
          <template v-else-if="error">
            <div class="error">{{ error }}</div>
          </template>
          <template v-else-if="product">
            <h3 class="product-detail-title">{{ product.title }}</h3>
            
            <div class="product-detail-info">
              <div class="product-description">
                <p v-if="productDescriptionHtml" v-html="productDescriptionHtml"></p>
                <p v-else>{{ t('productDetailNoDescription') }}</p>
              </div>
            </div>
            
            <div class="product-images" v-if="productMaterials && productMaterials.filter(m => m.material_type === 'image').length > 0">
              <div v-for="(material, index) in productMaterials.filter(m => m.material_type === 'image').sort((a, b) => a.sort - b.sort)" :key="index" class="product-image-item">
                <img :src="material.file_url" :alt="`${product.title} ${index + 1}`" loading="lazy" />
              </div>
            </div>
            
            <div v-if="productMaterials && productMaterials.filter(m => m.material_type === 'video').length > 0" class="product-videos">
              <div class="video-list">
                <div v-for="(material, index) in productMaterials.filter(m => m.material_type === 'video').sort((a, b) => a.sort - b.sort)" :key="index" class="video-item">
                  <video controls autoplay muted :src="material.file_url" :alt="`${product.title} ${t('mediaVideo')} ${index + 1}`" style="width: 100%; max-width: 600px; border-radius: 4px;" />
                </div>
              </div>
            </div>
            
            <div v-if="productMaterials && productMaterials.filter(m => m.material_type !== 'image' && m.material_type !== 'video').length > 0" class="product-materials">
              <div class="materials-list">
                <div v-for="(material, index) in productMaterials.filter(m => m.material_type !== 'image' && m.material_type !== 'video').sort((a, b) => a.sort - b.sort)" :key="index" class="material-item">
                  <div class="material-content other">
                    <div class="material-info">
                      <span class="material-type">{{ getMaterialTypeText(material.material_type) }}</span>
                      <span class="material-file">{{ getFileName(material.file_url) }}</span>
                    </div>
                    <a :href="material.file_url" class="material-link" target="_blank">{{ t('download') }}</a>
                  </div>
                </div>
              </div>
            </div>
          </template>
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

.w-nav-item {
  text-decoration: none;
  color: #fff;
  font-size: var(--text-base);
  display: block;
  transition: all 0.3s ease;
}

.w-nav-item.current {
  color: var(--accent);
}

.w-nav-item:hover {
  color: var(--accent);
}

.language-selector {
  width: 241px;
  position: relative;
}

.language-selector-title {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  color: #fff;
  font-size: var(--text-sm);
}

.language-selector-title img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.language-selector-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 120px;
  z-index: 1000;
  display: none;
}

.language-selector:hover .language-selector-dropdown {
  display: block;
}

.language-selector-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  font-size: var(--text-sm);
}

.language-selector-item:hover {
  background-color: #f5f5f5;
}

.language-selector-item img {
  width: 16px;
  height: 16px;
  margin-right: 8px;
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
  font-size: clamp(16px, 2.8vw, 36px);
  font-weight: bold;
  color: #fff;
  margin: 0;
  
  line-height: 1.15;
  white-space: nowrap;
}

/* 面包屑导航 */
.breadcrumb {
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
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
  font-size: var(--text-xs);
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
  font-size: var(--text-xs);
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

/* 产品详情内容 */
.product-detail-content {
  padding: 40px 0;
}

.product-detail-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 100%;
  display: flex;
  gap: 40px;
}

/* 左侧导航 */
.products-sidebar {
  width: 250px;
  flex-shrink: 0;
}

.product-category {
  margin-bottom: 30px;
}

.category-title {
  font-size: var(--text-base);
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  cursor: pointer;
}

.category-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.category-item {
  margin-bottom: 10px;
}

.category-link {
  color: #666;
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color 0.3s ease;
  display: block;
  padding: 5px 0;
}

.category-link:hover {
  color: var(--accent);
}

.category-link.active {
  color: var(--accent);
  font-weight: bold;
}

/* 右侧内容 */
.product-detail-main {
  flex: 1;
}

.product-detail-title {
  font-size: var(--text-xl);
  font-weight: bold;
  color: #333;
  margin: 0 0 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.product-detail-info {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 40px;
}

.section-title {
  font-size: var(--text-base);
  font-weight: bold;
  color: #333;
  margin: 0 0 15px;
}

.product-description p {
  color: #666;
  line-height: 1.6;
  margin: 0 0 30px;
}

.features-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.feature-item {
  color: #666;
  font-size: var(--text-sm);
  padding: 6px 0;
  position: relative;
  padding-left: 20px;
}

.feature-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: bold;
}

/* 产品图片 */
.product-images {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
}

.product-image-item {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.product-image-item img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

/* 产品素材 */
.product-materials {
  margin-top: 40px;
}

.materials-list {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
}

.material-item {
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
}

.material-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.material-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.material-content.image {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.material-content.video {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.material-content.other {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.material-info {
  flex: 1;
}

.material-type {
  display: inline-block;
  padding: 4px 12px;
  background-color: var(--accent);
  color: #fff;
  font-size: var(--text-xs);
  border-radius: 12px;
  margin-right: 10px;
}

.material-file {
  font-size: var(--text-sm);
  color: #666;
}

.material-link {
  display: inline-block;
  padding: 6px 16px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-size: var(--text-sm);
  transition: all 0.3s ease;
}

.material-link:hover {
  background-color: var(--accent);
}

/* 页脚 */
.footer {
  background-color: #070707;
  padding: 30px 0;
  margin-top: 60px;
}

.footer-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 100%;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright-area {
  font-size: var(--text-sm);
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

/* 响应式设计 */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }
  
  .nav {
    margin-left: 0;
    width: 100%;
  }
  
  .w-nav {
    height: auto;
    flex-wrap: wrap;
  }
  
  .w-nav-inner {
    height: 40px;
    line-height: 40px;
  }
  
  .products-header-content {
    width: 100%;
    padding: 0 15px;
  }
  
  .products-bg-title {
    font-size: var(--text-3xl);
    white-space: normal;
  }
  
  .products-title {
    font-size: var(--text-xl);
    white-space: normal;
  }
  
  .product-detail-container {
    flex-direction: column;
    width: 100%;
    padding: 0 15px;
  }
  
  .product-sidebar {
    width: 100%;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 20px;
  }
}
</style>