export function getFlagEmoji(codigoIso) {
  if (!codigoIso) return '🏳️'
  const code = codigoIso.toUpperCase().slice(0, 2)
  return code.split('').map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join('')
}

export function getFlagUrl(codigoIso, width = 40) {
  if (!codigoIso) return null
  return `https://flagcdn.com/w${width}/${codigoIso.toLowerCase()}.png`
}
