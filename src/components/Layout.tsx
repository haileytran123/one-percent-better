import { Outlet, NavLink } from 'react-router-dom'

export default function Layout() {
  const link = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-1 text-[11px] font-medium tracking-wide transition-all duration-200 ${
      isActive ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'
    }`

  return (
    <div className="flex flex-col h-full min-h-dvh max-w-md mx-auto">
      <main className="flex-1">
        <Outlet />
      </main>

      <nav className="sticky bottom-0 bg-sand-50/90 backdrop-blur-md border-t border-sand-200/60 safe-bottom z-50">
        <div className="flex justify-around py-3 px-6">
          <NavLink to="/" end className={link}>
            <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Today
          </NavLink>

          <NavLink to="/history" className={link}>
            <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            History
          </NavLink>

          <NavLink to="/weekly" className={link}>
            <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>
            Insights
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
