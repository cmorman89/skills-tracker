import { useEffect, useState } from "react";
import Divider from "../../form_components/style/Divider";
import axios from "axios";

const SkillListView = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                // Fetch all skills
                const response = await axios.get("http://127.0.0.1:5000/api/v1/skills/");
                // Filter out the root skill
                const data = response.data.filter((skill) => skill.id !== 1);
                // Update the state
                setSkills(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching skills: ", error);
            }
        }

        fetchSkills();
    }, []);

    return (
        // Build card structure for the view
        <div className="flex flex-grow w-auto max-w-4xl mx-auto items-center justify-center p-2 bg-slate-400/40 rounded-2xl shadow-xl inset-shadow-lg inset-shadow-white">
            <div className="flex flex-col flex-grow p-6 max-w-4xl mx-auto bg-slate-800/80 text-slate-300 inset-shadow-lg inset-shadow-white rounded-lg">

                {/* Title */}
                <h1 className="text-2xl font-bold text-sky-200">Skill Table</h1>

                <Divider />

                {/* Table */}
                <div className="">
                    <table className="w-full table-auto">
                        <thead className="table-header-group">
                            <tr className="bg-slate-600/30 table-row text-slate-400 border-b-2 border-teal-500/50">
                                <th className="font-normal text-md italic py-2 px-1">ID</th>
                                <th className="font-normal text-md italic py-2 px-1 ">Skill</th>
                                <th className="font-normal text-md italic py-2 px-1 ">Description</th>
                                <th className="font-normal text-md italic py-2 px-1 ">Mastery</th>
                                <th className="font-normal text-md italic py-2 px-1 ">Parents</th>
                                <th className="font-normal text-md italic py-2 px-1 ">Children</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center">Loading...</td>
                                </tr>
                            ) : (
                                skills.map((skill) => (
                                    <tr key={skill.id} className="table-row border-b-1 border-slate-600">
                                        <td className="py-2 px-1 text-center table-cell">{skill.id}</td>
                                        <td className="py-2 px-1 text-center table-cell">{skill.name}</td>
                                        <td className="py-2 px-1 text-center table-cell">{skill.description}</td>
                                        <td className="py-2 px-1 text-center table-cell">{skill.mastery}</td>
                                        <td className="py-2 px-1 text-center table-cell">{skill.parents.map((parent) => parent.name).join(", ")}</td>
                                        <td className="py-2 px-1 text-center table-cell">{skill.children.map((child) => child.name).join(", ")}</td>
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

export default SkillListView;