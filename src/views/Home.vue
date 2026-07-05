<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentLocale, setLocale, getMessages } from '../i18n'

const router = useRouter()

// 备案号，从环境变量获取
const beianCode = ref('')

onMounted(() => {
  beianCode.value = window.BEIAN_CODE || ''
})

const languages = [
{ id: '1', culture: 'en-US', name: 'English', flag: 'us.png' },
  { id: '2', culture: 'zh-CN', name: '简体中文', flag: 'cn.png' },
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

// 关于我们部分滚动渐入效果
const aboutSection = ref(null)
const isAboutVisible = ref(false) // 默认设置为 false，只有在可视区域才显示
let aboutObserver = null

// 解决方案部分滚动渐入效果
const solutionsSection = ref(null)
const isSolutionsVisible = ref(false) // 默认设置为 false，只有在可视区域才显示
let solutionsObserver = null

onMounted(() => {
  // 关于我们部分的观察者
  if (aboutSection.value) {
    aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isAboutVisible.value = true
          aboutObserver.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.5
    })
    aboutObserver.observe(aboutSection.value)
  }

  // 解决方案部分的观察者
  if (solutionsSection.value) {
    solutionsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isSolutionsVisible.value = true
          solutionsObserver.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.5
    })
    solutionsObserver.observe(solutionsSection.value)
  }
})

onUnmounted(() => {
  // 清理观察者
  if (aboutObserver) {
    aboutObserver.disconnect()
  }
  if (solutionsObserver) {
    solutionsObserver.disconnect()
  }
})
</script>

