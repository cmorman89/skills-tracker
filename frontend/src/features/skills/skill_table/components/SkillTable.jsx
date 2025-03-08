import PropTypes from "prop-types";
import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillActionButton from "./SkillActionButton";
import SkillNode from "../../skill_tree/components/SkillNode";

const SkillTable = ({ createMessage }) => {
    const [skillList, setSkillList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);

    const navigate = useNavigate();
    const deleteSkill = async (id, name) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/api/v1/skills/${id}`);
            const responseData = response.data;
            if (response.status === 200) {
                createMessage(`Removed skill ${name} from skill list.`, "success");
                setUpdate(!update);
            } else {
                createMessage(responseData.error, "error");
                console.error(responseData.error);
            }
        } catch (error) {
            createMessage(error.message, "error");
            console.error(error.message);
        }
    }

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/v1/skills/");
                const responseData = response.data;
                console.log(responseData);
                if (response.status === 200) {
                    setSkillList(responseData.filter((item) => item.id !== 1));
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
        console.log("Fetching skills");
    }, [update]);

    return (
        <div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Skill Name</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-center">Parents</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <tr><td colSpan={4}>Loading...</td></tr> :
                        skillList.map((item, i) => (
                            <tr key={i} className="border-t border-pink-600 bg-transparent hover:bg-pink-400/50 ease-in-out duration-300 my-12 py-12">
                                <td className="px-4 py-6 flex"><SkillNode text={item.name.toUpperCase()} /></td>
                                <td className="px-4 py-6">{item.description}</td>
                                <td className="px-4 py-6 text-center">
                                    <ul className="list-disc list-inside">
                                    {item.parents.map((parent, i) => (
                                        <li key={i}>{parent.name} </li>))}
                                    </ul>
                                </td>
                                <td className="px-4 py-6 text-right list">
                                    <div className="flex justify-end gap-4 text-2xl">
                                        <SkillActionButton
                                            icon={faPencil}
                                            onClick={() => { navigate(`/skills/${item.id}/edit`) }}
                                        />
                                        <SkillActionButton
                                            icon={faXmark}
                                            onClick={() => deleteSkill(item.id, item.name)}
                                        />

                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table >
        </div >
    )
}

SkillTable.propTypes = {
    createMessage: PropTypes.func.isRequired,
}

export default SkillTable;