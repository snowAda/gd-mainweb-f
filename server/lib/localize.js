/** API 多语言：持久化为 { 'zh-CN', 'en-US', 'ja-JP' } 对象，接口按 locale 展平 */

const SUPPORTED = ['zh-CN', 'en-US', 'ja-JP']

export function getLocale(req) {
  const q = req.query.locale || req.query.lang
  if (q && SUPPORTED.includes(String(q))) return String(q)
  const h = req.get('x-locale')
  if (h && SUPPORTED.includes(h)) return h
  return 'zh-CN'
}

export function isRaw(req) {
  const r = req.query.raw
  return r === '1' || r === 'true' || r === 'yes'
}

export function pickLocalizedText(value, locale) {
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

function toI18nObject(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return {
      'zh-CN': String(value['zh-CN'] ?? value.zh ?? ''),
      'en-US': String(value['en-US'] ?? value.en ?? value['zh-CN'] ?? ''),
      'ja-JP': String(value['ja-JP'] ?? value.ja ?? value['zh-CN'] ?? '')
    }
  }
  if (typeof value === 'string') {
    return { 'zh-CN': value, 'en-US': value, 'ja-JP': value }
  }
  return { 'zh-CN': '', 'en-US': '', 'ja-JP': '' }
}

/** 管理后台提交字符串时只更新 zh-CN，保留已有 en/ja */
export function mergeStringIntoI18n(existingValue, newString) {
  const prev = toI18nObject(existingValue)
  return {
    'zh-CN': newString,
    'en-US': prev['en-US'] || newString,
    'ja-JP': prev['ja-JP'] || newString
  }
}

export function mergeI18nField(existingValue, incoming) {
  if (incoming == null) return existingValue
  if (typeof incoming === 'object' && !Array.isArray(incoming) && incoming['zh-CN'] != null) {
    return { ...toI18nObject(existingValue), ...incoming }
  }
  if (typeof incoming === 'string') {
    return mergeStringIntoI18n(existingValue, incoming)
  }
  return existingValue
}

export function localizeCategory(row, locale) {
  if (!row) return row
  return {
    ...row,
    name: pickLocalizedText(row.name, locale),
    description: pickLocalizedText(row.description, locale)
  }
}

export function localizeListItem(row, locale) {
  if (!row) return row
  return {
    ...row,
    title: pickLocalizedText(row.title, locale),
    description: pickLocalizedText(row.description, locale)
  }
}

export function localizeDetail(row, locale) {
  if (!row) return row
  return {
    ...row,
    title: pickLocalizedText(row.title, locale),
    description: pickLocalizedText(row.description, locale)
  }
}