<template>
  <div class="home">
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
              <div class="w-nav-item current">
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
              <div class="w-nav-item">
                <router-link to="/products" class="w-nav-item-link">
                  <span class="w-link-txt">{{ t('products') }}</span>
                </router-link>
              </div>
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

    <!-- 背景图片容器 -->
    <div class="background-container"></div>

    <!-- 轮播图 -->
    <section class="slider">
      <div class="slider-content">
        <div class="slider-text">
          <p class="slider-subtitle">{{ t('sliderSubtitle') }}</p>
          <h1 class="slider-title">{{ t('sliderTitle') }}</h1>
          <div class="slider-line"></div>
          <p class="slider-description">{{ t('sliderDescription') }}</p>
          <div class="slider-line"></div>
        </div>
      </div>
    </section>

    <!-- 拼接图片 -->
    <!-- <section class="slider-bottom">
      <div class="slider-bottom-content"></div>
    </section> -->

    <!-- 关于我们 -->
    <section class="about" ref="aboutSection">
      <div class="about-container">
        <div class="about-top-section">
          <div class="about-header">
            <div class="about-line"></div>
            <div class="about-title-container">
              <h1 class="about-bg-title">About.</h1>
              <h2 class="about-title">{{ t('aboutSection') }}</h2>
            </div>
          </div>
          <div class="about-text-wrapper">
            <p class="about-description" :class="{ 'animate-fade-down': isAboutVisible }" style="white-space: pre-line">
              {{ t('aboutDescription') }}
            </p>
          </div>
        </div>
        <div class="about-features">
          <div class="about-feature">
            <div class="about-feature-icon" :class="{ 'animate-fade-up': isAboutVisible }">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="4" stroke="#999" stroke-width="1.5"/>
                <circle cx="24" cy="8" r="3" stroke="#999" stroke-width="1.5"/>
                <circle cx="24" cy="40" r="3" stroke="#999" stroke-width="1.5"/>
                <circle cx="8" cy="24" r="3" stroke="#999" stroke-width="1.5"/>
                <circle cx="40" cy="24" r="3" stroke="#999" stroke-width="1.5"/>
                <circle cx="12.7" cy="12.7" r="2.5" stroke="#999" stroke-width="1.5"/>
                <circle cx="35.3" cy="12.7" r="2.5" stroke="#999" stroke-width="1.5"/>
                <circle cx="12.7" cy="35.3" r="2.5" stroke="#999" stroke-width="1.5"/>
                <circle cx="35.3" cy="35.3" r="2.5" stroke="#999" stroke-width="1.5"/>
              </svg>
            </div>
            <p class="about-feature-description" :class="{ 'animate-fade-down': isAboutVisible }">
              {{ t('aboutFeature1') }}
            </p>
          </div>
          <div class="about-feature">
            <div class="about-feature-icon" :class="{ 'animate-fade-up': isAboutVisible }">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="18" r="6" stroke="#999" stroke-width="1.5"/>
                <path d="M10 42C10 34 16 28 24 28C32 28 38 34 38 42" stroke="#999" stroke-width="1.5"/>
              </svg>
            </div>
            <p class="about-feature-description" :class="{ 'animate-fade-down': isAboutVisible }">
              {{ t('aboutFeature2') }}
            </p>
          </div>
          <div class="about-feature">
            <div class="about-feature-icon" :class="{ 'animate-fade-up': isAboutVisible }">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="28" height="28" stroke="#999" stroke-width="1.5"/>
                <rect x="16" y="16" width="16" height="16" stroke="#999" stroke-width="1.5"/>
                <rect x="22" y="22" width="4" height="4" fill="#999"/>
              </svg>
            </div>
            <p class="about-feature-description" :class="{ 'animate-fade-down': isAboutVisible }">
              {{ t('aboutFeature3') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 解决方案 -->
    <section class="solutions" ref="solutionsSection">
      <div class="solutions-container">
        <div class="solutions-header">
          <h1 class="solutions-bg-title">Solutions.</h1>
          <h2 class="solutions-title">{{ t('solutionsSection') }}</h2>
          <div class="solutions-line"></div>
        </div>
        <p class="solutions-description">
          {{ t('solutionsDescription') }}
        </p>
        <div class="solutions-grid">
          <div class="home-solution-item home-solution-item-1" :class="{ 'animate-slide-left': isSolutionsVisible }" @click="router.push('/solutions?categoryId=1')">
            <p class="home-solution-item-subtitle">{{ t('solution1Subtitle') }}</p>
            <h3 class="home-solution-item-title">{{ t('solution1Title') }}</h3>
            <p class="home-solution-item-description">{{ t('solution1Description') }}</p>
            <a href="#" class="home-solution-item-link">
              <i class="home-solution-item-icon">→</i>
            </a>
          </div>
          <div class="home-solution-item home-solution-item-2" :class="{ 'animate-slide-left': isSolutionsVisible }" @click="router.push('/solutions?categoryId=5')">
            <p class="home-solution-item-subtitle">{{ t('solution2Subtitle') }}</p>
            <h3 class="home-solution-item-title">{{ t('solution2Title') }}</h3>
            <p class="home-solution-item-description">{{ t('solution2Description') }}</p>
            <a href="#" class="home-solution-item-link">
              <i class="home-solution-item-icon">→</i>
            </a>
          </div>
          <div class="home-solution-item home-solution-item-3" :class="{ 'animate-slide-up': isSolutionsVisible }" @click="router.push('/solutions?categoryId=8')">
            <p class="home-solution-item-subtitle">{{ t('solution3Subtitle') }}</p>
            <h3 class="home-solution-item-title">{{ t('solution3Title') }}</h3>
            <p class="home-solution-item-description">{{ t('solution3Description') }}</p>
            <a href="#" class="home-solution-item-link">
              <i class="home-solution-item-icon">→</i>
            </a>
          </div>
          <div class="home-solution-item home-solution-item-4" :class="{ 'animate-slide-right': isSolutionsVisible }" @click="router.push('/solutions?categoryId=15')">
            <p class="home-solution-item-subtitle">{{ t('solution4Subtitle') }}</p>
            <h3 class="home-solution-item-title">{{ t('solution4Title') }}</h3>
            <p class="home-solution-item-description">{{ t('solution4Description') }}</p>
            <a href="#" class="home-solution-item-link">
              <i class="home-solution-item-icon">→</i>
            </a>
          </div>
          <div class="home-solution-item home-solution-item-5" :class="{ 'animate-slide-right': isSolutionsVisible }" @click="router.push('/solutions')">
            <h3 class="home-solution-item-title">{{ t('solution5Title') }}</h3>
            <p class="home-solution-item-description">{{ t('solution5Description') }}</p>
            <a href="#" class="home-solution-item-link">
              <i class="home-solution-item-icon">→</i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品与服务 -->
    <section class="products-services">
      <div class="products-services-container">
        <div class="products-services-header">
          <h1 class="products-services-bg-title">Products&Services.</h1>
          <h2 class="products-services-title">{{ t('productsSection') }}</h2>
          <div class="products-services-line"></div>
        </div>
        <p class="products-services-description">
          {{ t('productsDescription') }}
        </p>
        <div class="products-services-grid">
          <div class="product-item" @click="router.push('/products?categoryId=1')">
            <div class="product-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="12" height="12" stroke="var(--accent)" stroke-width="2" fill="none"/>
                <rect x="23" y="5" width="12" height="12" stroke="var(--accent)" stroke-width="2" fill="none"/>
                <rect x="5" y="23" width="12" height="12" stroke="var(--accent)" stroke-width="2" fill="none"/>
                <rect x="23" y="23" width="12" height="12" stroke="var(--accent)" stroke-width="2" fill="none"/>
                <circle cx="11" cy="11" r="2" fill="var(--accent)"/>
                <circle cx="29" cy="11" r="2" fill="var(--accent)"/>
                <circle cx="11" cy="29" r="2" fill="var(--accent)"/>
                <circle cx="29" cy="29" r="2" fill="var(--accent)"/>
              </svg>
            </div>
            <div class="product-content">
              <h3 class="product-title">{{ t('product1Title') }}</h3>
              <p class="product-description">{{ t('product1Description') }}</p>
            </div>
          </div>
          <div class="product-item" @click="router.push('/products?categoryId=4')">
            <div class="product-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="15" stroke="var(--accent)" stroke-width="2" fill="none"/>
                <circle cx="20" cy="20" r="8" fill="var(--accent)"/>
                <path d="M20 5V12" stroke="var(--accent)" stroke-width="2"/>
                <path d="M20 28V35" stroke="var(--accent)" stroke-width="2"/>
                <path d="M5 20H12" stroke="var(--accent)" stroke-width="2"/>
                <path d="M28 20H35" stroke="var(--accent)" stroke-width="2"/>
              </svg>
            </div>
            <div class="product-content">
              <h3 class="product-title">{{ t('product2Title') }}</h3>
              <p class="product-description">{{ t('product2Description') }}</p>
            </div>
          </div>
          <div class="product-item" @click="router.push('/products?categoryId=10')">
            <div class="product-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="24" height="24" stroke="var(--accent)" stroke-width="2" fill="none"/>
                <rect x="12" y="12" width="16" height="16" fill="var(--accent)"/>
                <circle cx="20" cy="20" r="4" fill="white"/>
              </svg>
            </div>
            <div class="product-content">
              <h3 class="product-title">{{ t('product3Title') }}</h3>
              <p class="product-description">{{ t('product3Description') }}</p>
            </div>
          </div>
          <div class="product-item" @click="router.push('/products?categoryId=11')">
            <div class="product-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="5" width="20" height="30" stroke="var(--accent)" stroke-width="2" fill="none"/>
                <rect x="14" y="10" width="12" height="8" fill="var(--accent)"/>
                <circle cx="20" cy="28" r="3" stroke="var(--accent)" stroke-width="2" fill="none"/>
              </svg>
            </div>
            <div class="product-content">
              <h3 class="product-title">{{ t('product4Title') }}</h3>
              <p class="product-description">{{ t('product4Description') }}</p>
            </div>
          </div>
          <div class="product-item" @click="router.push('/products')">
            <div class="product-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="15" r="8" stroke="var(--accent)" stroke-width="2" fill="none"/>
                <path d="M8 35C8 28 13 23 20 23C27 23 32 28 32 35" stroke="var(--accent)" stroke-width="2" fill="none"/>
              </svg>
            </div>
            <div class="product-content">
              <h3 class="product-title">{{ t('product5Title') }}</h3>
              <p class="product-description">{{ t('product5Description') }}</p>
            </div>
          </div>
          <div class="product-item product-item-more" @click="router.push('/products')">
            <button class="product-more-btn">{{ t('productMore') }}</button>
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
  font-size: var(--text-base);
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
  position: relative;
}

.language-selector-title {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  color: #666;
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
  color: #666;
}

.language-selector-item:hover {
  background-color: #f5f5f5;
}

.language-selector-item img {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

/* 整个页面背景 */
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/-48628.jpg');
  background-position: 50% 50%;
  background-size: cover;
  z-index: -1;
  overflow: hidden;
}

/* 轮播图背景 */
.slider {
  height: 850px;
  background-image: url('/10970598.jpeg');
  background-position: 50% 50%;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  z-index: 0;
}

/* 拼接图片内容 */
.slider-bottom {
  height: 500px;
  position: relative;
}

.slider-bottom-content {
  height: 100%;
  width: 100%;
}

.slider-content {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  max-width: 100%;
  padding: 0 20px;
}

.slider-text {
  width: 100%;
  max-width: 678px;
  padding: 32px 0;
  text-align: center;
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeInDown 0.8s ease forwards;
  animation-delay: 0.1s;
}

.slider-subtitle {
  font-size: var(--text-sm);
  color: #fff;
  margin-bottom: 16px;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.slider-title {
  font-size: var(--text-3xl);
  font-weight: bold;
  color: #fff;
  margin-bottom: 16px;
  
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInFromRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 解决方案部分的动画 */
.home-solution-item {
  opacity: 0;
  transition: all 2s ease;
}

.home-solution-item.animate-slide-left {
  opacity: 1;
  transform: translateX(0);
}

.home-solution-item.animate-slide-up {
  opacity: 1;
  transform: translateY(0);
}

.home-solution-item.animate-slide-right {
  opacity: 1;
  transform: translateX(0);
}

/* 初始状态 */
.home-solution-item-1,
.home-solution-item-2 {
  transform: translateX(-30px);
}

.home-solution-item-3 {
  transform: translateY(30px);
}

.home-solution-item-4,
.home-solution-item-5 {
  transform: translateX(30px);
}

.slider-line {
  width: 100%;
  max-width: 444px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 16px auto;
  opacity: 0;
  transform: translateX(20px);
  animation: fadeInFromRight 0.8s ease forwards;
  animation-delay: 0.2s;
}

.slider-description {
  font-size: var(--text-base);
  color: #fff;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  opacity: 0;
  transform: translateX(20px);
  animation: fadeInFromRight 0.8s ease forwards;
  animation-delay: 0.3s;
}

/* 解决方案样式 */
.solutions {
  padding: 60px 0 0;
  background-position: 50% 50%;
  background-size: cover;
  background-attachment: fixed;
  color: #fff;
  position: relative;
  min-height: 100vh;
}

.solutions::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.solutions-container {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  max-width: 100%;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.solutions-header {
  margin-bottom: 60px;
  position: relative;
  text-align: center;
}

.solutions-bg-title {
  font-size: clamp(40px, 10vw, 96px);
  font-weight: bold;
  color: rgba(255, 255, 255, 0.2);
  
  z-index: 0;
  margin-bottom: 0;
  line-height: 1;
  white-space: nowrap;
}

.solutions-title {
  font-size: clamp(22px, 4.5vw, 48px);
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
  
  position: relative;
  z-index: 1;
  margin-top: -10px;
  line-height: 1.15;
  white-space: nowrap;
}

.solutions-line {
  width: 3px;
  height: 40px;
  background-color: var(--accent);
  margin: 0 auto 30px;
  position: relative;
  z-index: 1;
}

.solutions-description {
  font: 14px / 1.8 system-ui, "Microsoft YaHei", "微软雅黑", "arial", "tahoma", "MicrosoftJhengHei";
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  text-align: center;
  line-height: 1.8;
}

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  width: 1198px;
  height: 500px;
  text-align: left;
  position: relative;
  z-index: 1;
  margin-top: 40px;
  background: transparent;
  border-collapse: collapse;
  grid-auto-flow: dense;
  margin-left: auto;
  margin-right: auto;
}

/* 确保所有解决方案卡片之间没有间距 */
.home-solution-item {
  padding: 40px;
  transition: all 0.3s ease;
  position: relative;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 !important;
  border-radius: 0 !important;
  border: none !important;
  box-sizing: border-box;
  overflow: hidden;
  background: transparent;
}

.home-solution-item-1 {
  grid-row: 1;
  grid-column: 1;
  background: #fff;
  color: #333;
  cursor: pointer;
}

.home-solution-item-1 .home-solution-item-subtitle {
  color: var(--text-muted);
  font-size: var(--text-base);
  margin-bottom: 2px;
  letter-spacing: 1px;
}

.home-solution-item-1 .home-solution-item-title {
  color: var(--accent);
  font-size: var(--text-2xl);
  font-weight: bold;
  margin-bottom: 5px;
  
}

.home-solution-item-1 .home-solution-item-description {
  color: #666;
  font-size: var(--text-sm);
  line-height: 1.6;
  margin-bottom: 10px;
  flex: 1;
  width: 232px;
}

.home-solution-item-1 .home-solution-item-link,
.home-solution-item-2 .home-solution-item-link,
.home-solution-item-3 .home-solution-item-link,
.home-solution-item-4 .home-solution-item-link {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 37px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--accent);
  color: var(--accent);
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 2;
}

.home-solution-item-1 .home-solution-item-link:hover,
.home-solution-item-3 .home-solution-item-link:hover,
.home-solution-item-4 .home-solution-item-link:hover,
.home-solution-item-5 .home-solution-item-link:hover {
  background-color: var(--accent);
  color: #fff;
}

.home-solution-item-2 .home-solution-item-link {
  border-color: #fff;
  color: #fff;
}

.home-solution-item-2 .home-solution-item-link:hover {
  background-color: #fff;
  color: var(--accent);
}

/* 确保所有解决方案卡片都没有圆角和间距 */
.home-solution-item-1, .home-solution-item-2, .home-solution-item-3, .home-solution-item-4, .home-solution-item-5 {
  border-radius: 0 !important;
  margin: 0 !important;
  padding: 40px !important;
  position: relative;
}

/* 第一行：智能制造（1列）、食品行业解决方案（2列）、第三列空着、第四列空着 */
/* 第二行：交通解决方案（1列）、机场安防解决方案（2-3列，占两列）、了解详情（4列） */
.home-solution-item-2 {
  grid-row: 1;
  grid-column: 2;
  background: rgb(133, 109, 204);
  color: #fff;
  cursor: pointer;
}

.home-solution-item-2 .home-solution-item-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: var(--text-base);
  margin-bottom: 2px;
  letter-spacing: 1px;
}

.home-solution-item-2 .home-solution-item-title {
  color: #fff;
  font-size: var(--text-2xl);
  font-weight: bold;
  margin-bottom: 5px;
  
  white-space: nowrap;
}

.home-solution-item-2 .home-solution-item-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: var(--text-sm);
  line-height: 1.6;
  margin-bottom: 10px;
  flex: 1;
}

