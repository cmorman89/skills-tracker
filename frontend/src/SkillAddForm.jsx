import { useState } from "react";
import SkillParentManager from "./SkillParentManager";

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
            console.log("Form data: ", formData);
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
                <button type="submit" className="btn btn-primary p-2 rounded shadow bg-slate-400 text-slate-700 font-bold">Submit</button>
            </form>
        </div>
    );
};

export default SkillAddForm;