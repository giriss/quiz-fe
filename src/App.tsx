import type { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginRegister, Dashboard } from '@/pages'

const App: FC = () => (
  <Routes>
    <Route path="/" element={<LoginRegister />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
)

export default App