.home-solution-item-3 {
  grid-row: 2;
  grid-column: 1;
  background: rgba(51, 51, 51, 0.95);
  color: #fff;
  cursor: pointer;
}

.home-solution-item-3 .home-solution-item-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--text-base);
  margin-bottom: 2px;
  letter-spacing: 1px;
}

.home-solution-item-3 .home-solution-item-title {
  color: #fff;
  font-size: var(--text-2xl);
  font-weight: bold;
  margin-bottom: 5px;
  
}

.home-solution-item-3 .home-solution-item-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--text-sm);
  line-height: 1.6;
  margin-bottom: 10px;
  flex: 1;
}

.home-solution-item-4 {
  grid-row: 2;
  grid-column: 2 / 4;
  background: url('/-48680.jpg');
  background-size: cover;
  background-position: center;
  color: #333;
  cursor: pointer;
}

.home-solution-item-4 .home-solution-item-subtitle {
  color: #fff;
  font-size: var(--text-base);
  margin-bottom: 2px;
  letter-spacing: 1px;
}

.home-solution-item-4 .home-solution-item-title {
  color: #fff;
  font-size: var(--text-2xl);
  font-weight: bold;
  margin-bottom: 5px;
  
}

.home-solution-item-4 .home-solution-item-description {
  color: #fff;
  font-size: var(--text-sm);
  line-height: 1.6;
  margin-bottom: 10px;
  flex: 1;
}

