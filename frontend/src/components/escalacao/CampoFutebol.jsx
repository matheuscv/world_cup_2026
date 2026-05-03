import { useState } from 'react'
import JogadorSlot from './JogadorSlot.jsx'

// x e y em % — y=0 é o topo (ataque), y=100 é a base (goleiro)
export const FORMACOES = {
  '4-3-3': [
    { id: 'gk',  pos: 'GK',  label: 'GK',  x: 50, y: 87 },
    { id: 'rb',  pos: 'DEF', label: 'LD',  x: 80, y: 71 },
    { id: 'rcb', pos: 'DEF', label: 'ZD',  x: 62, y: 74 },
    { id: 'lcb', pos: 'DEF', label: 'ZE',  x: 38, y: 74 },
    { id: 'lb',  pos: 'DEF', label: 'LE',  x: 20, y: 71 },
    { id: 'rm',  pos: 'MID', label: 'MD',  x: 72, y: 51 },
    { id: 'cm',  pos: 'MID', label: 'MC',  x: 50, y: 54 },
    { id: 'lm',  pos: 'MID', label: 'ME',  x: 28, y: 51 },
    { id: 'rw',  pos: 'FWD', label: 'PD',  x: 75, y: 26 },
    { id: 'cf',  pos: 'FWD', label: 'CA',  x: 50, y: 22 },
    { id: 'lw',  pos: 'FWD', label: 'PE',  x: 25, y: 26 },
  ],
  '4-4-2': [
    { id: 'gk',  pos: 'GK',  label: 'GK',  x: 50, y: 87 },
    { id: 'rb',  pos: 'DEF', label: 'LD',  x: 80, y: 71 },
    { id: 'rcb', pos: 'DEF', label: 'ZD',  x: 62, y: 74 },
    { id: 'lcb', pos: 'DEF', label: 'ZE',  x: 38, y: 74 },
    { id: 'lb',  pos: 'DEF', label: 'LE',  x: 20, y: 71 },
    { id: 'rm',  pos: 'MID', label: 'MD',  x: 80, y: 51 },
    { id: 'rcm', pos: 'MID', label: 'MC',  x: 60, y: 54 },
    { id: 'lcm', pos: 'MID', label: 'MC',  x: 40, y: 54 },
    { id: 'lm',  pos: 'MID', label: 'ME',  x: 20, y: 51 },
    { id: 'rs',  pos: 'FWD', label: 'CA',  x: 64, y: 24 },
    { id: 'ls',  pos: 'FWD', label: 'CA',  x: 36, y: 24 },
  ],
  '4-2-3-1': [
    { id: 'gk',   pos: 'GK',  label: 'GK',  x: 50, y: 87 },
    { id: 'rb',   pos: 'DEF', label: 'LD',  x: 80, y: 71 },
    { id: 'rcb',  pos: 'DEF', label: 'ZD',  x: 62, y: 74 },
    { id: 'lcb',  pos: 'DEF', label: 'ZE',  x: 38, y: 74 },
    { id: 'lb',   pos: 'DEF', label: 'LE',  x: 20, y: 71 },
    { id: 'rdm',  pos: 'MID', label: 'VOL', x: 63, y: 59 },
    { id: 'ldm',  pos: 'MID', label: 'VOL', x: 37, y: 59 },
    { id: 'ram',  pos: 'MID', label: 'MEI', x: 75, y: 39 },
    { id: 'cam',  pos: 'MID', label: 'MEI', x: 50, y: 36 },
    { id: 'lam',  pos: 'MID', label: 'MEI', x: 25, y: 39 },
    { id: 'cf',   pos: 'FWD', label: 'CA',  x: 50, y: 18 },
  ],
  '3-5-2': [
    { id: 'gk',   pos: 'GK',  label: 'GK',  x: 50, y: 87 },
    { id: 'rcb',  pos: 'DEF', label: 'ZD',  x: 70, y: 73 },
    { id: 'cb',   pos: 'DEF', label: 'ZAG', x: 50, y: 76 },
    { id: 'lcb',  pos: 'DEF', label: 'ZE',  x: 30, y: 73 },
    { id: 'rwb',  pos: 'MID', label: 'ALD', x: 88, y: 53 },
    { id: 'rcm',  pos: 'MID', label: 'MC',  x: 67, y: 55 },
    { id: 'cm',   pos: 'MID', label: 'MC',  x: 50, y: 58 },
    { id: 'lcm',  pos: 'MID', label: 'MC',  x: 33, y: 55 },
    { id: 'lwb',  pos: 'MID', label: 'ALE', x: 12, y: 53 },
    { id: 'rs',   pos: 'FWD', label: 'CA',  x: 64, y: 25 },
    { id: 'ls',   pos: 'FWD', label: 'CA',  x: 36, y: 25 },
  ],
  '5-3-2': [
    { id: 'gk',   pos: 'GK',  label: 'GK',  x: 50, y: 87 },
    { id: 'rwb',  pos: 'DEF', label: 'ALD', x: 88, y: 67 },
    { id: 'rcb',  pos: 'DEF', label: 'ZD',  x: 71, y: 73 },
    { id: 'cb',   pos: 'DEF', label: 'ZAG', x: 50, y: 76 },
    { id: 'lcb',  pos: 'DEF', label: 'ZE',  x: 29, y: 73 },
    { id: 'lwb',  pos: 'DEF', label: 'ALE', x: 12, y: 67 },
    { id: 'rm',   pos: 'MID', label: 'MD',  x: 70, y: 51 },
    { id: 'cm',   pos: 'MID', label: 'MC',  x: 50, y: 54 },
    { id: 'lm',   pos: 'MID', label: 'ME',  x: 30, y: 51 },
    { id: 'rs',   pos: 'FWD', label: 'CA',  x: 64, y: 25 },
    { id: 'ls',   pos: 'FWD', label: 'CA',  x: 36, y: 25 },
  ],
  '4-1-4-1': [
    { id: 'gk',  pos: 'GK',  label: 'GK',  x: 50, y: 87 },
    { id: 'rb',  pos: 'DEF', label: 'LD',  x: 80, y: 71 },
    { id: 'rcb', pos: 'DEF', label: 'ZD',  x: 62, y: 74 },
    { id: 'lcb', pos: 'DEF', label: 'ZE',  x: 38, y: 74 },
    { id: 'lb',  pos: 'DEF', label: 'LE',  x: 20, y: 71 },
    { id: 'cdm', pos: 'MID', label: 'VOL', x: 50, y: 62 },
    { id: 'rm',  pos: 'MID', label: 'MD',  x: 80, y: 46 },
    { id: 'rcm', pos: 'MID', label: 'MC',  x: 60, y: 49 },
    { id: 'lcm', pos: 'MID', label: 'MC',  x: 40, y: 49 },
    { id: 'lm',  pos: 'MID', label: 'ME',  x: 20, y: 46 },
    { id: 'cf',  pos: 'FWD', label: 'CA',  x: 50, y: 18 },
  ],
  '3-4-3': [
    { id: 'gk',  pos: 'GK',  label: 'GK',  x: 50, y: 87 },
    { id: 'rcb', pos: 'DEF', label: 'ZD',  x: 70, y: 73 },
    { id: 'cb',  pos: 'DEF', label: 'ZAG', x: 50, y: 76 },
    { id: 'lcb', pos: 'DEF', label: 'ZE',  x: 30, y: 73 },
    { id: 'rwb', pos: 'MID', label: 'ALD', x: 83, y: 53 },
    { id: 'rcm', pos: 'MID', label: 'MC',  x: 62, y: 56 },
    { id: 'lcm', pos: 'MID', label: 'MC',  x: 38, y: 56 },
    { id: 'lwb', pos: 'MID', label: 'ALE', x: 17, y: 53 },
    { id: 'rw',  pos: 'FWD', label: 'PD',  x: 75, y: 26 },
    { id: 'cf',  pos: 'FWD', label: 'CA',  x: 50, y: 22 },
    { id: 'lw',  pos: 'FWD', label: 'PE',  x: 25, y: 26 },
  ],
}

