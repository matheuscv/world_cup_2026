/**
 * Fetch com retry automático para erros de rede.
 * Não faz retry em erros HTTP (4xx/5xx) — apenas em falhas de conexão.
 */
export async function fetchRetry(url, options = {}, { retries = 2, delay = 800 } = {}) {
  let lastError
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fetch(fullUrl, options)
    } catch (err) {
      lastError = err
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, delay * (attempt + 1)))
      }
    }
  }
  throw lastError
}
