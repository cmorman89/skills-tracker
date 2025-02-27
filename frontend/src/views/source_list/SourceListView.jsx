import { useEffect, useState } from "react";
import Divider from "../../form_components/style/Divider";
import axios from "axios";

const SourceListView = () => {
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSources = async () => {
            try {
                // Fetch all sources
                const response = await axios.get("http://127.0.0.1:5000/api/v1/sources/extended");
                // Filter out the root source
                const data = response.data;
                // Update the state
                setSources(data);
                setLoading(false);
                console.log(data);
            } catch (error) {
                console.error("Error fetching sources: ", error);
            }
        }

        fetchSources();
    }, []);

    return (
        // Build card structure for the view
        <div className="flex flex-grow w-auto max-w-4xl mx-auto items-center justify-center p-2 bg-slate-400/40 rounded-2xl shadow-xl inset-shadow-lg inset-shadow-white">
            <div className="flex flex-col flex-grow p-6 max-w-4xl mx-auto bg-slate-800/80 text-slate-300 inset-shadow-lg inset-shadow-white rounded-lg">

                {/* Title */}
                <h1 className="text-2xl font-bold text-sky-200">Sources Table</h1>

                <Divider />

                {/* Table */}
                <div className="">
                    <table className="w-full table-auto">
                        <thead className="table-header-group">
                            <tr className="bg-slate-600/30 table-row text-slate-400 border-b-2 border-teal-500/50">
                                <th className="font-normal text-md italic py-2 px-1">ID</th>
                                <th className="font-normal text-md italic py-2 px-1 ">Source</th>
                                <th className="font-normal text-md italic py-2 px-1 ">Description</th>
                                <th className="font-normal text-md italic py-2 px-1 ">Type</th>
                                <th className="font-normal text-md italic py-2 px-1 ">Examples</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center">Loading...</td>
                                </tr>
                            ) : (
                                sources.map((source) => (
                                    <tr key={source.id} className="table-row border-b-1 border-slate-600">
                                        <td className="py-2 px-1 text-center table-cell">{source.id}</td>
                                        <td className="py-2 px-1 text-center table-cell">{source.name}</td>
                                        <td className="py-2 px-1 text-center table-cell">{source.description}</td>
                                        <td className="py-2 px-1 text-center table-cell">{source.type.name}</td>
                                        <td className="py-2 px-1 text-center table-cell"></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SourceListView;