import { LumaState, LumaStage } from '../luma'

interface Props {
  state: LumaState
  size?: number
}

export default function Luma({ state, size = 96 }: Props) {
  const { stage, mood, droop, hasGlow } = state

  const breathDur = mood === 'blooming' ? '2.4s' : mood === 'tender' ? '5s' : '3.4s'
  const tiltDeg   = droop * 6

  // Palette — muted sage greens, warm skin, no harsh saturation
  const bodyGreen  = '#b5cfa4'
  const bodyShade  = '#9ab88a'
  const bodyLight  = '#d2e6c4'
  const stemGreen  = '#7aaa60'
  const leafGreen  = '#8ebe72'
  const leafLight  = '#b8d8a0'
  const skinTone   = '#e8d5b8'
  const skinShade  = '#d4be9e'
  const eyeDark    = '#3a5228'

  // Mood-tinted body overlay
  const moodTint =
    mood === 'blooming'   ? 'rgba(130,200,100,0.12)'
    : mood === 'glowing'  ? 'rgba(150,210,120,0.09)'
    : mood === 'tender'   ? 'rgba(200,180,160,0.08)'
    : 'transparent'

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size * 1.35 }}
    >
      {/* Ambient glow */}
      {hasGlow && (
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background: `radial-gradient(ellipse at 50% 65%, rgba(140,210,100,0.22) 0%, transparent 68%)`,
            animation: `lumaGlowPulse ${breathDur} ease-in-out infinite`,
          }}
        />
      )}

      <svg
        viewBox="0 0 60 82"
        width={size}
        height={size * 1.35}
        style={{
          transform: `rotate(${tiltDeg}deg)`,
          transformOrigin: '50% 85%',
          transition: 'transform 2.5s cubic-bezier(0.34,1.2,0.64,1)',
          overflow: 'visible',
        }}
        overflow="visible"
      >
        <defs>
          <radialGradient id="lg_body" cx="36%" cy="30%" r="70%">
            <stop offset="0%"   stopColor={bodyLight} />
            <stop offset="55%"  stopColor={bodyGreen} />
            <stop offset="100%" stopColor={bodyShade} />
          </radialGradient>
          <radialGradient id="lg_leg" cx="50%" cy="25%" r="70%">
            <stop offset="0%"   stopColor={lighten(skinTone, 12)} />
            <stop offset="100%" stopColor={skinShade} />
          </radialGradient>
          <radialGradient id="lg_leaf" cx="25%" cy="20%" r="78%">
            <stop offset="0%"   stopColor={leafLight} />
            <stop offset="100%" stopColor={leafGreen} />
          </radialGradient>
          <filter id="lf_soft" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="lf_blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="30" cy="78" rx="11" ry="2" fill={bodyShade} opacity="0.12" />

        {/* Stem + leaves (above body, rendered first so body overlaps base) */}
        <StemAndLeaves stage={stage} mood={mood} stemGreen={stemGreen} leafGreen={leafGreen} leafLight={leafLight} breathDur={breathDur} />

        {/* Body group — breathes */}
        <g
          style={{
            animation: `lumaBreath ${breathDur} ease-in-out infinite`,
            transformOrigin: '30px 58px',
          }}
        >
          {/* Soft shadow layer */}
          <ellipse cx="31" cy="59" rx="15" ry="17" fill={bodyShade} opacity="0.18" filter="url(#lf_blur)" />

          {/* Main body — pear/teardrop */}
          <path
            d="M30 38 C18 38 15 50 15 60 C15 70 21 76 30 76 C39 76 45 70 45 60 C45 50 42 38 30 38 Z"
            fill="url(#lg_body)"
            filter="url(#lf_soft)"
          />

          {/* Mood tint overlay */}
          {moodTint !== 'transparent' && (
            <path
              d="M30 38 C18 38 15 50 15 60 C15 70 21 76 30 76 C39 76 45 70 45 60 C45 50 42 38 30 38 Z"
              fill={moodTint}
            />
          )}

          {/* Highlight */}
          <ellipse cx="26" cy="49" rx="6.5" ry="8.5" fill="white" opacity="0.11" />
          <ellipse cx="24" cy="47" rx="3" ry="4"     fill="white" opacity="0.07" />

          {/* Face */}
          <Face mood={mood} eyeDark={eyeDark} breathDur={breathDur} />

          {/* Legs */}
          <Legs skinShade={skinShade} breathDur={breathDur} />
        </g>
      </svg>

      <style>{`
        @keyframes lumaBreath {
          0%, 100% { transform: scaleY(1)     scaleX(1);     }
          50%       { transform: scaleY(1.025) scaleX(0.982); }
        }
        @keyframes lumaStemSway {
          0%, 100% { transform: rotate(0deg);    }
          30%      { transform: rotate(1.6deg);  }
          65%      { transform: rotate(-1.1deg); }
        }
        @keyframes lumaLeafL {
          0%, 100% { transform: rotate(0deg);  }
          45%      { transform: rotate(-3.5deg);}
          75%      { transform: rotate(1.2deg); }
        }
        @keyframes lumaLeafR {
          0%, 100% { transform: rotate(0deg);  }
          45%      { transform: rotate(3.5deg); }
          75%      { transform: rotate(-1.2deg);}
        }
        @keyframes lumaBlink {
          0%, 88%, 100% { transform: scaleY(1);    }
          91%            { transform: scaleY(0.08); }
        }
        @keyframes lumaBlinkSlow {
          0%, 92%, 100% { transform: scaleY(1);    }
          95%            { transform: scaleY(0.08); }
        }
        @keyframes lumaGlowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1);    }
          50%      { opacity: 1;   transform: scale(1.06); }
        }
        @keyframes lumaFlowerFloat {
          0%, 100% { transform: translateY(0px)   rotate(0deg);  }
          50%      { transform: translateY(-1px)   rotate(2.5deg);}
        }
      `}</style>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Stem, leaves, flower tip — varies by stage
