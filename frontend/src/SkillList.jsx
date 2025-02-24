import PropTypes from "prop-types";
import SkillTree from "./SkillTree";
import TextInput from "./TextInput";
import { useEffect, useState } from "react";
import axios from "axios";

const SkillList = ({ skill_id }) => {
    const [skillList, setSkillList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllChildren = async () => {
            if (!skill_id) {
                return;
            }
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/v1/skills/${skill_id}/all_children`);
                const data = await response.data;
                setSkillList(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching skills: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllChildren();
    }, []);

    return (
        <>
            <div className="mb-2">
                <TextInput
                    label="Search"
                    placeholder="Search..."
                />
            </div>
            <SkillTree
                skillList={loading ? [`Loading for skill ID# ${skill_id}...`] : skillList}
            />
        </>
    );
}

SkillList.propTypes = {
    skill_id: PropTypes.number.isRequired,
}


export default SkillList;