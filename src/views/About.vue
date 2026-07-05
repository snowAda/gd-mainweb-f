<script setup>
import { ref, computed, onMounted } from 'vue'
import { currentLocale, setLocale, getMessages } from '../i18n'

// 备案号，从环境变量获取
const beianCode = ref('')

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

// 页面加载动画
const isHeaderVisible = ref(false)

onMounted(() => {
  // 获取备案号
  beianCode.value = window.BEIAN_CODE || ''
  
  // 触发头部动画
  isHeaderVisible.value = true
  
  // 动态加载高德地图 API
  const script = document.createElement('script')
  script.type = 'text/javascript'
  // 请替换为您的高德地图API密钥
  const amapKey = 'b06109ccb45448efe653427c1e529e3b' // 这里需要替换为实际的API密钥
  script.src = `https://webapi.amap.com/maps?v=2.0&key=${amapKey}`
  script.onload = function() {
    const m = getMessages()
    const loc = (k) => m[k] || k
    // 初始化地图 - 用户指定的位置
    const map = new AMap.Map('map-container', {
      zoom: 17,
      center: [118.725128, 32.03724], // 用户指定的准确坐标
      resizeEnable: true
    })
    // 添加大头针标记
    const marker = new AMap.Marker({
      position: [118.725128, 32.03724], // 用户指定的准确坐标
      title: loc('mapMarkerTitle'),
      icon: new AMap.Icon({
        size: new AMap.Size(30, 40), // 图标大小
        image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png', // 大头针图标
        imageSize: new AMap.Size(30, 40) // 图标显示大小
      }),
      offset: new AMap.Pixel(-15, -40) // 图标偏移
    })
    marker.setMap(map)
    
    // 添加信息窗口
    const infoWindow = new AMap.InfoWindow({
      content: `
        <div style="padding: 10px;">
          <h3>${loc('mapMarkerTitle')}</h3>
          <p>${loc('mapLineAddress')}</p>
          <p>${loc('mapLinePhone')}</p>
          <p>${loc('mapLineEmail')}</p>
        </div>
      `,
      offset: new AMap.Pixel(0, -30)
    })
    marker.on('click', function() {
      infoWindow.open(map, marker.getPosition())
    })
    
    map.setFitView()
  }
  document.head.appendChild(script)
})
</script>

