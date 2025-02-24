import { useParams } from "react-router-dom";
import Divider from "./Divider";
import SkillList from "./SkillList";

const SkillView = () => {
    const { skill_id } = useParams();
    return (
        <div className="flex flex-grow w-auto max-w-4xl mx-auto items-center justify-center p-2 bg-slate-400/40 rounded-2xl shadow-xl">
            <div className="flex flex-col flex-grow p-6 max-w-4xl mx-auto bg-slate-800/80 text-slate-300 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-sky-200">Skills View</h1>
                <Divider />
                <div className="mb-4">
                    <SkillList
                        skill_id={skill_id}
                    />
                </div>
            </div>
        </div>
    )
};

export default SkillView;