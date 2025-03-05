import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

const SkillTable = () => {
    const [skillList, setSkillList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/v1/skills/");
                const responseData = response.data;
                console.log(responseData);
                if (response.status === 200) {
                    setSkillList(responseData);
                } else {
                    console.error(responseData.error);
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchSkills();

    }, []);

    const range = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Skill Name</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <tr><td colSpan={4}>Loading...</td></tr> :
                        skillList.map((item, i) => (
                            <tr key={i} className="border-t border-pink-600 bg-transparent hover:bg-pink-400/50 ease-in-out duration-300 my-12 py-12">
                                <td className="px-4 py-6">{i}. {item.name.toUpperCase()}</td>
                                <td className="px-4 py-6">{item.description}</td>
                                <td className="px-4 py-6 text-right">
                                    <div className="flex justify-end gap-4 text-2xl">
                                        <FontAwesomeIcon className="text-pink-900 hover:text-pink-700 ease-in-out duration-300" icon={faPencil} />
                                        <FontAwesomeIcon className="text-pink-900 hover:text-pink-700 ease-in-out duration-300" icon={faXmark} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table >
        </div >
    )
}

export default SkillTable;