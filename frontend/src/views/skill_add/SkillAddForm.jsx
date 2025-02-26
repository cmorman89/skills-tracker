import { useState } from "react";
import SkillParentManager from "../../form_components/skill_form/SkillParentManager";
import Divider from "../../form_components/style/Divider";
import SkillNameInput from "../../form_components/skill_form/SkillNameInput";
import SkillDescriptionInput from "../../form_components/skill_form/SkillDescriptionInput";
import axios from "axios";
import SkillMastery from "../../form_components/skill_form/SkillMasteryInput";

const SkillAddForm = () => {
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        parents: [],
        mastery: 1,
    });
    const [parentKey, setParentKey] = useState(0);

    const handleNameOnChange = (value) => {
        setFormData({ ...formData, name: value });
    }

    const handleDescriptionOnChange = (value) => {
        setFormData({ ...formData, description: value });
    }

    const handleParentOnChange = (value) => {
        setFormData({ ...formData, parents: value });
    }

    const handleMasteryOnChange = (value) => {
        setFormData({ ...formData, mastery: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/v1/skills/", formData)
            const data = response.data;
            if (data.error) {
                setMsgType("error");
                setMsg(data.error);
            } else {
                setMsgType("success");
                setMsg("Action completed successfully");
            }
        } catch (error) {
            console.error("Error submitting skill: ", error);
        }

        // Reset form data
        setFormData({
            name: "",
            description: "",
            parents: [],
            mastery: 1,
        });
        setParentKey(parentKey => parentKey + 1);

    }

    return (
        // Build card structure for the form
        <div className="flex flex-grow w-auto max-w-4xl mx-auto items-center justify-center p-2 bg-slate-400/40 rounded-2xl shadow-xl inset-shadow-lg inset-shadow-white">
            <div className="flex flex-col flex-grow p-6 max-w-4xl mx-auto bg-slate-800/80 text-slate-300 inset-shadow-lg inset-shadow-white rounded-lg">
                {/* Message */}
                {msg && (
                    <div
                        className={`text-sm p-2 mb-4 rounded-md ${msgType === "error" ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"
                            }`}
                    >
                        {msg}
                    </div>
                )}
                {/* Form Heading */}
                <h1 className="text-2xl font-bold text-sky-200">Create a New Skill</h1>
                <Divider />

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Skill Name */}
                    <SkillNameInput
                        onChange={handleNameOnChange}
                        value={formData.name}
                    />

                    {/* Skill Description */}
                    <SkillDescriptionInput
                        onChange={handleDescriptionOnChange}
                        value={formData.description}
                    />

                    <Divider />

                    {/* Skill Parent Manager */}
                    <SkillParentManager
                        key={parentKey}
                        onChange={handleParentOnChange}
                        parents={formData.parents}
                    />

                    <Divider />

                    {/*Skill Mastery */}
                    <SkillMastery
                        onChange={handleMasteryOnChange}
                        value={formData.mastery}
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