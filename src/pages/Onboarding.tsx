import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  onComplete: () => void
}

const TOTAL_SLIDES = 3

export default function Onboarding({ onComplete }: Props) {
  const [slide, setSlide] = useState(1)
  const navigate = useNavigate()

  function advance() {
    if (slide < TOTAL_SLIDES) {
      setSlide(slide + 1)
    } else {
      finish()
    }
  }

  function finish() {
    localStorage.setItem('1pb_onboarded', '1')
    onComplete()
    navigate('/', { replace: true })
  }

  return (
    <div
      className="relative flex flex-col min-h-dvh px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #faf7f2 0%, #f5f0e8 55%, #ede8df 100%)' }}
    >
      {slide === 1 && <Slide1 onNext={advance} />}
      {slide === 2 && <Slide2 onNext={advance} />}
      {slide === 3 && <Slide3 onNext={finish} />}

      <style>{`
        /* ── Shared keyframes ── */
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
          0%, 100% { transform: rotate(0deg);  }
          40%       { transform: rotate(-6deg); }
          70%       { transform: rotate(3deg);  }
        }
        @keyframes lumaBlink {
          0%, 88%, 100% { transform: scaleY(1);    }
          91%            { transform: scaleY(0.07); }
        }

        /* ── Slide 1 particles ── */
        @keyframes dustRise1 {
          0%   { transform: translate(0px, 0px)     scale(1);   opacity: 0;    }
          15%  { opacity: 0.45; }
          85%  { opacity: 0.15; }
          100% { transform: translate(-12px, -44px) scale(0.4); opacity: 0;    }
        }
        @keyframes dustRise2 {
          0%   { transform: translate(0px, 0px)    scale(1);   opacity: 0;    }
          15%  { opacity: 0.35; }
          85%  { opacity: 0.1;  }
          100% { transform: translate(10px, -38px) scale(0.3); opacity: 0;    }
        }
        @keyframes dustRise3 {
          0%   { transform: translate(0px, 0px)   scale(1);   opacity: 0;    }
          20%  { opacity: 0.3;  }
          100% { transform: translate(5px, -52px) scale(0.2); opacity: 0;    }
        }

        /* ── Slide 2 word drift ── */
        @keyframes wordDrift1 {
          0%   { transform: translate(0px, 0px)    rotate(-2deg); opacity: 0;    }
          10%  { opacity: 1; }
          90%  { opacity: 0.75; }
          100% { transform: translate(-6px, -22px) rotate(-4deg); opacity: 0;   }
        }
        @keyframes wordDrift2 {
          0%   { transform: translate(0px, 0px)   rotate(1.5deg); opacity: 0;    }
          12%  { opacity: 1; }
          88%  { opacity: 0.65; }
          100% { transform: translate(8px, -18px) rotate(3deg);   opacity: 0;   }
        }
        @keyframes wordDrift3 {
          0%   { transform: translate(0px, 0px)    rotate(-1deg); opacity: 0;    }
          14%  { opacity: 1; }
          86%  { opacity: 0.6; }
          100% { transform: translate(-4px, -28px) rotate(-2deg); opacity: 0;   }
        }
        @keyframes wordDrift4 {
          0%   { transform: translate(0px, 0px)  rotate(2.5deg); opacity: 0;    }
          10%  { opacity: 1; }
          90%  { opacity: 0.55; }
          100% { transform: translate(6px, -16px) rotate(1deg);  opacity: 0;   }
        }
        @keyframes wordDrift5 {
          0%   { transform: translate(0px, 0px)    rotate(-2.5deg); opacity: 0;  }
          16%  { opacity: 1; }
          84%  { opacity: 0.5; }
          100% { transform: translate(-7px, -24px) rotate(-4deg);   opacity: 0; }
        }
        /* ── Slide 2 eye glance ── */
        @keyframes lumaGlance {
          0%, 60%, 100% { transform: translateX(0px);   }
          68%            { transform: translateX(-1.2px); }
          80%            { transform: translateX(1px);   }
          88%            { transform: translateX(0px);   }
        }

        /* ── Slide 3 growth sequence ── */
        @keyframes s3FadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes s3BodyIn {
          0%   { transform: translateY(8px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0px) scale(1);   opacity: 1; }
        }
        @keyframes s3StemDraw {
          0%   { stroke-dashoffset: 52; opacity: 0; }
          6%   { opacity: 1; }
          100% { stroke-dashoffset: 0;  opacity: 1; }
        }
        @keyframes s3IdleStemSway {
          0%, 100% { transform: rotate(0deg);   }
          35%      { transform: rotate(1.4deg); }
          70%      { transform: rotate(-0.9deg);}
        }
        @keyframes s3LeafL {
          0%   { transform: scale(0) rotate(22deg);  opacity: 0;    }
          65%  { opacity: 0.9; }
          100% { transform: scale(1) rotate(0deg);   opacity: 0.92; }
        }
        @keyframes s3LeafR {
          0%   { transform: scale(0) rotate(-22deg); opacity: 0;    }
          65%  { opacity: 0.9; }
          100% { transform: scale(1) rotate(0deg);   opacity: 0.92; }
        }
        @keyframes s3DustFly {
          0%   { transform: translate(0px, 0px) rotate(0deg) scale(1);   opacity: 0;   }
          15%  { opacity: 0.55; }
          80%  { opacity: 0.25; }
          100% { transform: translate(var(--dx), var(--dy)) rotate(var(--dr)) scale(0.4); opacity: 0; }
        }
        @keyframes s3FlowerIn {
          0%   { transform: scale(0) rotate(-15deg); opacity: 0;    }
          60%  { opacity: 1; }
          100% { transform: scale(1) rotate(0deg);   opacity: 1;    }
        }
        @keyframes s3EyesOpen {
          0%   { transform: scaleY(0.08); opacity: 0.3; }
          100% { transform: scaleY(1);    opacity: 1;   }
        }
        @keyframes s3GlowExpand {
          0%   { opacity: 0;   transform: translate(-50%,-50%) scale(0.6); }
          100% { opacity: 1;   transform: translate(-50%,-50%) scale(1);   }
        }
        @keyframes s3GlowPulse {
          0%, 100% { opacity: 0.9;  transform: translate(-50%,-50%) scale(1);    }
          50%      { opacity: 1;    transform: translate(-50%,-50%) scale(1.06); }
        }
        @keyframes s3IdleFloat {
          0%, 100% { transform: translateY(0px);  }
          50%      { transform: translateY(-4px);  }
        }
        @keyframes s3IdleBreathe {
          0%, 100% { transform: scaleY(1)     scaleX(1);     }
          50%      { transform: scaleY(1.022) scaleX(0.983); }
        }
        @keyframes s3IdleLeafL {
          0%, 100% { transform: rotate(0deg);   }
          45%      { transform: rotate(-4deg);  }
          75%      { transform: rotate(1.5deg); }
        }
        @keyframes s3IdleLeafR {
          0%, 100% { transform: rotate(0deg);  }
          45%      { transform: rotate(4deg);  }
          75%      { transform: rotate(-1.5deg);}
        }
        @keyframes s3IdleFlower {
          0%, 100% { transform: translateY(0px) rotate(0deg);   }
          50%      { transform: translateY(-1px) rotate(2deg);   }
        }
        @keyframes s3PetalIn {
          0%   { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Progress dots — shared
// ---------------------------------------------------------------------------

function ProgressDots({ current }: { current: number }) {
  return (
    <div className="flex justify-center gap-2 pt-14 relative z-10">
      {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
        <span
          key={i}
          className="rounded-full transition-all duration-500"
          style={{
            width:   i + 1 === current ? 20 : 6,
            height:  6,
            background: i + 1 === current ? 'rgba(80,100,70,0.7)' : 'rgba(160,150,140,0.35)',
          }}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shared button + caption
// ---------------------------------------------------------------------------

function PrimaryButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-[320px] py-[17px] font-medium text-[15px] transition-all duration-200 active:scale-[0.97]"
      style={{
        background:    'linear-gradient(145deg, #435f3a 0%, #364f2e 100%)',
        color:         '#eeeae3',
        borderRadius:  '18px',
        boxShadow:     '0 6px 24px rgba(50,70,40,0.20), 0 1px 4px rgba(50,70,40,0.10)',
        letterSpacing: '0.015em',
      }}
    >
      {label}
    </button>
  )
}

// ---------------------------------------------------------------------------
// SLIDE 1 — dormant, sleepy, just beginning
// ---------------------------------------------------------------------------

function Slide1({ onNext }: { onNext: () => void }) {
  return (
    <>
      <DustParticles />
      <ProgressDots current={1} />

      <div className="flex-1 flex flex-col items-center justify-center gap-10 relative z-10">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute pointer-events-none"
            style={{
              width: 200, height: 200,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -44%)',
              background: 'radial-gradient(ellipse at 50% 55%, rgba(148,200,118,0.22) 0%, rgba(180,220,150,0.10) 40%, transparent 70%)',
              animation: 'onbGlow 4.8s ease-in-out infinite',
            }}
          />
          <LumaDormant />
        </div>

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

      <div className="relative z-10 pb-12 flex flex-col items-center gap-3.5">
        <PrimaryButton label="Begin" onClick={onNext} />
        <p className="text-stone-400 text-[11px] tracking-wide" style={{ opacity: 0.55 }}>
          No account needed · private by design
        </p>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// SLIDE 2 — eyes open, curious, word fragments drifting
// ---------------------------------------------------------------------------

function Slide2({ onNext }: { onNext: () => void }) {
  return (
    <>
      <ProgressDots current={2} />

      <div className="flex-1 flex flex-col items-center justify-center gap-10 relative z-10">
        <div className="relative flex items-center justify-center" style={{ width: 260, height: 240 }}>
          {/* Glow — tight, emitted from body */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 140, height: 140,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -40%)',
              background: 'radial-gradient(ellipse at 50% 58%, rgba(148,200,118,0.26) 0%, rgba(160,210,130,0.10) 45%, transparent 68%)',
              animation: 'onbGlow 4.8s ease-in-out infinite',
            }}
          />

          {/* Floating word fragments */}
          <WordFragments />

          {/* Luma — centered */}
          <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -38%)' }}>
            <LumaAwake />
          </div>
        </div>

        <div className="flex flex-col gap-3 text-center max-w-[272px]">
          <h1
            className="font-display text-[28px] font-semibold text-stone-800 leading-[1.22]"
            style={{ letterSpacing: '-0.015em' }}
          >
            Your patterns are already shaping you.
          </h1>
          <p className="text-stone-400 text-[15px] leading-relaxed">
            What drains you. What lifts you. What keeps repeating.
          </p>
          <p className="text-stone-400 text-[13px] leading-relaxed mt-1" style={{ opacity: 0.65 }}>
            Most people never pause long enough to notice.
          </p>
        </div>
      </div>

      <div className="relative z-10 pb-12 flex flex-col items-center gap-3.5">
        <PrimaryButton label="Continue" onClick={onNext} />
        <div style={{ height: 20 }} />
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// SLIDE 3 — full bloom growth sequence
// ---------------------------------------------------------------------------

// Timing design:
// 0–1.4s   Luma rises in, eyes open, glow appears — user sees her alive
// 1.4–2.0s Brief pause (Luma breathes)
// 2.0–4.4s Stem draws root-to-tip (2.4s total, 44 SVG units)
// Leaves fire when stem tip passes their attachment point:
//   leaf1 attaches at y=47 → 9/44 of stem = +0.49s → 2.5s
//   leaf2 attaches at y=34 → 22/44 of stem = +1.2s  → 3.2s
//   leaf3 attaches at y=22 → 34/44 of stem = +1.85s → 3.85s
//   flower tip at y=12     → 44/44 of stem = +2.4s  → 4.4s
// Copy appears 0.3s after flower, button 0.5s after that
const S3 = {
  body:   { in: '0s',    dur: '1.4s' },
  eyes:   { in: '0.6s',  dur: '0.8s' },
  glow:   { in: '0.4s',  dur: '2.0s' },
  stem:   { in: '2.0s',  dur: '2.4s' },
  leaf1L: { in: '2.5s',  dur: '1.0s' },
  leaf1R: { in: '2.85s', dur: '1.0s' },
  leaf2L: { in: '3.2s',  dur: '1.0s' },
  leaf2R: { in: '3.55s', dur: '1.0s' },
  leaf3L: { in: '3.85s', dur: '1.0s' },
  leaf3R: { in: '4.2s',  dur: '1.0s' },
  flower: { in: '4.4s',  dur: '1.2s' },
  dust:   { in: '3.2s'              },
  copy:   { in: '5.0s',  dur: '1.2s' },
  btn:    { in: '5.5s',  dur: '1.0s' },
  idle:   '6.0s',
}

function anim(name: string, dur: string, delay: string, extra = '') {
  return `${name} ${dur} ease-out ${delay} both${extra ? ', ' + extra : ''}`
}

function Slide3({ onNext }: { onNext: () => void }) {
  const stemH = 44 // total stem height — body crown at y=56, tip at y=12

  return (
    <>
      <ProgressDots current={3} />

      <div className="flex-1 flex flex-col items-center justify-center gap-8 relative z-10">
        <div className="relative flex items-center justify-center" style={{ width: 220, height: 260 }}>

          {/* Glow — expands as Luma blooms */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 200, height: 200,
              top: '58%', left: '50%',
              background: 'radial-gradient(ellipse at 50% 55%, rgba(148,200,118,0.28) 0%, rgba(160,210,130,0.10) 45%, transparent 68%)',
              animation: anim('s3GlowExpand', S3.glow.dur, S3.glow.in,
                `s3GlowPulse 5s ease-in-out ${S3.idle} infinite`),
            }}
          />

          {/* Full bloom SVG — elements animate in sequentially */}
          <svg
            viewBox="0 0 60 100"
            width={130}
            height={220}
            style={{
              position: 'relative',
              animation: `s3IdleFloat 5.5s ease-in-out ${S3.idle} infinite`,
              overflow: 'visible',
            }}
            overflow="visible"
          >
            <defs>
              <radialGradient id="s3_body" cx="36%" cy="28%" r="72%">
                <stop offset="0%"   stopColor="#ddecd0" />
                <stop offset="55%"  stopColor="#bbcfaa" />
                <stop offset="100%" stopColor="#9cb890" />
              </radialGradient>
              <radialGradient id="s3_leg" cx="50%" cy="25%" r="70%">
                <stop offset="0%"   stopColor="#f2e2c8" />
                <stop offset="100%" stopColor="#dac8a8" />
              </radialGradient>
              <radialGradient id="s3_leaf" cx="25%" cy="18%" r="78%">
                <stop offset="0%"   stopColor="#cce0b8" />
                <stop offset="100%" stopColor="#82b460" />
              </radialGradient>
              <radialGradient id="s3_petal" cx="50%" cy="30%" r="70%">
                <stop offset="0%"   stopColor="#fce8e5" />
                <stop offset="100%" stopColor="#f4ccc8" />
              </radialGradient>
              <filter id="s3_soft" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.4" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <filter id="s3_blur"><feGaussianBlur stdDeviation="1.4" /></filter>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="30" cy="96" rx="10" ry="1.8" fill="#9cb890" opacity="0.10" />

            {/* ── STEM — drawn root-to-tip via dashoffset, then sways ── */}
            <g style={{
              animation: `s3IdleStemSway 5s ease-in-out ${S3.idle} infinite`,
              transformOrigin: '30px 56px',
            }}>
              <path
                d="M30 56 Q29.5 34 30 12"
                stroke="#7aaa60"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="52"
                strokeDashoffset="52"
                style={{
                  animation: `s3StemDraw ${S3.stem.dur} cubic-bezier(0.25,0.8,0.25,1) ${S3.stem.in} both`,
                }}
              />
            </g>

            {/* ── DRIFTING LEAF PARTICLES — appear mid-growth ── */}
            {[
              { x: 46, y: 50, dr: '15deg',  dx: '14px', dy: '-22px', dur: '7s',  delay: S3.dust.in },
              { x: 14, y: 40, dr: '-12deg', dx: '-10px', dy: '-18px', dur: '9s',  delay: '4.8s' },
              { x: 50, y: 32, dr: '20deg',  dx: '12px', dy: '-14px', dur: '11s', delay: '6.0s' },
            ].map((p, i) => (
              <g
                key={i}
                style={{
                  '--dx': p.dx, '--dy': p.dy, '--dr': p.dr,
                  animation: `s3DustFly ${p.dur} ease-out ${p.delay} infinite`,
                } as React.CSSProperties}
              >
                <path
                  d={`M${p.x} ${p.y} Q${p.x - 4} ${p.y - 3} ${p.x - 2} ${p.y - 6} Q${p.x + 2} ${p.y - 3} ${p.x} ${p.y}`}
                  fill="#90b870"
                  opacity="0.5"
                />
              </g>
            ))}

            {/* ── LEAF PAIR 1 — fires when stem tip passes y=47 ── */}
            <g style={{ opacity: 0, animation: anim('s3LeafL', S3.leaf1L.dur, S3.leaf1L.in,
              `s3IdleLeafL 4.5s ease-in-out ${S3.idle} infinite`),
              transformOrigin: '27px 47px' }}>
              <path d="M29 48 Q18 44 20 36 Q27 41 29 48" fill="url(#s3_leaf)" />
            </g>
            <g style={{ opacity: 0, animation: anim('s3LeafR', S3.leaf1R.dur, S3.leaf1R.in,
              `s3IdleLeafR 4.5s ease-in-out ${S3.idle} infinite`),
              transformOrigin: '33px 47px' }}>
              <path d="M31 48 Q42 44 40 36 Q33 41 31 48" fill="url(#s3_leaf)" />
            </g>

            {/* ── LEAF PAIR 2 — fires when stem tip passes y=34 ── */}
            <g style={{ opacity: 0, animation: anim('s3LeafL', S3.leaf2L.dur, S3.leaf2L.in,
              `s3IdleLeafL 5s ease-in-out 0.2s ${S3.idle} infinite`),
              transformOrigin: '26px 34px' }}>
              <path d="M29 35 Q16 30 18.5 21 Q26 27 29 35" fill="url(#s3_leaf)" opacity="0.93" />
            </g>
            <g style={{ opacity: 0, animation: anim('s3LeafR', S3.leaf2R.dur, S3.leaf2R.in,
              `s3IdleLeafR 5s ease-in-out 0.2s ${S3.idle} infinite`),
              transformOrigin: '34px 34px' }}>
              <path d="M31 35 Q44 30 41.5 21 Q34 27 31 35" fill="url(#s3_leaf)" opacity="0.93" />
            </g>

            {/* ── LEAF PAIR 3 — fires when stem tip passes y=22 ── */}
            <g style={{ opacity: 0, animation: anim('s3LeafL', S3.leaf3L.dur, S3.leaf3L.in,
              `s3IdleLeafL 5.5s ease-in-out 0.4s ${S3.idle} infinite`),
              transformOrigin: '25px 22px' }}>
              <path d="M29.5 23 Q14 19 17 11 Q26 16 29.5 23" fill="url(#s3_leaf)" opacity="0.88" />
            </g>
            <g style={{ opacity: 0, animation: anim('s3LeafR', S3.leaf3R.dur, S3.leaf3R.in,
              `s3IdleLeafR 5.5s ease-in-out 0.4s ${S3.idle} infinite`),
              transformOrigin: '35px 22px' }}>
              <path d="M30.5 23 Q46 19 43 11 Q34 16 30.5 23" fill="url(#s3_leaf)" opacity="0.88" />
            </g>

            {/* ── FLOWER — fires when stem reaches tip ── */}
            <g
              style={{
                opacity: 0,
                animation: anim('s3FlowerIn', S3.flower.dur, S3.flower.in,
                  `s3IdleFlower 3.5s ease-in-out ${S3.idle} infinite`),
                transformOrigin: '30px 12px',
              }}
            >
              {[0, 72, 144, 216, 288].map((deg) => (
                <ellipse
                  key={deg}
                  cx={30 + Math.cos(((deg - 90) * Math.PI) / 180) * 4.5}
                  cy={12 + Math.sin(((deg - 90) * Math.PI) / 180) * 4.5}
                  rx="2.4" ry="1.7"
                  fill="url(#s3_petal)"
                  transform={`rotate(${deg}, ${30 + Math.cos(((deg - 90) * Math.PI) / 180) * 4.5}, ${12 + Math.sin(((deg - 90) * Math.PI) / 180) * 4.5})`}
                  opacity="0.9"
                />
              ))}
              <circle cx="30" cy="12" r="2.4" fill="#f0aa88" />
              <circle cx="29.3" cy="11.4" r="0.65" fill="white" opacity="0.38" />
            </g>

            {/* ── BODY — rises in, then breathes ── */}
            <g
              style={{
                animation: anim('s3BodyIn', S3.body.dur, S3.body.in,
                  `s3IdleBreathe 5s ease-in-out ${S3.idle} infinite`),
                transformOrigin: '30px 70px',
              }}
            >
              <ellipse cx="31" cy="71" rx="14" ry="15" fill="#9cb890" opacity="0.13" filter="url(#s3_blur)" />
              <path
                d="M30 56 C20 56 17 65 17 73 C17 82 23 88 30 88 C37 88 43 82 43 73 C43 65 40 56 30 56 Z"
                fill="url(#s3_body)"
                filter="url(#s3_soft)"
              />
              <ellipse cx="26" cy="64" rx="5.5" ry="7" fill="white" opacity="0.10" />
              <ellipse cx="24.5" cy="62" rx="2.6" ry="3.2" fill="white" opacity="0.07" />

              {/* Eyes — open after body appears */}
              <g style={{
                animation: anim('s3EyesOpen', S3.eyes.dur, S3.eyes.in),
                transformOrigin: '30px 72px',
              }}>
                <ellipse cx="25.2" cy="72" rx="1.9" ry="1.65" fill="#3a5228" opacity="0.78" />
                <ellipse cx="34.8" cy="72" rx="1.9" ry="1.65" fill="#3a5228" opacity="0.78" />
                <circle cx="26.0" cy="71.2" r="0.55" fill="white" opacity="0.65" />
                <circle cx="35.6" cy="71.2" r="0.55" fill="white" opacity="0.65" />
              </g>

              {/* Smile — fades in with eyes */}
              <path
                d="M27.5 77 Q30 78.5 32.5 77"
                stroke="#3a5228" strokeWidth="0.85" fill="none" strokeLinecap="round"
                style={{ animation: anim('s3FadeIn', '0.8s', S3.eyes.in) }}
                opacity="0.40"
              />

              {/* Legs */}
              <ellipse cx="24" cy="87" rx="5" ry="3.4" fill="url(#s3_leg)" />
              <ellipse cx="36" cy="87" rx="5" ry="3.4" fill="url(#s3_leg)" />
              <ellipse cx="23" cy="85.8" rx="1.8" ry="1" fill="white" opacity="0.13" />
              <ellipse cx="35" cy="85.8" rx="1.8" ry="1" fill="white" opacity="0.13" />
            </g>
          </svg>
        </div>

        {/* Copy */}
        <div
          className="flex flex-col gap-3 text-center max-w-[272px]"
          style={{ animation: anim('s3FadeIn', S3.copy.dur, S3.copy.in) }}
        >
          <h1
            className="font-display text-[28px] font-semibold text-stone-800 leading-[1.22]"
            style={{ letterSpacing: '-0.015em' }}
          >
            As you grow, Luma grows too.
          </h1>
          <p className="text-stone-400 text-[15px] leading-relaxed">
            Each reflection helps you understand yourself more clearly.
          </p>
        </div>
      </div>

      {/* Button */}
      <div
        className="relative z-10 pb-12 flex flex-col items-center gap-3.5"
        style={{ animation: anim('s3FadeIn', S3.btn.dur, S3.btn.in) }}
      >
        <PrimaryButton label="Continue" onClick={onNext} />
        <div style={{ height: 20 }} />
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// Word fragments — drift around Luma on slide 2
// ---------------------------------------------------------------------------

// Each word has: position (x/y from center), font size, opacity, rotation, drift animation + timing
const WORDS = [
  { text: 'work',      x: -112, y: -18,  size: 11,   opacity: 0.30, rot:  -2, dur: '12s',  delay: '0s',   anim: 'wordDrift2' },
  { text: 'sleep',     x:   68, y: -58,  size: 10.5, opacity: 0.23, rot:   1, dur: '14s',  delay: '1.6s', anim: 'wordDrift1' },
  { text: 'friends',   x:  -82, y:  48,  size: 12,   opacity: 0.22, rot:  -1, dur: '15.5s',delay: '0.4s', anim: 'wordDrift3' },
  { text: 'stress',    x:   86, y:  14,  size: 10,   opacity: 0.18, rot: 2.5, dur: '13s',  delay: '3.0s', anim: 'wordDrift4' },
  { text: 'rest',      x:  -52, y: -76,  size: 10,   opacity: 0.17, rot:  -3, dur: '16s',  delay: '2.2s', anim: 'wordDrift5' },
  { text: 'gratitude', x:   46, y:  70,  size: 10.5, opacity: 0.21, rot: 1.5, dur: '17s',  delay: '4.8s', anim: 'wordDrift1' },
  { text: 'gym',       x:   94, y: -42,  size:  9.5, opacity: 0.15, rot:   2, dur: '18s',  delay: '6s',   anim: 'wordDrift3' },
]

function WordFragments() {
  return (
    <div className="absolute pointer-events-none" style={{ top: '50%', left: '50%' }}>
      {WORDS.map((w, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left:          w.x,
            top:           w.y,
            fontFamily:    "'Inter', sans-serif",
            fontSize:      w.size,
            fontWeight:    450,
            letterSpacing: '0.055em',
            color:         '#4e6840',
            opacity:       w.opacity,
            transform:     `rotate(${w.rot}deg)`,
            animation:     `${w.anim} ${w.dur} ease-in-out ${w.delay} infinite`,
            whiteSpace:    'nowrap',
          }}
        >
          {w.text}
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Luma — dormant (slide 1): closed eyes, sleepy
// ---------------------------------------------------------------------------

function LumaDormant() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 118, height: 154 }}>
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
          <filter id="sd_blur"><feGaussianBlur stdDeviation="1.5" /></filter>
        </defs>

        <ellipse cx="30" cy="74" rx="9.5" ry="1.6" fill="#9cb890" opacity="0.10" />

        <g style={{ animation: 'seedBreathe 5s ease-in-out infinite', transformOrigin: '30px 57px' }}>
          <ellipse cx="31" cy="58" rx="14" ry="16" fill="#9cb890" opacity="0.14" filter="url(#sd_blur)" />
          <path d="M30 36 C19 36 16 47 16 57 C16 67 22 72 30 72 C38 72 44 67 44 57 C44 47 41 36 30 36 Z" fill="url(#sd_body)" filter="url(#sd_soft)" />
          <ellipse cx="26" cy="46" rx="6" ry="7.5" fill="white" opacity="0.10" />
          <ellipse cx="24" cy="44" rx="2.8" ry="3.5" fill="white" opacity="0.07" />

          <line x1="30" y1="36" x2="30" y2="28" stroke="#7aaa60" strokeWidth="1.4" strokeLinecap="round" />
          <g style={{ animation: 'leafSway 4.8s ease-in-out 0.3s infinite', transformOrigin: '30px 30px' }}>
            <path d="M30 30 Q22 26 24 20 Q30 24 30 30" fill="url(#sd_leaf)" opacity="0.92" />
          </g>
          <path d="M30 29 Q26 25 24.5 20.5" stroke="#7aaa60" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.4" />

          {/* Closed sleepy eyes */}
          <g opacity="0.52">
            <path d="M23.2 55.5 Q25.0 54.0 26.8 55.5" stroke="#3a5228" strokeWidth="1.05" fill="none" strokeLinecap="round" />
            <path d="M33.2 55.5 Q35.0 54.0 36.8 55.5" stroke="#3a5228" strokeWidth="1.05" fill="none" strokeLinecap="round" />
          </g>
          <path d="M27.8 60.2 Q30 61.4 32.2 60.2" stroke="#3a5228" strokeWidth="0.75" fill="none" strokeLinecap="round" opacity="0.28" />

          <ellipse cx="24" cy="71" rx="5" ry="3.4" fill="url(#sd_leg)" />
          <ellipse cx="36" cy="71" rx="5" ry="3.4" fill="url(#sd_leg)" />
          <ellipse cx="23" cy="69.8" rx="1.8" ry="1" fill="white" opacity="0.14" />
          <ellipse cx="35" cy="69.8" rx="1.8" ry="1" fill="white" opacity="0.14" />
        </g>
      </svg>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Luma — awake (slides 2+): eyes open, gentle blink, curious
// ---------------------------------------------------------------------------

function LumaAwake() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 118, height: 154 }}>
      <svg
        viewBox="0 0 60 80"
        width={118}
        height={154}
        style={{ animation: 'seedFloat 5.5s ease-in-out infinite', overflow: 'visible' }}
        overflow="visible"
      >
        <defs>
          <radialGradient id="sa_body" cx="36%" cy="28%" r="72%">
            <stop offset="0%"   stopColor="#ddecd0" />
            <stop offset="55%"  stopColor="#bbcfaa" />
            <stop offset="100%" stopColor="#9cb890" />
          </radialGradient>
          <radialGradient id="sa_leg" cx="50%" cy="25%" r="70%">
            <stop offset="0%"   stopColor="#f2e2c8" />
            <stop offset="100%" stopColor="#dac8a8" />
          </radialGradient>
          <radialGradient id="sa_leaf" cx="30%" cy="20%" r="75%">
            <stop offset="0%"   stopColor="#cce0b8" />
            <stop offset="100%" stopColor="#90b878" />
          </radialGradient>
          <filter id="sa_soft" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.45" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="sa_blur"><feGaussianBlur stdDeviation="1.5" /></filter>
        </defs>

        <ellipse cx="30" cy="74" rx="9.5" ry="1.6" fill="#9cb890" opacity="0.10" />

        <g style={{ animation: 'seedBreathe 5s ease-in-out infinite', transformOrigin: '30px 57px' }}>
          <ellipse cx="31" cy="58" rx="14" ry="16" fill="#9cb890" opacity="0.14" filter="url(#sa_blur)" />
          <path d="M30 36 C19 36 16 47 16 57 C16 67 22 72 30 72 C38 72 44 67 44 57 C44 47 41 36 30 36 Z" fill="url(#sa_body)" filter="url(#sa_soft)" />
          <ellipse cx="26" cy="46" rx="6" ry="7.5" fill="white" opacity="0.10" />
          <ellipse cx="24" cy="44" rx="2.8" ry="3.5" fill="white" opacity="0.07" />

          <line x1="30" y1="36" x2="30" y2="28" stroke="#7aaa60" strokeWidth="1.4" strokeLinecap="round" />
          <g style={{ animation: 'leafSway 4.8s ease-in-out 0.3s infinite', transformOrigin: '30px 30px' }}>
            <path d="M30 30 Q22 26 24 20 Q30 24 30 30" fill="url(#sa_leaf)" opacity="0.92" />
          </g>
          <path d="M30 29 Q26 25 24.5 20.5" stroke="#7aaa60" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.4" />

          {/* Open eyes — blink + slow glance */}
          <g style={{ animation: 'lumaGlance 9s ease-in-out 2s infinite' }}>
            <g style={{ animation: 'lumaBlink 6.5s ease-in-out infinite', transformOrigin: '30px 55px' }}>
              <ellipse cx="25.2" cy="55.5" rx="1.9" ry="1.6" fill="#3a5228" opacity="0.75" />
              <ellipse cx="34.8" cy="55.5" rx="1.9" ry="1.6" fill="#3a5228" opacity="0.75" />
              <circle cx="26.0" cy="54.8" r="0.55" fill="white" opacity="0.65" />
              <circle cx="35.6" cy="54.8" r="0.55" fill="white" opacity="0.65" />
            </g>
          </g>

          {/* Soft gentle smile */}
          <path d="M27.5 60.5 Q30 62.0 32.5 60.5" stroke="#3a5228" strokeWidth="0.85" fill="none" strokeLinecap="round" opacity="0.38" />

          <ellipse cx="24" cy="71" rx="5" ry="3.4" fill="url(#sa_leg)" />
          <ellipse cx="36" cy="71" rx="5" ry="3.4" fill="url(#sa_leg)" />
          <ellipse cx="23" cy="69.8" rx="1.8" ry="1" fill="white" opacity="0.14" />
          <ellipse cx="35" cy="69.8" rx="1.8" ry="1" fill="white" opacity="0.14" />
        </g>
      </svg>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Dust particles — slide 1 only
// ---------------------------------------------------------------------------

function DustParticles() {
  const particles = [
    { x: '38%', y: '52%', size: 3,   dur: '7s',  delay: '0s',   anim: 'dustRise1' },
    { x: '55%', y: '55%', size: 2.5, dur: '9s',  delay: '2.5s', anim: 'dustRise2' },
    { x: '45%', y: '58%', size: 2,   dur: '11s', delay: '1.2s', anim: 'dustRise3' },
    { x: '60%', y: '50%', size: 2,   dur: '8s',  delay: '4s',   anim: 'dustRise1' },
    { x: '34%', y: '60%', size: 1.5, dur: '10s', delay: '3s',   anim: 'dustRise2' },
  ]
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            background: 'rgba(140,190,110,0.55)',
            animation: `${p.anim} ${p.dur} ease-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}
