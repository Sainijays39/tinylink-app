import { useEffect, useState } from "react";
import axios from "axios";



function AllStats() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL;


  const fetchStats = async () => {
    setLoading(true);
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/links/stats`);
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);
if (loading) {
  return <div className="text-center mt-10 text-xl">Loading stats...</div>;
}

return (
  <div className="max-w-3xl mx-auto mt-10 px-3">
    <h1 className="text-2xl font-bold mb-6 text-center">
      All Short Link Stats
    </h1>

    {/* Desktop / Tablet View */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Short URL</th>
            <th className="p-3 text-left">Clicks</th>
            <th className="p-3 text-left">Created</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr 
              key={item.code} 
              className="border-b hover:bg-gray-50"
            >
              <td className="p-3 break-all">
                {backendURL}/{item.code}
              </td>

              <td className="p-3">{item.clicks}</td>

              <td className="p-3">
                {new Date(item.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile View */}
    <div className="md:hidden space-y-4">
      {data.map((item) => (
        <div
          key={item.code}
          className="bg-white shadow rounded-lg p-4 space-y-2"
        >
          <p className="text-sm">
            <span className="font-semibold">Short URL:</span>
            <br />
            <span className="text-blue-600 break-all">
              {backendURL}/{item.code}
            </span>
          </p>

          <p>
            <span className="font-semibold">Clicks:</span> {item.clicks}
          </p>

          <p>
            <span className="font-semibold">Created:</span>
            <br />
            {new Date(item.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>

  </div>
);
}

export default AllStats;