import { useState } from "react";
import SkillParentManager from "./SkillParentManager";
import Divider from "./Divider";
import SkillNameInput from "./SkillNameInput";
import SkillDescriptionInput from "./SkillDescriptionInput";
import axios from "axios";

const SkillAddForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        parents: [],
    });

    const handleNameOnChange = (value) => {
        setFormData({ ...formData, name: value });
    }

    const handleDescriptionOnChange = (value) => {
        setFormData({ ...formData, description: value });
    }

    const handleParentOnChange = (value) => {
        setFormData({ ...formData, parents: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/v1/skills/", formData)
            console.log("Form data: ", formData);
            console.log("Response: ", response);
        } catch (error) {
            console.error("Error submitting skill: ", error);
        }
    }

    return (
        // Build card structure for the form
        <div className="flex flex-grow w-auto max-w-4xl mx-auto items-center justify-center p-2 bg-slate-400/40 rounded-2xl shadow-xl inset-shadow-lg inset-shadow-white">
            <div className="flex flex-col flex-grow p-6 max-w-4xl mx-auto bg-slate-800/80 text-slate-300 inset-shadow-lg inset-shadow-white rounded-lg">
                {/* Form Heading */}
                <h1 className="text-2xl font-bold text-sky-200">Create a New Skill</h1>
                <Divider />

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Skill Name */}
                    <SkillNameInput
                        value={formData.name}
                        parentOnChange={handleNameOnChange}
                    />

                    {/* Skill Description */}
                    <SkillDescriptionInput
                        value={formData.description}
                        parentOnChange={handleDescriptionOnChange}
                    />

                    <Divider />

                    {/* Skill Parent Manager */}
                    <SkillParentManager
                        onChange={handleParentOnChange}
                        parents={formData.parents}
                    />

                    <Divider />

                    {/* Submit Button */}
                    <div className="pt-4 mb-4 flex flex-col flex-grow">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-teal-500/20 text-white rounded-md shadow-lg hover:bg-teal-500/30 focus:outline-none"
                        >
                            Save Skill
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SkillAddForm;