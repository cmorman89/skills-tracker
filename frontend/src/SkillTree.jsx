import PropTypes from "prop-types";
import TextWithIcon from "./TextWithIcon";
import { faCode } from "@fortawesome/free-solid-svg-icons";


const SkillTree = ({ skillList }) => {
    if (!skillList) return null;

    const root_node = skillList?.root || { name: "Unknown" };
    const child_nodes = skillList?.children || [];

    return (
        <div className="flex flex-col">
            {/* Root Node */}
            <div className="flex">
                <TextWithIcon
                    icon={faCode}
                    text={root_node.name}
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
                            <SkillTree skillList={skill} />
                            :
                            <TextWithIcon
                                icon={faCode}
                                text={skill.root.name}
                            />
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

SkillTree.propTypes = {
    skillList: PropTypes.object.isRequired,
};

SkillTree.defaultProps = {
    skillList: {
        root: { name: "Empty List" },
        children: [],
    },
};

export default SkillTree;
