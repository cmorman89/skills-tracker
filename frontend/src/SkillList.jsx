import PropTypes from "prop-types";
import SkillTree from "./SkillTree";
import TextInput from "./TextInput";
import { useEffect, useState } from "react";
import axios from "axios";

const SkillList = ({ skill_id }) => {
    const [skillList, setSkillList] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = async (id) => {
        try {
            if (!id) {
                console.error("No ID provided to delete skill");
                return;
            }

            // Send delete request to backend
            await axios.delete(`http://127.0.0.1:5000/api/v1/skills/${id}`);

            // Update state by removing the deleted skill
            setSkillList((prev) => {
                if (!prev || !prev.children) return prev; // Ensure prev state exists

                // Recursively remove the skill from children
                const removeSkill = (node) => {
                    if (!node || !node.children) return node;

                    return {
                        ...node,
                        children: node.children
                            .filter((child) => child.root.id !== id)
                            .map(removeSkill),
                    };
                };

                return removeSkill(prev);
            });

        } catch (error) {
            console.error("Error deleting skill: ", error);
        }
    };



    useEffect(() => {
        const fetchAllChildren = async () => {
            if (!skill_id) {
                return;
            }
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/v1/skills/${skill_id}/all_children`);
                const data = await response.data;
                setSkillList(data);
            } catch (error) {
                console.error("Error fetching skills: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllChildren();
    }, [skill_id]);

    return (
        <>
            <div className="mb-2">
                <TextInput
                    label="Search"
                    placeholder="Search..."
                />
            </div>
            <SkillTree
                handleDelete={handleDelete}
                skillList={loading ? [`Loading for skill ID# ${skill_id}...`] : skillList}
            />
        </>
    );
}

SkillList.propTypes = {
    skill_id: PropTypes.number.isRequired,
}


export default SkillList;