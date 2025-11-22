import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FiCopy } from "react-icons/fi";


function Stats() {
    const { code } = useParams();
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${backendURL}/api/links/${code}`);
            setData(res.data);
        } catch (err) {
            setError(err.response?.data?.error || "Link not found");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-xl">Loading stats...</div>;
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-500 text-xl">
                {error}
                <br />
                <Link to="/" className="text-blue-600 underline">
                    Go back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow p-6 rounded">
            <h1 className="text-3xl font-bold mb-5">Stats for: {data.code}</h1>

            <p className="mb-3">
                <strong>Original URL:</strong>{" "}
                <a href={data.url} className="text-blue-600 underline" target="_blank">
                    {data.url}
                </a>
            </p>
            <p className="mb-3">
                <strong>Short URL:</strong>
                <a
                    href={`${backendURL}/${data.code}`}
                    target="_blank"
                    className="text-blue-600 underline ml-2"
                >
                    {backendURL}/{data.code}
                </a>


            </p>
            <p className="mb-3 flex items-center gap-2">
                <strong>Copy URL:</strong>
                 <button
                    className="bg-white text-blue-600 px-4 py-2  rounded mb-0 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                        navigator.clipboard.writeText(
                            `${backendURL}/${data.code}`
                        )
                        alert("Copied to clipboard!");
                    }
                    }
                >
                    <FiCopy size={18} />
                </button>
            </p>

            <p className="mb-3">
                <strong>Total Clicks:</strong> {data.clicks}
            </p>

            <p className="mb-3">
                <strong>Created At:</strong>{" "}
                {new Date(data.created_at).toLocaleString()}
            </p>

            <p className="mb-3">
                <strong>Last Clicked:</strong>{" "}
                {data.last_clicked ? new Date(data.last_clicked).toLocaleString() : "Never"}
            </p>


            <div>
                <Link to="/">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Back to Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Stats;
