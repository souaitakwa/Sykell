interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    let bgColor = "bg-gray-400";
    if (status === "queued") bgColor = "bg-yellow-400";
    else if (status === "running") bgColor = "bg-blue-400";
    else if (status === "done") bgColor = "bg-green-500";
    else if (status === "error") bgColor = "bg-red-500";

    return (
        <span
            className={`${bgColor} text-white text-xs font-semibold px-3 py-1 rounded-full inline-block`}
        >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
    );
}