.home-solution-item-5 {
  grid-row: 2;
  grid-column: 4;
  background: #fff;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.home-solution-item-5 .home-solution-item-title {
  font-size: var(--text-xl);
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
  
}

.home-solution-item-5 .home-solution-item-description {
  margin-bottom: 10px;
  color: #666;
  text-align: center;
  font-size: var(--text-sm);
  line-height: 1.6;
}

.home-solution-item-5 .home-solution-item-link {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 37px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--accent);
  color: var(--accent);
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 2;
}

@media (max-width: 768px) {
  .solutions-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 1fr);
  }
}







/* 关于我们样式 */
.about {
  padding: 60px 0 80px;
  background-color: #fff;
  color: #333;
}

.about-container {
  width: 1200px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 20px;
}

.about-top-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 60px;
  gap: 40px;
  flex-wrap: wrap;
}

.about-header {
  flex: 0 0 300px;
  position: relative;
  text-align: left;
  height: 100px;
  display: flex;
  align-items: flex-start;
  padding-top: 5px;
}

.about-title-container {
  position: relative;
  display: block;
  width: 100%;
  height: 120px;
  margin-left: 15px;
}

.about-bg-title {
  font-size: var(--text-5xl) !important;
  font-weight: bold !important;
  color: #eeeeee !important;
  z-index: 0 !important;
  letter-spacing: 1px !important;
  line-height: 1 !important;
  margin: 0 !important;
  position: absolute !important;
  top: -5px !important;
  left: 0 !important;
}

