import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CheckIn from './pages/CheckIn'
import Confirmation from './pages/Confirmation'
import History from './pages/History'
import WeeklySummary from './pages/WeeklySummary'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="check-in" element={<CheckIn />} />
        <Route path="done" element={<Confirmation />} />
        <Route path="history" element={<History />} />
        <Route path="weekly" element={<WeeklySummary />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
