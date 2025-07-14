import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUrlDetail } from '../Api/urlsApi'
import type {UrlData} from '../types/UrlData'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

export default function DetailPage() {
    const { id } = useParams()
    const [data, setData] = useState<UrlData | null>(null)

    useEffect(() => {
        if (id) {
            getUrlDetail(id).then(setData)
        }
    }, [id])

    if (!data) return <p>Loading...</p>

    const chartData = [
        { name: 'Internal', value: data.internalLinks },
        { name: 'External', value: data.externalLinks }
    ]
    const COLORS = ['#2a9d8f', '#0a74da']

    return (
        <div style={{ padding: 20 }}>
            <h2>Details for {data.title}</h2>
            <PieChart width={400} height={400}>
                <Pie data={chartData} dataKey="value" outerRadius={150}>
                    {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            <h3>Broken Links: {data.brokenLinks}</h3>
        </div>
    )
}
