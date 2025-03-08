import PropTypes from "prop-types";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkillNode from "./SkillNode";


const SkillTreeManager = ({ skillList, handleDelete }) => {
    if (!skillList) return null;
    const root_node = skillList?.root || { name: "Unknown" };
    const child_nodes = skillList?.children || [];
    const toUpperFirst = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return (
        <div className="flex flex-col">
            {/* Root Node */}
            <div className="flex">
                <SkillNode
                    text={toUpperFirst(root_node.name)}
                />
            </div>

            {/* For Each Child Node */}
            {child_nodes.map((skill, index) => (
                <div key={index} className="flex pl-8">
                    {/* Connecting Lines */}
                    <div className="flex flex-col min-h-1">
                        {/* Line Connecting Child Node to Parent Node */}
                        <div className="block border-2 round border-pink-700 border-t-0 border-r-0 w-6 h-9"></div>
                        {index !== child_nodes.length - 1 ? (
                            // Lower Vertical Line - Responsive to Fill Space
                            <div className="block border-2 round border-pink-700 border-t-0 border-r-0 border-b-0 w-6 flex-grow"></div>
                        ) : null}
                    </div>
                    {/* Child Element */}
                    <div className="flex flex-col">
                        {/* Insert Child or Nested Tree Here */}
                        {skill.children.length > 0 ?
                            <SkillTreeManager
                                handleDelete={handleDelete}
                                skillList={skill}
                            />
                            :
                            (
                                <div className="flex flex-grow items-center">
                                    <SkillNode
                                        text={toUpperFirst(skill.root.name)}
                                    />
                                    <a href="#" onClick={() => handleDelete(skill.root.id)}>
                                        <FontAwesomeIcon
                                            className="ml-3 text-pink-300/30 hover:text-red-500/80 text-2xl ease-in-out duration-300 howver:shadow-lg"
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

SkillTreeManager.propTypes = {
    skillList: PropTypes.object.isRequired,
    handleDelete: PropTypes.func,
};

SkillTreeManager.defaultProps = {
    skillList: {
        root: { name: "Empty List" },
        children: [],
    },
    handleDelete: () => { },
};

export default SkillTreeManager;
