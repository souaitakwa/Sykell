
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import type { UrlData } from "../types";


export default function Details() {
  const { id } = useParams();
  const [url, setUrl] = useState<UrlData | null>(null);
  useEffect(() => { api.get(`/urls/${id}`).then(res => setUrl(res.data)); }, [id]);
  if (!url) return <div>Loading...</div>;
  const data = [{ name: "Internal", value: url.internalLinks }, { name: "External", value: url.externalLinks }];

  return <div>
    <h1>Details for {url.URL}</h1>
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" outerRadius={100}>
        {data.map((_, i) => <Cell key={i} />)}
      </Pie>
      <Tooltip />
    </PieChart>
    <h2>Broken Links</h2>
    <ul>{url.brokenLinkDetails.map(b => <li key={b.id}>{b.link} - {b.statusCode}</li>)}</ul>
  </div>;
}
