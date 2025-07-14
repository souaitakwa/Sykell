import { rerunUrls, deleteUrls } from '../Api/urlsApi'

export default function BulkActions({
                                        selectedIds,
                                        refetch
                                    }: {
    selectedIds: number[]
    refetch: () => void
}) {
    const handleRerun = async () => {
        await rerunUrls(selectedIds)
        alert('Re-run triggered for selected URLs.')
        refetch()
    }

    const handleDelete = async () => {
        if (window.confirm(`Delete ${selectedIds.length} selected URLs?`)) {
            await deleteUrls(selectedIds)
            alert('Deleted successfully.')
            refetch()
        }
    }

    return (
        <div style={{ marginBottom: 12 }}>
            <button onClick={handleRerun} disabled={selectedIds.length === 0}>
                Re-run Analysis
            </button>
            <button onClick={handleDelete} disabled={selectedIds.length === 0} style={{ marginLeft: 8 }}>
                Delete Selected
            </button>
        </div>
    )
}

