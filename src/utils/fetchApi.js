/**
 * 读取 JSON API。避免对空响应调用 response.json() 时出现
 * "Unexpected end of JSON input"（常见于后端未启动、代理无响应体）。
 */
export async function fetchApiJson(url, init) {
  let response
  try {
    response = await fetch(url, init)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    throw new Error(`网络请求失败: ${msg}（${url}）`)
  }

  const text = await response.text()

  if (!response.ok) {
    const snippet = text.trim() ? ` — ${text.trim().slice(0, 200)}` : ''
    throw new Error(`请求失败 ${response.status} ${response.statusText}${snippet}（${url}）`)
  }

  if (!text.trim()) {
    throw new Error(
      `接口返回空内容（${url}）。请确认已启动后端：npm run server 或 npm run dev:all（默认 http://localhost:8002），开发环境下 Vite 已将 /api 代理到该地址。`
    )
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error(
      `接口返回非 JSON（${url}）：${text.trim().slice(0, 160)}${text.length > 160 ? '…' : ''}`
    )
  }
}
