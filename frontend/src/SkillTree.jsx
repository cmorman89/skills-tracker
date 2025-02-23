
import PropTypes from "prop-types";
import TextWithPlus from "./TextWithPlus";

const SkillTree = ({ items }) => {
    return (
        <div className="flex flex-col">
            {/* Root node */}
            <TextWithPlus text="Python" />
            {/* Child node */}
            <div className="flex pl-6">
                <div className="flex flex-col min-h-1">
                    <div className="block border-2  border-slate-400 border-t-0 border-r-0 w-6 h-1/2"></div>
                    <div className="block border-2 border-slate-400 border-t-0 border-r-0 border-b-0 w-6 h-1/2"></div>
                </div>
                <TextWithPlus text="Child" />
            </div>
            {/* Child node */}
            {items.map((item, index) => (
                <div key={index} className="flex pl-6">
                    {/* Lines */}
                    <div className="flex flex-col min-h-1">
                        {/* Upper "L" of Line */}
                        <div className="block border-2 round border-slate-400 border-t-0 border-r-0 w-6 h-7"></div>
                        {/* Lower Vertical Line - Responsive */}
                        {/* Hide if Terminal Node */}
                        {index != items.length ?
                            <div className="block border-2 round border-slate-400 border-t-0 border-r-0 border-b-0 w-6 flex-grow"></div>
                        : null}
                    </div>
                    {/* Child Element */}
                    <div className="flex flex-col">
                        {/* Insert Child or Nested Tree Here */}
                        <TextWithPlus text={item} />
                    </div>
                </div>
            ))}
            {/* Terminal Child node */}
            <div className="flex pl-6">
                <div className="flex flex-col min-h-1">
                    <div className="block border-2 round border-slate-400 border-t-0 border-r-0 w-6 h-1/2"></div>
                </div>
                <TextWithPlus text="Child" />
            </div>
        </div>
    )
};

SkillTree.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    
}

SkillTree.defaultProps = {
    items: [],
}

export default SkillTree;