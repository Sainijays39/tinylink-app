import { useEffect, useState } from "react";
import axios from "axios";
import AddLinkForm from '/TinyLink/frontend/src/Components/AddLinkForm.jsx';
import LinkTable from "/TinyLink/frontend/src/Components/LinkTable.jsx";

function Home() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const fetchLinks = async () => {
        setLoading(true);
        const res = await axios.get(`${backendURL}/api/links/stats`);
        setLinks(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">TinyLink Dashboard</h1>

            <AddLinkForm onCreated={fetchLinks} />
            {loading ? (
                <div className="text-center text-gray-500 mt-4">Loading links...</div>
            ) : (
                <LinkTable links={links} refresh={fetchLinks} />
            )}   
        </div>
    );
}

export default Home;