<template>
  <div class="about-page">
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
              <div class="w-nav-item current">
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

    <!-- 页面头部 -->
    <section class="about-header-section">
      <div class="about-header-content" :class="{ 'animate-slide-left': isHeaderVisible }">
        <h1 class="about-s-bg-title">Company.</h1>
        <h2 class="about-s-title">{{ t('aboutPageTitle') }}</h2>
        <p class="about-header-description">
          {{ t('aboutPageDescription') }}
        </p>
      </div>
    </section>

    <!-- 公司特性 -->
    <section class="about-features">
      <div class="about-features-container">
        <div class="about-feature">
          <div class="about-feature-icon">
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
          <p class="about-feature-description">
            {{ t('aboutFeature1') }}
          </p>
        </div>
        <div class="about-feature">
          <div class="about-feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="18" r="6" stroke="#999" stroke-width="1.5"/>
              <path d="M10 42C10 34 16 28 24 28C32 28 38 34 38 42" stroke="#999" stroke-width="1.5"/>
            </svg>
          </div>
          <p class="about-feature-description">
            {{ t('aboutFeature2') }}
          </p>
        </div>
        <div class="about-feature">
          <div class="about-feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="28" height="28" stroke="#999" stroke-width="1.5"/>
              <rect x="16" y="16" width="16" height="16" stroke="#999" stroke-width="1.5"/>
              <rect x="22" y="22" width="4" height="4" fill="#999"/>
            </svg>
          </div>
          <p class="about-feature-description">
            {{ t('aboutFeature3') }}
          </p>
        </div>
      </div>
    </section>

    <!-- 公司简介详细 -->
    <section class="about-detail">
      <div class="about-detail-container">
        <div class="about-detail-content">
          <h2 class="about-detail-title">{{ t('aboutPageTitle') }} <span class="about-detail-subtitle">Company</span></h2>
          <div class="about-detail-text">
            <p>{{ t('aboutDescription') }}</p>
          </div>
        </div>
        <div class="about-detail-image">
          <img src="/pexels-photo-447592.jpeg" :alt="t('aboutOfficeImageAlt')" loading="lazy" />
        </div>
      </div>
    </section>

    <!-- 合作伙伴 -->
    <section class="about-partners">
      <div class="about-partners-container">
        <div class="about-partners-content">
          <div class="about-partners-image">
            <img src="/10977155.jpg" :alt="t('aboutPartnersImageAlt')" loading="lazy" />
          </div>
          <div class="about-partners-title">
            <h3>{{ t('aboutPartners') }}</h3>
            <p>{{ t('aboutPartnersSubtitle') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="about-contact">
      <div class="about-contact-container">
        <div class="about-contact-content">
          <div class="contact-header">
            <h2 class="contact-title">{{ t('contactWelcomeTitle') }}</h2>
            <p class="contact-subtitle">{{ t('contactWelcomeSubtitle') }}</p>
          </div>
          <div class="contact-info">
            <p class="contact-item">
              <span class="contact-icon">🏢</span>
              <span>{{ t('contactCompanyNameDisplay') }}</span>
            </p>
            <p class="contact-item">
              <span class="contact-icon">📍</span>
              <span>{{ t('contactAddressGulou') }}</span>
            </p>
            <p class="contact-item">
              <span class="contact-icon">📞</span>
              <span>{{ t('contactPhoneDisplay') }}</span>
            </p>
            <p class="contact-item">
              <span class="contact-icon">📧</span>
              <span>{{ t('contactEmailDisplay') }}</span>
            </p>
          </div>
        </div>
        <div class="about-contact-map">
          <div id="map-container" style="width: 100%; height: 400px;"></div>
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

/* 页面头部样式 */
.about-header-section {
  height: 600px;
  background-image: url('/10970598.jpeg');
  background-position: 50% 50%;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-header-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
}

.about-header-content {
  text-align: left;
  position: relative;
  z-index: 1;
  color: #fff;
  max-width: 1200px;
  padding: 40px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 1.2s ease;
}

.about-header-content.animate-slide-left {
  opacity: 1;
  transform: translateX(0);
}

.about-s-bg-title {
  font-size: var(--text-7xl);
  font-weight: bold;
  color: rgba(255, 255, 255, 0.3);
  
  /* margin-bottom: 20px; */
  line-height: 1;
  /* margin-top: 50; */
}

.about-s-title {
  font-size: var(--text-3xl);
  font-weight: bold;
  color: #ffffff;
  
  margin-bottom: 20px;
  line-height: 1;
  position: relative;
  z-index: 9999;
  opacity: 1;
  visibility: visible;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

.about-header-description {
  font: 14px / 1.5 system-ui, "Microsoft YaHei", "微软雅黑", "arial", "tahoma", "MicrosoftJhengHei";
  color: #fff;
  line-height: 1.5;
  text-align: left;
  margin: 0;
  max-width: 1000px;
  letter-spacing: 0.5px;
}

/* 公司特性样式 */
.about-features {
  padding: 60px 0;
  background-color: #fff;
}

.about-features-container {
  width: 1200px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.about-feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
}

.about-feature-icon {
  margin-bottom: 20px;
}

.about-feature-icon svg {
  width: 48px;
  height: 48px;
}

.about-feature-description {
  font: 12px / 1.8 system-ui, "Microsoft YaHei", "微软雅黑", "arial", "tahoma", "MicrosoftJhengHei";
  color: #666;
  line-height: 1.8;
  text-align: center;
}

/* 公司简介详细样式 */
.about-detail {
  padding: 80px 0;
  background-color: #fff;
}

.about-detail-container {
  width: 1200px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 20px;
  display: flex;
  gap: 60px;
  align-items: flex-start;
}

.about-detail-content {
  flex: 1;
}

.about-detail-title {
  font-size: var(--text-xl);
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  
}

.about-detail-subtitle {
  font-size: var(--text-base);
  color: var(--text-muted);
  font-weight: normal;
  margin-left: 10px;
}

.about-detail-text {
  font: 12px / 1.8 system-ui, "Microsoft YaHei", "微软雅黑", "arial", "tahoma", "MicrosoftJhengHei";
  color: #666;
  line-height: 1.8;
  text-align: left;
}

.about-detail-text p {
  margin-bottom: 10px;
}

.about-detail-image {
  flex: 0 0 350px;
}

.about-detail-image img {
  width: 100%;
  height: auto;
  border-radius: 0;
}

/* 合作伙伴样式 */
.about-partners {
  padding: 80px 0;
  background-color: #fff;
}

.about-partners-container {
  width: 1200px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 20px;
}

.about-partners-content {
  display: flex;
  align-items: center;
  gap: 60px;
}

.about-partners-image {
  flex: 1;
}

.about-partners-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.about-partners-title {
  flex: 0 0 200px;
  text-align: right;
}

.about-partners-title h3 {
  font-size: var(--text-lg);
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  
}

.about-partners-title p {
  font: 12px / 1 system-ui, "Microsoft YaHei", "微软雅黑", "arial", "tahoma", "MicrosoftJhengHei";
  color: var(--text-muted);
}

/* 联系我们样式 */
.about-contact {
  padding: 80px 0;
  background-color: #f5f5f5;
}

.about-contact-container {
  width: 1200px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 20px;
  display: flex;
  gap: 60px;
  align-items: flex-start;
}

.about-contact-content {
  flex: 0 0 350px;
  background-color: #ffffff;
  border-left: 3px solid var(--accent);
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.contact-header {
  margin-bottom: 30px;
}

.contact-title {
  font-size: var(--text-xl);
  font-weight: bold;
  color: #333;
  background-color: #ffffff;
  display: inline-block;
  padding: 5px 10px;
  margin-bottom: 10px;
  
}

.contact-subtitle {
  font-size: var(--text-sm);
  color: #666;
  background-color: #ffffff;
  display: inline-block;
  padding: 3px 8px;
  margin: 0;
}

.contact-info {
  margin-top: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: var(--text-sm);
  color: #666;
  line-height: 1.5;
}

.contact-icon {
  font-size: var(--text-lg);
  margin-right: 12px;
  color: var(--accent);
  min-width: 24px;
}

.about-contact-map {
  flex: 1;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.about-contact-map img {
  width: 100%;
  height: auto;
  border-radius: 8px;
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
</style>