import { useState } from "react";
import useUrlData from "../hooks/useUrlData";
import AddUrlForm from "../components/AddUrlForm";
import DashboardTable from "../components/DashboardTable";
import { FiRefreshCw, FiTrash2 } from "react-icons/fi";
import {rerunUrls,  deleteUrl} from "../Api/urlsApi";

export default function DashboardPage() {
    const { urls, refetch } = useUrlData();
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Bulk re-run selected URLs
    const handleRerun = async () => {
        if (selectedIds.length === 0) return;
        try {
            await rerunUrls(selectedIds);
            await refetch();
            setSelectedIds([]);
        } catch (err) {
            console.error("Failed to rerun URLs", err);
        }
    };

    // Bulk delete selected URLs
    const handleDelete = async () => {
        if (selectedIds.length === 0) return;
        try {
            await Promise.all(selectedIds.map(id => deleteUrl(id)));
            setSelectedIds([]);
            await refetch();
        } catch (err) {
            console.error("Failed to delete URLs", err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-3 border-gray-200">
                🌐 URL Crawl Dashboard
            </h1>

            <AddUrlForm refetch={refetch} />

            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <input
                        type="text"
                        placeholder="🔍 Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-80 focus:ring-2 focus:ring-blue-500 transition"
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={handleRerun}
                            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 transition disabled:opacity-50"
                            disabled={selectedIds.length === 0}
                        >
                            <FiRefreshCw /> Re-run Analysis
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-700 transition disabled:opacity-50"
                            disabled={selectedIds.length === 0}
                        >
                            <FiTrash2 /> Delete Selected
                        </button>
                    </div>
                </div>
            </div>

            <DashboardTable
                data={urls}
                search={search}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
            />
        </div>
    );
}
