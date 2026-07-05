import { currentLocale } from '../i18n'

/** 为公开 API 请求附加当前界面语言（与 server/lib/localize.js 的 locale 一致） */
export function withLocale(url) {
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}locale=${encodeURIComponent(currentLocale.value)}`
}

/**
 * 将接口中的字符串或 { zh-CN, en-US, ja-JP } 展平为当前语言的纯文本。
 * 与后端 pickLocalizedText 行为一致，避免未展平对象在页面上显示为 [object Object]。
 */
export function pickApiText(value) {
  const locale = currentLocale.value
  if (value == null || value === '') return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object' && !Array.isArray(value)) {
    if (value[locale]) return String(value[locale])
    if (value['zh-CN']) return String(value['zh-CN'])
    if (value['en-US']) return String(value['en-US'])
    if (value['ja-JP']) return String(value['ja-JP'])
    const first = Object.values(value).find((v) => typeof v === 'string' && v)
    return first != null ? String(first) : ''
  }
  return String(value)
}

export function normalizeCategoryApiRow(row) {
  if (!row) return row
  return {
    ...row,
    name: pickApiText(row.name),
    description: pickApiText(row.description)
  }
}

export function normalizeListApiRow(row) {
  if (!row) return row
  return {
    ...row,
    title: pickApiText(row.title),
    description: pickApiText(row.description)
  }
}

export function normalizeDetailApiRow(row) {
  if (!row || typeof row !== 'object' || row.error) return row
  return {
    ...row,
    title: pickApiText(row.title),
    description: pickApiText(row.description)
  }
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  const locale = currentLocale.value
  if (locale === 'ja-JP') {
    return `${year}年${month}月${day}日`
  }
  return `${year}/${month}/${day}`
}
