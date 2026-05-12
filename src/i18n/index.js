import { ref, reactive, watch } from 'vue';
import messages from './messages';

// 默认语言为简体中文
const currentLocale = ref('zh-CN');

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

// 切换语言
const setLocale = (locale) => {
  currentLocale.value = locale;
  // 存储到本地存储，下次打开时保持当前语言
  localStorage.setItem('locale', locale);
};

// 初始化时从本地存储读取语言设置
const initLocale = () => {
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale && messages[savedLocale]) {
    currentLocale.value = savedLocale;
  }
};

// 初始化
initLocale();

export { currentLocale, locales, getMessages, setLocale };