<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { currentLocale, setLocale, getMessages } from '../i18n'

const route = useRoute()
const router = useRouter()
const solutionId = route.params.id

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

// 解决方案数据
const solution = ref(null)
const solutionMaterials = ref([])
const loading = ref(true)
const error = ref(null)
const categories = ref([])

// 从后端 API 获取解决方案数据和分类数据
onMounted(async () => {
  try {
    loading.value = true
    // 获取解决方案详情数据
    const response1 = await fetch(`/api/solutions/${solutionId}/details`)
    if (!response1.ok) {
      throw new Error('Failed to fetch solution details')
    }
    solution.value = await response1.json()
    if (!solution.value) {
      throw new Error('Solution not found')
    }
    
    // 获取解决方案素材数据
    const response3 = await fetch(`/api/solutions/${solutionId}/materials`)
    if (!response3.ok) {
      throw new Error('Failed to fetch solution materials')
    }
    solutionMaterials.value = await response3.json()
    
    // 获取分类数据
    const response2 = await fetch('/api/solutions/categories')
    if (!response2.ok) {
      throw new Error('Failed to fetch categories data')
    }
    const data2 = await response2.json()
    categories.value = processCategories(data2)
  } catch (err) {
    error.value = err.message
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
})

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

// 选择分类并跳转到解决方案列表页面
const selectCategory = (categoryId) => {
  router.push({
    path: '/solutions',
    query: { categoryId: categoryId }
  })
}

// 获取素材类型文本
const getMaterialTypeText = (type) => {
  const typeMap = {
    'image': '图片',
    'video': '视频',
    'document': '文档',
    'other': '其他'
  }
  return typeMap[type] || type
}

// 从文件URL中提取文件名
const getFileName = (url) => {
  return url.split('/').pop()
}
</script>

<template>
  <div class="solution-detail-page">
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
              <router-link to="/" class="w-nav-item">首页</router-link>
            </li>
            <li class="w-nav-inner">
              <router-link to="/about" class="w-nav-item">关于我们</router-link>
            </li>
            <li class="w-nav-inner">
              <router-link to="/solutions" class="w-nav-item current">解决方案</router-link>
            </li>
            <li class="w-nav-inner">
              <router-link to="/products" class="w-nav-item">产品服务</router-link>
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
    <section class="solutions-header-section">
      <div class="solutions-header-content">
        <h1 class="solutions-bg-title">Solutions.</h1>
        <h2 class="solutions-title">解决方案</h2>
      </div>
    </section>

    <!-- 面包屑导航 -->
    <section class="breadcrumb">
      <div class="breadcrumb-container">
        <ul class="breadcrumb-list">
          <li class="breadcrumb-item">
            <router-link to="/" class="breadcrumb-link">首页</router-link>
          </li>
          <li class="breadcrumb-item">
            <span class="breadcrumb-separator">></span>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/solutions" class="breadcrumb-link">解决方案</router-link>
          </li>
          <li class="breadcrumb-item">
            <span class="breadcrumb-separator">></span>
          </li>
          <li class="breadcrumb-item">
            <span class="breadcrumb-current">{{ solution ? solution.title : '加载中...' }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- 解决方案详情内容 -->
    <section class="solution-detail-content">
      <div class="solution-detail-container">
        <!-- 左侧导航 -->
        <div class="solutions-sidebar">
          <div v-for="category in categories" :key="category.id" class="solution-category">
            <h3 class="category-title" @click="selectCategory(category.id)" style="cursor: pointer;">{{ category.name }}</h3>
            <ul class="category-list" v-if="category.children && category.children.length > 0">
              <li v-for="childCategory in category.children" :key="childCategory.id" class="category-item">
                <a href="#" class="category-link" @click.prevent="selectCategory(childCategory.id)">{{ childCategory.name }}</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 右侧内容 -->
        <div class="solution-detail-main">
          <template v-if="loading">
            <div class="loading">加载中...</div>
          </template>
          <template v-else-if="error">
            <div class="error">{{ error }}</div>
          </template>
          <template v-else-if="solution">
            <h3 class="solution-detail-title">{{ solution.title }}</h3>
            
            <div class="solution-detail-info">
              <div class="solution-description">
                <p v-if="solution.description" v-html="solution.description.replace(/\n/g, '<br>')"></p>
                <p v-else>暂无解决方案描述</p>
              </div>
            </div>
            
            <div class="solution-images" v-if="solutionMaterials && solutionMaterials.filter(m => m.material_type === 'image').length > 0">
              <div v-for="(material, index) in solutionMaterials.filter(m => m.material_type === 'image').sort((a, b) => a.sort - b.sort)" :key="index" class="solution-image-item">
                <img :src="material.file_url" :alt="`${solution.title} ${index + 1}`" />
              </div>
            </div>
            
            <div v-if="solutionMaterials && solutionMaterials.filter(m => m.material_type === 'video').length > 0" class="solution-videos">
              <div class="video-list">
                <div v-for="(material, index) in solutionMaterials.filter(m => m.material_type === 'video').sort((a, b) => a.sort - b.sort)" :key="index" class="video-item">
                  <video controls autoplay muted :src="material.file_url" :alt="`${solution.title} 视频 ${index + 1}`" style="width: 100%; max-width: 600px; border-radius: 4px;" />
                </div>
              </div>
            </div>
            
            <div v-if="solutionMaterials && solutionMaterials.filter(m => m.material_type !== 'image' && m.material_type !== 'video').length > 0" class="solution-materials">
              <div class="materials-list">
                <div v-for="(material, index) in solutionMaterials.filter(m => m.material_type !== 'image' && m.material_type !== 'video').sort((a, b) => a.sort - b.sort)" :key="index" class="material-item">
                  <div class="material-content other">
                    <div class="material-info">
                      <span class="material-type">{{ getMaterialTypeText(material.material_type) }}</span>
                      <span class="material-file">{{ getFileName(material.file_url) }}</span>
                    </div>
                    <a :href="material.file_url" class="material-link" target="_blank">下载</a>
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
            <div class="copyright-left">版权所有© 南京果动智能科技有限公司</div>
            <div class="copyright-center"><a href="https://beian.miit.gov.cn/" target="_blank" style="color: inherit; text-decoration: none;" v-if="beianCode">{{ beianCode }}</a></div>
            <div class="copyright-right">人工智能·科技赋能</div>
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
  margin-left: 263px;
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
  font-size: 16px;
  display: block;
  transition: all 0.3s ease;
}

.w-nav-item.current {
  color: #856dcc;
}

.w-nav-item:hover {
  color: #856dcc;
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
  font-size: 14px;
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
  font-size: 14px;
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

.solutions-bg-title {
  font-size: 96px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.2);
  font-family: Arial Black, sans-serif;
  margin-bottom: 20px;
  line-height: 1;
}

.solutions-title {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  margin: 0;
  font-family: Source Han Sans, Geneva, sans-serif;
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

/* 解决方案详情内容 */
.solution-detail-content {
  padding: 40px 0;
}

.solution-detail-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 100%;
  display: flex;
  gap: 40px;
}

/* 左侧导航 */
.solutions-sidebar {
  width: 250px;
  flex-shrink: 0;
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
  font-size: 14px;
  transition: color 0.3s ease;
  display: block;
  padding: 5px 0;
}

.category-link:hover {
  color: #856dcc;
}

.category-link.active {
  color: #856dcc;
  font-weight: bold;
}

/* 右侧内容 */
.solution-detail-main {
  flex: 1;
}

.solution-detail-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 0 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.solution-detail-info {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 40px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 15px;
}

.solution-description {
  margin-bottom: 25px;
}

.solution-description:last-of-type {
  margin-bottom: 0;
}

.solution-description p {
  color: #666;
  line-height: 1.6;
  margin: 0;
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
  font-size: 14px;
  padding: 6px 0;
  position: relative;
  padding-left: 20px;
}

.feature-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #856dcc;
  font-weight: bold;
}

/* 解决方案图片 */
.solution-images {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
}

.solution-image-item {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.solution-image-item img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

/* 解决方案素材 */
.solution-materials {
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
  background-color: #856dcc;
  color: #fff;
  font-size: 12px;
  border-radius: 12px;
  margin-right: 10px;
}

.material-file {
  font-size: 14px;
  color: #666;
}

.material-link {
  display: inline-block;
  padding: 6px 16px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.material-link:hover {
  background-color: #856dcc;
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
  
  .solutions-header-content {
    width: 100%;
    padding: 0 15px;
  }
  
  .solutions-bg-title {
    font-size: 48px;
  }
  
  .solutions-title {
    font-size: 24px;
  }
  
  .solution-detail-container {
    flex-direction: column;
    width: 100%;
    padding: 0 15px;
  }
  
  .solutions-sidebar {
    width: 100%;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 20px;
  }
}
</style>