// ---------------------------------------------------------------------------

function StemAndLeaves({
  stage, mood, stemGreen, leafGreen, leafLight, breathDur,
}: {
  stage: LumaStage; mood: string; stemGreen: string; leafGreen: string; leafLight: string; breathDur: string
}) {
  // How tall the stem is per stage
  const stemH: Record<LumaStage, number> = {
    new_sprout:    10,
    first_leaves:  16,
    growing:       24,
    thriving:      30,
    flourishing:   36,
    fully_bloomed: 42,
  }
  const h = stemH[stage]
  const topY = 38 - h  // stem tip Y coordinate (body crown at y=38)

  const leafFill = `url(#lg_leaf)`

  // Leaf counts per stage
  const leafPairs: Record<LumaStage, number> = {
    new_sprout:    1,
    first_leaves:  1,
    growing:       2,
    thriving:      3,
    flourishing:   3,
    fully_bloomed: 3,
  }
  const pairs = leafPairs[stage]

  const showFlower = stage === 'fully_bloomed'

  return (
    <g style={{ animation: `lumaStemSway 4.5s ease-in-out infinite`, transformOrigin: `30px 38px` }}>
      {/* Stem */}
      <path
        d={`M30 38 Q${29.5} ${38 - h * 0.5} 30 ${topY}`}
        stroke={stemGreen}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Leaf pair 1 — low on stem */}
      {pairs >= 1 && (
        <>
          <g style={{ animation: `lumaLeafL 4.2s ease-in-out 0.2s infinite`, transformOrigin: `27px ${38 - h * 0.35}px` }}>
            <path
              d={`M29 ${38 - h * 0.3} Q${19} ${38 - h * 0.52} ${21.5} ${38 - h * 0.68} Q${27} ${38 - h * 0.5} ${29} ${38 - h * 0.3}`}
              fill={leafFill} opacity="0.93"
            />
          </g>
          <g style={{ animation: `lumaLeafR 4.2s ease-in-out 0.6s infinite`, transformOrigin: `33px ${38 - h * 0.35}px` }}>
            <path
              d={`M31 ${38 - h * 0.3} Q${41} ${38 - h * 0.52} ${38.5} ${38 - h * 0.68} Q${33} ${38 - h * 0.5} ${31} ${38 - h * 0.3}`}
              fill={leafFill} opacity="0.93"
            />
          </g>
        </>
      )}

      {/* Leaf pair 2 — mid stem */}
      {pairs >= 2 && (
        <>
          <g style={{ animation: `lumaLeafL 5s ease-in-out 0.1s infinite`, transformOrigin: `26px ${38 - h * 0.62}px` }}>
            <path
              d={`M29 ${38 - h * 0.58} Q${18} ${38 - h * 0.74} ${20.5} ${38 - h * 0.88} Q${27} ${38 - h * 0.72} ${29} ${38 - h * 0.58}`}
              fill={leafFill} opacity="0.88"
            />
          </g>
          <g style={{ animation: `lumaLeafR 5s ease-in-out 0.5s infinite`, transformOrigin: `34px ${38 - h * 0.62}px` }}>
            <path
              d={`M31 ${38 - h * 0.58} Q${42} ${38 - h * 0.74} ${39.5} ${38 - h * 0.88} Q${33} ${38 - h * 0.72} ${31} ${38 - h * 0.58}`}
              fill={leafFill} opacity="0.88"
            />
          </g>
        </>
      )}

      {/* Leaf pair 3 — near tip */}
      {pairs >= 3 && (
        <>
          <g style={{ animation: `lumaLeafL 5.5s ease-in-out 0.3s infinite`, transformOrigin: `25px ${38 - h * 0.86}px` }}>
            <path
              d={`M29.5 ${38 - h * 0.83} Q${16} ${38 - h * 0.95} ${19} ${38 - h * 1.06} Q${27} ${38 - h * 0.93} ${29.5} ${38 - h * 0.83}`}
              fill={leafFill} opacity="0.84"
            />
          </g>
          <g style={{ animation: `lumaLeafR 5.5s ease-in-out 0.7s infinite`, transformOrigin: `35px ${38 - h * 0.86}px` }}>
            <path
              d={`M30.5 ${38 - h * 0.83} Q${44} ${38 - h * 0.95} ${41} ${38 - h * 1.06} Q${33} ${38 - h * 0.93} ${30.5} ${38 - h * 0.83}`}
              fill={leafFill} opacity="0.84"
            />
          </g>
        </>
      )}

      {/* Tip: bud or flower */}
      {!showFlower ? (
        <ellipse cx="30" cy={topY} rx="2" ry="2.8" fill={leafGreen} opacity="0.9" />
      ) : (
        <FlowerTip cy={topY} />
      )}
    </g>
  )
}

