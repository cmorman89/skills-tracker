import { useState } from "react";
import SkillParentManager from "./SkillParentManager";
import axios from "axios";

const SkillAddForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        parents: [],
    });

    const handleParentOnChange = (value) => {
        setFormData({ ...formData, parents: value });
        console.log("PARENT: SkillParents value: ", value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/v1/skills/", formData)
        } catch (error) {
            console.error("Error submitting skill: ", error);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <SkillParentManager
                    onChange={handleParentOnChange}
                    parents={formData.parents}
                />
            </form>
        </div>
    );
};

export default SkillAddForm;