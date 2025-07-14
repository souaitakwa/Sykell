
import { useNavigate } from "react-router-dom";
import type {UrlData} from "../types";

interface Props {
  data: UrlData[];
  onBulkReRun: (ids: number[]) => void;
  onBulkDelete: (ids: number[]) => void;
}
import  { useState } from "react";

export default function DataTable({ data, onBulkReRun, onBulkDelete }: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleSelect = (id: number) => {
    setSelected(selected.includes(id) ? selected.filter(i => i !== id) : [...selected, id]);
  };

  return (
    <div>
      <button onClick={() => onBulkReRun(selected)}>Re-run</button>
      <button onClick={() => onBulkDelete(selected)}>Delete</button>
      <table>
        <thead>
          <tr><th></th><th>Title</th><th>HTML</th><th>Internal</th><th>External</th><th>Status</th></tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td><input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleSelect(row.id)} /></td>
              <td onClick={() => navigate(`/details/${row.id}`)}>{row.title}</td>
              <td>{row.htmlVersion}</td>
              <td>{row.internalLinks}</td>
              <td>{row.externalLinks}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
