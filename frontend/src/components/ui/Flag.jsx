import { getFlagUrl } from '../../utils/flags.js'

const SIZE_MAP = {
  xs:  { w: 20,  h: 15,  cdn: 20  },
  sm:  { w: 28,  h: 21,  cdn: 40  },
  md:  { w: 40,  h: 30,  cdn: 40  },
  lg:  { w: 56,  h: 42,  cdn: 80  },
  xl:  { w: 80,  h: 60,  cdn: 80  },
  '2xl': { w: 112, h: 84, cdn: 160 },
}

function getFallbackUrl(codigoIso) {
  return `https://flagicons.lipis.dev/flags/4x3/${codigoIso.toLowerCase()}.svg`
}

export default function Flag({ codigoIso, nome, size = 'md', className = '', rounded = true }) {
  const { w, h, cdn } = SIZE_MAP[size] ?? SIZE_MAP.md
  const src = getFlagUrl(codigoIso, cdn)

  if (!src) {
    return <span className={`text-2xl leading-none ${className}`}>🏳️</span>
  }

  return (
    <img
      src={src}
      alt={nome ? `Bandeira ${nome}` : codigoIso}
      width={w}
      height={h}
      className={`object-cover flex-shrink-0 ${rounded ? 'rounded-sm' : ''} ${className}`}
      style={{ aspectRatio: '4/3' }}
      onError={e => {
        const img = e.currentTarget
        if (!img.dataset.retry) {
          img.dataset.retry = '1'
          img.src = getFallbackUrl(codigoIso)
        } else {
          img.style.display = 'none'
          img.insertAdjacentHTML(
            'afterend',
            `<span style="font-size:${Math.round(h * 0.85)}px;line-height:1">🏳️</span>`
          )
        }
      }}
    />
  )
}
