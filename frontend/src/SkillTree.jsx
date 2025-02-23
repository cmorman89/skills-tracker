
import PropTypes from "prop-types";
import TextWithPlus from "./TextWithPlus";

const SkillTree = ({ items }) => {

    const root_node = items[0];
    const child_nodes = items.slice(1);
    return (
        <div className="flex flex-col">

            {/* Root Node */}
            <TextWithPlus text={root_node} />

            {/* For Each Child Node*/}
            {child_nodes.map((item, index) => (
                <div key={index} className="flex pl-6">
                    {/* Connecting Lines */}
                    <div className="flex flex-col min-h-1">
                        {/* Line Connecting Child Node to Parent Node*/}
                        <div className="block border-2 round border-slate-400 border-t-0 border-r-0 w-6 h-7"></div>
                        {
                            index != child_nodes.length - 1 ?
                                // Lower Vertical Line - Responsive to Fill Space
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 border-b-0 w-6 flex-grow"></div>
                                :
                                // Or Hide if Terminal Node
                                null
                        }
                    </div>
                    {/* Child Element */}
                    <div className="flex flex-col">
                        {/* Insert Child or Nested Tree Here */}
                        {
                            item instanceof Array ?
                                // Recursive Call for Nested Tree to Add New Subtree
                                <SkillTree items={item} />
                                :
                                // Child Node
                                <TextWithPlus text={item} />
                        }
                    </div>
                </div>
            ))}
        </div>
    )
};

SkillTree.propTypes = {
    items: PropTypes.array,
}

SkillTree.defaultProps = {
    items: ["Empty List"],
}

export default SkillTree;