.about-title {
  font-size: var(--text-2xl) !important;
  font-weight: bold !important;
  color: #333 !important;
  margin: 0 !important;
  position: absolute !important;
  z-index: 1 !important;
  bottom: 0 !important;
  right: 0 !important;
}

.about-line {
  width: 2px;
  height: 40px;
  background-color: var(--accent);
  position: relative;
  z-index: 1;
  margin-right: 15px;
}

.about-title-container {
  position: relative;
  display: inline-block;
}

.about-text-wrapper {
  width: 613px;
  height: 230px;
  padding-top: 0;
  margin-left: 0;
  text-align: left;
}

.about-description {
  
  font-size: var(--text-base);
  line-height: 2;
  color: #666666;
  text-align: left;
  margin: 0 0 20px 0;
  opacity: 0;
  transform: translateY(-30px);
  transition: all 0.8s ease;
}

.about-description.animate-fade-down {
  opacity: 1;
  transform: translateY(0);
}

.about-description-red {
  color: #ff0000;
}

.about-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  text-align: left;
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
}

.about-feature {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  text-align: left;
  width: 100%;
}

.about-feature-icon {
  margin-bottom: 12px;
  align-self: flex-start;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.about-feature-icon.animate-fade-up {
  opacity: 1;
  transform: translateY(0);
}

.about-feature-icon svg {
  display: block;
  margin: 0;
  width: 48px;
  height: 48px;
}

.about-feature-description {
  font: 12px / 1.5 system-ui, "Microsoft YaHei", "微软雅黑", "arial", "tahoma", "MicrosoftJhengHei";
  color: #666;
  text-align: left;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  opacity: 0;
  transform: translateY(-30px);
  transition: all 0.8s ease;
}

.about-feature-description.animate-fade-down {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .about-top-section {
    flex-wrap: wrap;
  }
  
  .about-header {
    flex: 0 0 100%;
    margin-bottom: 20px;
  }
  
  .about-text-wrapper {
    flex: 0 0 100%;
    min-width: 100%;
    text-align: left;
  }
  
  .about-description {
    text-align: left;
  }
  
  .about-features {
    grid-template-columns: 1fr;
  }
}

/* 产品与服务样式 */
.products-services {
  padding: 60px 0;
  background-color: #f5f5f5;
  color: #333;
}

.products-services-container {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  max-width: 100%;
  padding: 0 20px;
}

.products-services-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  padding-top: 40px;
}

