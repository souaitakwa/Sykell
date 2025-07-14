import { Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import DetailPage from './pages/DetailPage'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/details/:id" element={<DetailPage />} />
        </Routes>
    )
}
