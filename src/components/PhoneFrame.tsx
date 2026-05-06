import { ReactNode } from 'react'

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Desktop — phone mockup */}
      <div className="hidden md:flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-200 via-sand-100 to-stone-300">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle, #a8a29e 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 flex items-center gap-10">
          {/* Device */}
          <div className="relative w-[393px] h-[852px] bg-sand-50 rounded-[52px] shadow-2xl overflow-hidden flex flex-col"
            style={{ boxShadow: '0 0 0 10px #1c1917, 0 40px 80px rgba(0,0,0,0.35), 0 0 0 11px #3d3732' }}>

            {/* Status bar */}
            <div className="shrink-0 flex items-center justify-between px-8 pt-4 pb-1 bg-sand-50 relative z-10">
              <span className="text-[13px] font-semibold text-stone-800">9:41</span>
              {/* Dynamic island */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[120px] h-[34px] bg-stone-900 rounded-full" />
              <div className="flex items-center gap-1.5 text-stone-800">
                {/* Signal */}
                <svg className="w-4 h-3" viewBox="0 0 17 12" fill="currentColor">
                  <rect x="0" y="8" width="3" height="4" rx="1" opacity="1"/>
                  <rect x="4.5" y="5" width="3" height="7" rx="1" opacity="1"/>
                  <rect x="9" y="2.5" width="3" height="9.5" rx="1" opacity="1"/>
                  <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.3"/>
                </svg>
                {/* Battery */}
                <svg className="w-6 h-3" viewBox="0 0 25 12" fill="none">
                  <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35"/>
                  <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor"/>
                  <path d="M23 4v4a2 2 0 000-4z" fill="currentColor" fillOpacity="0.4"/>
                </svg>
              </div>
            </div>

            {/* Scrollable app content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {children}
            </div>

            {/* Home indicator */}
            <div className="shrink-0 bg-sand-50 flex justify-center pb-2 pt-1">
              <div className="w-32 h-1 bg-stone-800 rounded-full opacity-20" />
            </div>
          </div>

          {/* Side volume buttons */}
          <div className="absolute"
            style={{ left: 'calc(50% - 217px)', top: '50%', transform: 'translateY(-40%)' }}>
            <div className="flex flex-col gap-2.5">
              <div className="w-[3px] h-8 bg-stone-700 rounded-l-full" style={{ marginLeft: '-3px', marginTop: '60px' }} />
              <div className="w-[3px] h-12 bg-stone-700 rounded-l-full" style={{ marginLeft: '-3px' }} />
              <div className="w-[3px] h-12 bg-stone-700 rounded-l-full" style={{ marginLeft: '-3px' }} />
            </div>
          </div>
          {/* Power button */}
          <div className="absolute"
            style={{ right: 'calc(50% - 217px)', top: '50%', transform: 'translateY(-60%)' }}>
            <div className="w-[3px] h-16 bg-stone-700 rounded-r-full" style={{ marginRight: '-3px', marginTop: '40px' }} />
          </div>
        </div>
      </div>

      {/* Mobile — full screen, no frame */}
      <div className="md:hidden">
        {children}
      </div>
    </>
  )
}
