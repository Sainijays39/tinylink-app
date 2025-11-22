import { useState } from "react";
import axios from "axios";

function AddLinkForm({ onCreated }) {
    const [url, setUrl] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await axios.post(`${backendURL}/api/links`, { url, ...(code.trim() !== "" && { code }) });
            setUrl("");
            setCode("");
            onCreated(); // refresh list
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg p-6 rounded-xl border mb-6"
        >
            <h2 className="text-xl font-bold mb-3">Create Short Link</h2>

            <input
                type="text"
                placeholder="Enter long URL"
                className="border p-2 w-full rounded mb-3 focus:ring focus:border-blue-500"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Custom code (optional)"
                className="border p-2 w-full rounded mb-3 focus:ring focus:border-blue-500"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create"}
            </button>
        </form>
    );
}

export default AddLinkForm;
