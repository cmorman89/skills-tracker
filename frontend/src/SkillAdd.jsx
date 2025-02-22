import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SkillNameInput from "./SkillNameInput";
import SkillDescriptionInput from "./SkillDescriptionInput";
import SkillParents from "./SkillParents";
import Divider from "./Divider";

const SkillAdd = () => {
    const { skill_id } = useParams();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/v1/skills/");
                setSkills(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching skills: ", error);
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    return (
        <div className="flex flex-grow w-auto max-w-4xl mx-auto items-center justify-center p-2 bg-slate-400/40 rounded-2xl shadow-xl">
         <div className="flex flex-col flex-grow p-6 max-w-4xl mx-auto bg-slate-800/80 text-slate-300 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-sky-200">Create a New Skill</h1>
            <Divider />
            <form>
                <SkillNameInput />
                <SkillDescriptionInput />
                <Divider />
                <SkillParents
                    skill_id={skill_id}
                />
                <Divider />
                <div className="mb-4 flex flex-col flex-grow">
                    <label
                        htmlFor="examples"
                        className="block text-sm font-medium text-slate-300"
                    >
                        Examples
                    </label>
                    <div className="flex items-center justify-center">
                        <select
                            className="mt-1 mr-2 block w-fit p-2 border border-slate-600 bg-slate-900/40 rounded-md shadow-sm"
                            name="exampleSource"
                        >
                            <option value="None">No Source</option>
                        </select>
                        <input
                            type="text"
                            className="mt-1 mr-2 block flex-grow p-2 border border-slate-600 bg-slate-900/40 rounded-md shadow-sm"
                            placeholder="More info (optional)"
                        />

                        <button
                            type="button"
                            className="block mt-1 px-4 py-2 bg-slate-700  text-white rounded-md shadow hover:bg-slate-500 focus:outline-none"
                        >
                            +
                        </button>
                    </div>
                    <button
                        type="button"
                        className="block mt-2 px-4 py-2 bg-slate-700 text-white rounded-md shadow hover:bg-slate-500 focus:outline-none justify-self-right"
                    >
                        Add another source [+]
                    </button>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="mastery"
                        className="block text-sm font-medium text-slate-300"
                    >
                        Mastery Level
                    </label>
                    <div className="flex mt-1 mx-1 justify-between text-slate-500">
                        <small>Beginner</small>
                        <small>Expert</small>
                    </div>
                    <input
                        type="range"
                        id="masery"
                        min="1"
                        max="5"
                        step="1"
                        className="mt-1 block w-full accent-sky-800 bg-transparent border border-yellow-400 shadow-lg curs"
                    >
                    </input>
                    <div className="flex mt-1 mx-1 justify-between text-slate-500">
                        <small>1</small>
                        <small>2</small>
                        <small>3</small>
                        <small>4</small>
                        <small>5</small>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                        Adjust the slider from 1-5
                    </p>
                </div>
                <div className="pt-4 mb-4 flex flex-col flex-grow">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-teal-500/20 text-white rounded-md shadow hover:bg-teal-500/30 focus:outline-none"
                    >
                        Save Skill
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default SkillAdd;
