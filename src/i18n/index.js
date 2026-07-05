import { ref, reactive, watch } from 'vue';
import messages from './messages';

// 默认语言为英文
const currentLocale = ref('en-US');

// 语言列表
const locales = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en-US', label: 'English' },
  { value: 'ja-JP', label: '日本語' }
];

// 获取当前语言的消息
const getMessages = () => {
  return messages[currentLocale.value] || messages['zh-CN'];
};

const updateSeoMeta = (locale) => {
  const html = document.documentElement;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  const titleElement = document.querySelector('title');
  
  const langMap = {
    'zh-CN': 'zh',
    'en-US': 'en',
    'ja-JP': 'ja'
  };
  
  const titles = {
    'zh-CN': '智能科技赋能引擎 - 人工智能+数字基建赋能行业创新',
    'en-US': 'Smart Technology Empowerment Engine - AI + Digital Infrastructure',
    'ja-JP': 'スマートテクノロジーエンパワーメントエンジン - AI＋デジタル基盤'
  };
  
  const descriptions = {
    'zh-CN': '我们是智能科技领域的领先企业，专注于智能家居、物联网技术和人工智能应用的解决方案。通过技术创新和定制化服务，为家庭、商业和工业提供全面的智能化支持，提升用户体验和业务效率。',
    'en-US': 'We are a leading enterprise in smart technology, specializing in solutions for smart homes, IoT technology, and AI applications. Through technological innovation and customized services, we provide comprehensive intelligent support for residential, commercial, and industrial sectors, enhancing user experiences and operational efficiency.',
    'ja-JP': 'スマートテクノロジー領域のリーディングカンパニーとして、スマートホーム、IoT技術、AIアプリケーションのソリューションに特化しています。技術革新とカスタマイズサービスを通じて、住宅、商業、産業部門に包括的なインテリジェントサポートを提供し、ユーザー体験と運用効率を向上させています。'
  };
  
  html.lang = langMap[locale] || 'en';
  
  if (descriptionMeta) {
    descriptionMeta.content = descriptions[locale] || descriptions['en-US'];
  }
  
  if (titleElement) {
    titleElement.textContent = titles[locale] || titles['en-US'];
  }
};

// 切换语言
const setLocale = (locale) => {
  currentLocale.value = locale;
  localStorage.setItem('locale', locale);
  updateSeoMeta(locale);
};

const getUrlParam = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

// 初始化时从本地存储读取语言设置
const initLocale = () => {
  const urlLang = getUrlParam('lang');
  const savedLocale = localStorage.getItem('locale');
  
  if (urlLang && messages[urlLang]) {
    currentLocale.value = urlLang;
    localStorage.setItem('locale', urlLang);
  } else if (savedLocale && messages[savedLocale]) {
    currentLocale.value = savedLocale;
  }
  updateSeoMeta(currentLocale.value);
};

// 初始化
initLocale();

export { currentLocale, locales, getMessages, setLocale };