// ---------------------------------------------------------------------------
// Face
// ---------------------------------------------------------------------------

function Face({ mood, eyeDark, breathDur }: { mood: string; eyeDark: string; breathDur: string }) {
  const eyeRy =
    mood === 'tender'    ? 1.1
    : mood === 'blooming' ? 2.0
    : mood === 'glowing'  ? 1.75
    : 1.5

  const blinkAnim = (mood === 'tender' || mood === 'reflective')
    ? `lumaBlinkSlow 8s ease-in-out infinite`
    : `lumaBlink 5.5s ease-in-out infinite`

  const mouthY = 63
  const mouthPath =
    mood === 'blooming'   ? `M26.5 ${mouthY} Q30 ${mouthY + 2.6} 33.5 ${mouthY}`
    : mood === 'glowing'  ? `M27 ${mouthY} Q30 ${mouthY + 2} 33 ${mouthY}`
    : mood === 'tender'   ? `M27.5 ${mouthY + 0.4} Q30 ${mouthY + 0.1} 32.5 ${mouthY + 0.4}`
    : `M27.5 ${mouthY} Q30 ${mouthY + 1.4} 32.5 ${mouthY}`

  return (
    <g>
      {/* Eyes */}
      <g style={{ animation: blinkAnim, transformOrigin: '30px 57px' }}>
        <ellipse cx="25.2" cy="57" rx="2.1" ry={eyeRy} fill={eyeDark} />
        <ellipse cx="34.8" cy="57" rx="2.1" ry={eyeRy} fill={eyeDark} />
        {/* Specular shine */}
        <circle cx="26.1" cy="56.1" r="0.65" fill="white" opacity="0.75" />
        <circle cx="35.7" cy="56.1" r="0.65" fill="white" opacity="0.75" />
      </g>

      {/* Cheek blush */}
      {(mood === 'blooming' || mood === 'glowing') && (
        <>
          <ellipse cx="20" cy="61" rx="3.2" ry="1.8" fill="#f2a89a" opacity="0.16" />
          <ellipse cx="40" cy="61" rx="3.2" ry="1.8" fill="#f2a89a" opacity="0.16" />
        </>
      )}

      {/* Mouth */}
      <path
        d={mouthPath}
        stroke={eyeDark}
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
        style={{ animation: `lumaBreath ${breathDur} ease-in-out infinite`, transformOrigin: `30px ${mouthY}px` }}
      />
    </g>
  )
}

// ---------------------------------------------------------------------------
// Legs — two stubby rounded pads
// ---------------------------------------------------------------------------

function Legs({ skinShade, breathDur }: { skinShade: string; breathDur: string }) {
  return (
    <g style={{ animation: `lumaBreath ${breathDur} ease-in-out infinite`, transformOrigin: '30px 74px' }}>
      <ellipse cx="24" cy="75" rx="5.2" ry="3.5" fill="url(#lg_leg)" />
      <ellipse cx="36" cy="75" rx="5.2" ry="3.5" fill="url(#lg_leg)" />
      <ellipse cx="23" cy="73.8" rx="2" ry="1.1" fill="white" opacity="0.16" />
      <ellipse cx="35" cy="73.8" rx="2" ry="1.1" fill="white" opacity="0.16" />
    </g>
  )
}

// ---------------------------------------------------------------------------
// Flower tip
// ---------------------------------------------------------------------------

function FlowerTip({ cy }: { cy: number }) {
  const petal  = '#fce9e6'
  const center = '#f0b090'

  return (
    <g transform={`translate(30, ${cy})`} style={{ animation: 'lumaFlowerFloat 3.5s ease-in-out infinite' }}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx={Math.cos(((deg - 90) * Math.PI) / 180) * 4}
          cy={Math.sin(((deg - 90) * Math.PI) / 180) * 4}
          rx="2.2" ry="1.6"
          fill={petal}
          transform={`rotate(${deg}, ${Math.cos(((deg - 90) * Math.PI) / 180) * 4}, ${Math.sin(((deg - 90) * Math.PI) / 180) * 4})`}
          opacity="0.9"
        />
      ))}
      <circle cx="0" cy="0" r="2.2" fill={center} />
      <circle cx="-0.5" cy="-0.5" r="0.6" fill="white" opacity="0.4" />
    </g>
  )
}

// ---------------------------------------------------------------------------

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16)
  const r   = Math.min(255, (num >> 16) + amount)
  const g   = Math.min(255, ((num >> 8) & 0xff) + amount)
  const b   = Math.min(255, (num & 0xff) + amount)
  return `rgb(${r},${g},${b})`
}