export default function CampoFutebol({ formacao, titulares, onDrop, onSlotClick }) {
  const [dragOverSlot, setDragOverSlot] = useState(null)
  const slots = FORMACOES[formacao] || FORMACOES['4-3-3']

  return (
    <div
      className="relative w-full mx-auto rounded-xl overflow-hidden"
      style={{ aspectRatio: '3 / 5', maxWidth: '380px' }}
    >
      {/* Gramado */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1b6b2f 0%, #237a39 25%, #1e7233 50%, #237a39 75%, #1b6b2f 100%)',
        }}
      />

      {/* Listras do gramado */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <div
          key={i}
          className="absolute left-0 right-0"
          style={{
            top: `${i * 12.5}%`,
            height: '12.5%',
            background: i % 2 === 0 ? 'rgba(0,0,0,0.06)' : 'transparent',
          }}
        />
      ))}

      {/* Linhas do campo */}
      {/* Borda externa */}
      <div className="absolute border border-white/25 rounded-sm" style={{ inset: '4%' }} />

      {/* Linha do meio */}
      <div className="absolute left-[4%] right-[4%] bg-white/25" style={{ top: '50%', height: '1px' }} />

      {/* Círculo central */}
      <div
        className="absolute border border-white/25 rounded-full"
        style={{ width: '22%', height: '13.2%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      {/* Ponto central */}
      <div
        className="absolute bg-white/35 rounded-full"
        style={{ width: '1.5%', height: '0.9%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Área superior (grande) */}
      <div
        className="absolute border border-white/25 border-t-0"
        style={{ width: '52%', height: '18%', top: '4%', left: '50%', transform: 'translateX(-50%)' }}
      />
      {/* Área superior (pequena) */}
      <div
        className="absolute border border-white/20 border-t-0"
        style={{ width: '28%', height: '7%', top: '4%', left: '50%', transform: 'translateX(-50%)' }}
      />

      {/* Área inferior (grande) */}
      <div
        className="absolute border border-white/25 border-b-0"
        style={{ width: '52%', height: '18%', bottom: '4%', left: '50%', transform: 'translateX(-50%)' }}
      />
      {/* Área inferior (pequena) */}
      <div
        className="absolute border border-white/20 border-b-0"
        style={{ width: '28%', height: '7%', bottom: '4%', left: '50%', transform: 'translateX(-50%)' }}
      />

      {/* Ponto de pênalti superior */}
      <div
        className="absolute bg-white/30 rounded-full"
        style={{ width: '1.5%', height: '0.9%', top: '18%', left: '50%', transform: 'translateX(-50%)' }}
      />
      {/* Ponto de pênalti inferior */}
      <div
        className="absolute bg-white/30 rounded-full"
        style={{ width: '1.5%', height: '0.9%', bottom: '18%', left: '50%', transform: 'translateX(-50%)' }}
      />

      {/* Slots de jogadores */}
      {slots.map(slot => (
        <JogadorSlot
          key={slot.id}
          slot={slot}
          jogador={titulares[slot.id] || null}
          isDragOver={dragOverSlot === slot.id}
          onDragOver={e => { e.preventDefault(); setDragOverSlot(slot.id) }}
          onDragLeave={() => setDragOverSlot(null)}
          onDrop={e => { setDragOverSlot(null); onDrop(e, slot) }}
          onClick={() => onSlotClick(slot)}
        />
      ))}
    </div>
  )
}
