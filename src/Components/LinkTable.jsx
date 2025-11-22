import axios from "axios";
import { Link } from "react-router-dom";
import { FiCopy } from "react-icons/fi";

function LinkTable({ links, refresh }) {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const copyLink = (code) => {
    const shortURL = `${backendURL}/${code}`;
    navigator.clipboard.writeText(shortURL);
    alert("Copied to clipboard!");
  };

  const deleteLink = async (code) => {
    await axios.delete(`${backendURL}/api/links/${code}`);
    refresh();
  };

  return (
    <div className="w-full">
      
  
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-gray-50 border-b">
            <tr className="border-b bg-gray-100">
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">URL</th>
              <th className="p-3 text-left">Short URL</th>
              <th className="p-3 text-left">Clicks</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {links.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No links found. Create your first short link!
                </td>
              </tr>
            ) : (
              links.map((link) => (
                <tr key={link.code} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-bold">{link.code}</td>
                  <td className="p-3 truncate max-w-xs">{link.url}</td>

                  <td className="p-3">
                    <a
                      href={`${backendURL}/${link.code}`}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {backendURL}/{link.code}
                    </a>
                  </td>

                  <td className="p-3">{link.clicks}</td>

                  <td className="p-3 flex gap-2">
                    <button
                      className="bg-white text-blue-600 px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => copyLink(link.code)}
                    >
                      <FiCopy size={18} />
                    </button>

                    <Link to={`/code/${link.code}`}>
                      <button className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
                        Stats
                      </button>
                    </Link>

                    <button
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                      onClick={() => deleteLink(link.code)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

   
      <div className="md:hidden space-y-4">
        {links.length === 0 ? (
          <div className="text-center p-6 bg-white shadow rounded-lg text-gray-600">
            No links found. Create your first short link!
          </div>
        ) : (
          links.map((link) => (
            <div
              key={link.code}
              className="bg-white shadow rounded-lg p-4 space-y-2"
            >
              <p className="font-bold text-lg">Code: {link.code}</p>

              <p className="text-gray-700">
                <span className="font-semibold">URL:</span>
                <br />
                <span className="break-all text-blue-600">{link.url}</span>
              </p>

              <p>
                <span className="font-semibold">Short URL:</span>
                <br />
                <a
                  href={`${backendURL}/${link.code}`}
                  target="_blank"
                  className="text-blue-600 underline break-all"
                >
                  {backendURL}/{link.code}
                </a>
              </p>

              <p className="font-semibold">Clicks: {link.clicks}</p>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  className="flex items-center gap-2 bg-gray-200 text-blue-700 px-3 py-2 rounded shadow"
                  onClick={() => copyLink(link.code)}
                >
                  <FiCopy size={18} />
                </button>

                <Link to={`/code/${link.code}`} className="flex-1">
                  <button className="w-full bg-green-600 text-white px-3 py-2 rounded shadow">
                    Stats
                  </button>
                </Link>

                <button
                  className="w-full bg-red-600 text-white px-3 py-2 rounded shadow"
                  onClick={() => deleteLink(link.code)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LinkTable;
