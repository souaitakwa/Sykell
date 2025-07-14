import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import type { UrlData } from "../types/UrlData";
import React from "react";

interface Props {
    data: UrlData[];
    search: string;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function DashboardTable({
                                           data,
                                           search,
                                           selectedIds,
                                           setSelectedIds,
                                       }: Props) {
    const navigate = useNavigate();

    const safeData = Array.isArray(data) ? data : [];

    const filtered = safeData.filter((item) =>
        (item.title || "").toLowerCase().includes(search.toLowerCase())
    );

    const toggleSelect = (id: number) => {
        setSelectedIds((ids) =>
            ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
        );
    };

    const allSelected =
        filtered.length > 0 && filtered.every((item) => selectedIds.includes(item.id));

    return (
        <div className="overflow-x-auto mt-6 rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                    <th className="p-3">
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={() => {
                                if (allSelected) {
                                    setSelectedIds([]);
                                } else {
                                    setSelectedIds(filtered.map((item) => item.id));
                                }
                            }}
                        />
                    </th>
                    <th className="p-3 text-left font-semibold text-gray-900">Title</th>
                    <th className="p-3 text-left font-semibold text-gray-900">URL</th>
                    <th className="p-3 text-left font-semibold text-gray-900">HTML Version</th>
                    <th className="p-3 text-left font-semibold text-gray-900"># Internal</th>
                    <th className="p-3 text-left font-semibold text-gray-900"># External</th>
                    <th className="p-3 text-left font-semibold text-gray-900"># Broken</th>
                    <th className="p-3 text-left font-semibold text-gray-900">Login</th>
                    <th className="p-3 text-left font-semibold text-gray-900">Status</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                {filtered.map((item) => (
                    <tr
                        key={item.id}
                        className={`hover:bg-gray-50 transition cursor-pointer ${
                            selectedIds.includes(item.id) ? "bg-gray-50" : ""
                        }`}
                        onClick={() => navigate(`/details/${item.id}`)}
                    >
                        <td className="p-3" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => toggleSelect(item.id)}
                            />
                        </td>
                        <td className="p-3 text-gray-900">{item.title}</td>
                        <td className="p-3 text-gray-900">{item.url}</td>
                        <td className="p-3 text-gray-900">{item.htmlVersion}</td>
                        <td className="p-3 text-gray-900">{item.internalLinks}</td>
                        <td className="p-3 text-gray-900">{item.externalLinks}</td>
                        <td className="p-3 text-gray-900">{item.brokenLinks}</td>
                        <td className="p-3 text-gray-900">{item.loginForm ? "Yes" : "No"}</td>
                        <td className="p-3">
                            <StatusBadge status={item.status} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {filtered.length === 0 && (
                <p className="p-4 text-gray-500">No URLs match your search.</p>
            )}
        </div>
    );
}
