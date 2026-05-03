export function getFlagEmoji(codigoIso) {
  if (!codigoIso) return '🏳️'
  const code = codigoIso.toUpperCase().slice(0, 2)
  return code.split('').map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join('')
}
