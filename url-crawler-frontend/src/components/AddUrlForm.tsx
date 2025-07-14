import { useState } from 'react'
import { createUrl } from '../Api/urlsApi'

export default function AddUrlForm({ refetch }: { refetch: () => void }) {
    const [url, setUrl] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!url.trim()) return;
        try {
            await createUrl({ url })
            setUrl('')
            refetch()
        } catch (err) {
            console.error("Failed to add URL:", err)
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 16 }} className="flex gap-2 items-center">
            <input
                type="text"
                placeholder="Website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded cursor-pointer transition"
            >
                Add URL
            </button>
        </form>
    )
}