.products-services-bg-title {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: clamp(36px, 8vw, 72px);
  font-weight: bold;
  color: rgba(0, 0, 0, 0.05);
  
  z-index: 0;
  white-space: nowrap;
  line-height: 1;
  max-width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
}

.products-services-title {
  font-size: clamp(20px, 3.2vw, 36px);
  font-weight: bold;
  color: #333;
  margin-top: 90px;
  margin-bottom: 0px;
  
  position: relative;
  z-index: 1;
  line-height: 1.15;
  white-space: nowrap;
}

.products-services-line {
  width: 5px;
  height: 37px;
  background-color: var(--accent);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.products-services-description {
  font-size: var(--text-sm);
  color: #666;
  margin-bottom: 60px;
  line-height: 1.75;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
}

.products-services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  text-align: left;
  position: relative;
  z-index: 1;
}

.product-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.product-icon {
  margin-right: 15px;
  flex-shrink: 0;
}

.product-content {
  flex: 1;
}

.product-title {
  font-size: clamp(15px, 1.05vw + 12px, 18px);
  font-weight: bold;
  color: var(--accent);
  margin-bottom: 10px;
  
  line-height: 1.25;
}

.product-description {
  font-size: var(--text-xs);
  color: #666;
  line-height: 1.75;
  text-align: justify;
}

.product-item-more {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  padding: 20px;
}

.product-item-more:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.product-more-btn {
  background: var(--accent);
  border: none;
  color: #fff;
  font-size: var(--text-base);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 40px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  border-radius: 8px;
}

.product-more-btn:hover {
  opacity: 0.8;
}

/* 页脚样式 */
.footer {
  background-color: #fff;
  padding: 20px 0;
  border-top: 1px solid #eee;
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

@media (max-width: 640px) {
  .solutions-bg-title,
  .solutions-title,
  .products-services-bg-title,
  .products-services-title {
    white-space: normal;
  }
}
</style>