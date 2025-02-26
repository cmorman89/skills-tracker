import PropTypes from "prop-types";
import TextWithIcon from "../../form_components/buttons/TextWithIcon";
import { faCircleXmark, faCode, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SkillTree = ({ skillList, handleDelete }) => {
    if (!skillList) return null;

    const root_node = skillList?.root || { name: "Unknown" };
    const child_nodes = skillList?.children || [];

    return (
        <div className="flex flex-col">
            {/* Root Node */}
            <div className="flex">
                <TextWithIcon
                    icon={faCode}
                    text={`${root_node.name} (ID: ${root_node.id})`}
                />
            </div>

            {/* For Each Child Node */}
            {child_nodes.map((skill, index) => (
                <div key={index} className="flex pl-6">
                    {/* Connecting Lines */}
                    <div className="flex flex-col min-h-1">
                        {/* Line Connecting Child Node to Parent Node */}
                        <div className="block border-2 round border-slate-400 border-t-0 border-r-0 w-6 h-7"></div>
                        {index !== child_nodes.length - 1 ? (
                            // Lower Vertical Line - Responsive to Fill Space
                            <div className="block border-2 round border-slate-400 border-t-0 border-r-0 border-b-0 w-6 flex-grow"></div>
                        ) : null}
                    </div>
                    {/* Child Element */}
                    <div className="flex flex-col">
                        {/* Insert Child or Nested Tree Here */}
                        {skill.children.length > 0 ?
                            <SkillTree
                                handleDelete={handleDelete}
                                skillList={skill}
                            />
                            :
                            (
                                <div className="flex flex-grow items-center">
                                    <TextWithIcon
                                        icon={faCode}
                                        text={`${skill.root.name} (ID: ${skill.root.id})`}
                                    />
                                    <a href="#" onClick={() => console.log("Edit Skill clicked for ", skill.root.id)}>
                                        <FontAwesomeIcon
                                            className="ml-8 text-orange-300/50 hover:text-amber-500/80 text-xl"
                                            icon={faPencil}
                                        />
                                    </a>
                                    <a href="#" onClick={() => handleDelete(skill.root.id)}>
                                        <FontAwesomeIcon
                                            className="ml-6 text-pink-300/50 hover:text-red-500/80 text-xl"
                                            icon={faCircleXmark}
                                        />
                                    </a>
                                </div>
                            )
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

SkillTree.propTypes = {
    skillList: PropTypes.object.isRequired,
    handleDelete: PropTypes.func,
};

SkillTree.defaultProps = {
    skillList: {
        root: { name: "Empty List" },
        children: [],
    },
    handleDelete: () => { },
};

export default SkillTree;
