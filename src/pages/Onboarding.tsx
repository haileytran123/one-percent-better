import { useNavigate } from 'react-router-dom'

interface Props {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: Props) {
  const navigate = useNavigate()

  function begin() {
    localStorage.setItem('1pb_onboarded', '1')
    onComplete()
    navigate('/', { replace: true })
  }

  return (
    <div
      className="relative flex flex-col min-h-dvh px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #faf7f2 0%, #f5f0e8 55%, #ede8df 100%)' }}
    >
      {/* Floating dust particles */}
      <Particles />

      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-14 relative z-10">
        <span className="w-5 h-1.5 rounded-full bg-stone-400 opacity-75" />
        <span className="w-1.5 h-1.5 rounded-full bg-stone-300 opacity-35" />
        <span className="w-1.5 h-1.5 rounded-full bg-stone-300 opacity-35" />
      </div>

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10 relative z-10">

        {/* Luma with glow radiating from her */}
        <div className="relative flex items-center justify-center">
          {/* Glow — centered on Luma, not floating above */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 200,
              height: 200,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -44%)',
              background: 'radial-gradient(ellipse at 50% 55%, rgba(148,200,118,0.22) 0%, rgba(180,220,150,0.10) 40%, transparent 70%)',
              animation: 'onbGlow 4.8s ease-in-out infinite',
            }}
          />
          <LumaDormant />
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-3 text-center max-w-[272px]">
          <h1
            className="font-display text-[28px] font-semibold text-stone-800 leading-[1.22]"
            style={{ letterSpacing: '-0.015em' }}
          >
            Most days disappear before we understand them.
          </h1>
          <p className="text-stone-400 text-[15px] leading-relaxed">
            We move fast. We forget what mattered.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 pb-12 flex flex-col items-center gap-3.5">
        <button
          onClick={begin}
          className="w-full max-w-[320px] py-[17px] font-medium text-[15px] transition-all duration-200 active:scale-[0.97]"
          style={{
            background: 'linear-gradient(145deg, #435f3a 0%, #364f2e 100%)',
            color: '#eeeae3',
            borderRadius: '18px',
            boxShadow: '0 6px 24px rgba(50,70,40,0.20), 0 1px 4px rgba(50,70,40,0.10)',
            letterSpacing: '0.015em',
          }}
        >
          Begin
        </button>
        <p className="text-stone-400 text-[11px] tracking-wide" style={{ opacity: 0.55 }}>
          No account needed · private by design
        </p>
      </div>

      <style>{`
        @keyframes onbGlow {
          0%, 100% { opacity: 0.75; transform: translate(-50%, -44%) scale(1);    }
          50%       { opacity: 1;    transform: translate(-50%, -44%) scale(1.07); }
        }
        @keyframes seedBreathe {
          0%, 100% { transform: scaleY(1)     scaleX(1);     }
          50%       { transform: scaleY(1.024) scaleX(0.982); }
        }
        @keyframes seedFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-4px); }
        }
        @keyframes leafSway {
          0%, 100% { transform: rotate(0deg);   }
          40%       { transform: rotate(-6deg);  }
          70%       { transform: rotate(3deg);   }
        }
        @keyframes dustRise1 {
          0%   { transform: translate(0px, 0px)   scale(1);   opacity: 0;    }
          15%  { opacity: 0.45; }
          85%  { opacity: 0.15; }
          100% { transform: translate(-12px, -44px) scale(0.4); opacity: 0; }
        }
        @keyframes dustRise2 {
          0%   { transform: translate(0px, 0px)   scale(1);   opacity: 0;    }
          15%  { opacity: 0.35; }
          85%  { opacity: 0.1;  }
          100% { transform: translate(10px, -38px) scale(0.3); opacity: 0; }
        }
        @keyframes dustRise3 {
          0%   { transform: translate(0px, 0px)   scale(1);   opacity: 0;    }
          20%  { opacity: 0.3;  }
          100% { transform: translate(5px, -52px)  scale(0.2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Subtle floating dust particles
// ---------------------------------------------------------------------------

function Particles() {
  const particles = [
    { x: '38%', y: '52%', size: 3,   dur: '7s',   delay: '0s',   anim: 'dustRise1' },
    { x: '55%', y: '55%', size: 2.5, dur: '9s',   delay: '2.5s', anim: 'dustRise2' },
    { x: '45%', y: '58%', size: 2,   dur: '11s',  delay: '1.2s', anim: 'dustRise3' },
    { x: '60%', y: '50%', size: 2,   dur: '8s',   delay: '4s',   anim: 'dustRise1' },
    { x: '34%', y: '60%', size: 1.5, dur: '10s',  delay: '3s',   anim: 'dustRise2' },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top:  p.y,
            width:  p.size,
            height: p.size,
            background: 'rgba(140,190,110,0.55)',
            animation: `${p.anim} ${p.dur} ease-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Luma — dormant seed with one small first leaf
// ---------------------------------------------------------------------------

function LumaDormant() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 118, height: 154 }}
    >
      <svg
        viewBox="0 0 60 80"
        width={118}
        height={154}
        style={{ animation: 'seedFloat 5.5s ease-in-out infinite', overflow: 'visible' }}
        overflow="visible"
      >
        <defs>
          <radialGradient id="sd_body" cx="36%" cy="28%" r="72%">
            <stop offset="0%"   stopColor="#ddecd0" />
            <stop offset="55%"  stopColor="#bbcfaa" />
            <stop offset="100%" stopColor="#9cb890" />
          </radialGradient>
          <radialGradient id="sd_leg" cx="50%" cy="25%" r="70%">
            <stop offset="0%"   stopColor="#f2e2c8" />
            <stop offset="100%" stopColor="#dac8a8" />
          </radialGradient>
          <radialGradient id="sd_leaf" cx="30%" cy="20%" r="75%">
            <stop offset="0%"   stopColor="#cce0b8" />
            <stop offset="100%" stopColor="#90b878" />
          </radialGradient>
          <filter id="sd_soft" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.45" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="sd_blur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="30" cy="74" rx="9.5" ry="1.6" fill="#9cb890" opacity="0.10" />

        {/* Body group — breathing */}
        <g style={{ animation: 'seedBreathe 5s ease-in-out infinite', transformOrigin: '30px 57px' }}>

          {/* Blurred shadow behind body */}
          <ellipse cx="31" cy="58" rx="14" ry="16" fill="#9cb890" opacity="0.14" filter="url(#sd_blur)" />

          {/* Main body */}
          <path
            d="M30 36 C19 36 16 47 16 57 C16 67 22 72 30 72 C38 72 44 67 44 57 C44 47 41 36 30 36 Z"
            fill="url(#sd_body)"
            filter="url(#sd_soft)"
          />

          {/* Body highlight */}
          <ellipse cx="26" cy="46" rx="6" ry="7.5" fill="white" opacity="0.10" />
          <ellipse cx="24" cy="44" rx="2.8" ry="3.5" fill="white" opacity="0.07" />

          {/* Tiny stem from crown */}
          <line x1="30" y1="36" x2="30" y2="28" stroke="#7aaa60" strokeWidth="1.4" strokeLinecap="round" />

          {/* First small leaf — swaying */}
          <g style={{ animation: 'leafSway 4.8s ease-in-out 0.3s infinite', transformOrigin: '30px 30px' }}>
            <path
              d="M30 30 Q22 26 24 20 Q30 24 30 30"
              fill="url(#sd_leaf)"
              opacity="0.92"
            />
          </g>

          {/* Leaf vein — delicate */}
          <path
            d="M30 29 Q26 25 24.5 20.5"
            stroke="#7aaa60"
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Closed sleepy eyes */}
          <g opacity="0.52">
            <path d="M23.2 55.5 Q25.0 54.0 26.8 55.5" stroke="#3a5228" strokeWidth="1.05" fill="none" strokeLinecap="round" />
            <path d="M33.2 55.5 Q35.0 54.0 36.8 55.5" stroke="#3a5228" strokeWidth="1.05" fill="none" strokeLinecap="round" />
          </g>

          {/* Peaceful tiny mouth */}
          <path d="M27.8 60.2 Q30 61.4 32.2 60.2" stroke="#3a5228" strokeWidth="0.75" fill="none" strokeLinecap="round" opacity="0.28" />

          {/* Legs */}
          <ellipse cx="24" cy="71" rx="5" ry="3.4" fill="url(#sd_leg)" />
          <ellipse cx="36" cy="71" rx="5" ry="3.4" fill="url(#sd_leg)" />
          <ellipse cx="23" cy="69.8" rx="1.8" ry="1" fill="white" opacity="0.14" />
          <ellipse cx="35" cy="69.8" rx="1.8" ry="1" fill="white" opacity="0.14" />
        </g>
      </svg>
    </div>
  )
}
