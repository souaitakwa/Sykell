export default function SearchBar({ value, onChange }: { value: string, onChange: (s: string) => void }) {
    return (
        <input
            type="text"
            placeholder="Search by title..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ marginBottom: 16, padding: 8, width: '100%', maxWidth: 400 }}
        />
    )
}
