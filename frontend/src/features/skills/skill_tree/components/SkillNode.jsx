// import { faChessKing, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";

const SkillNode = ({ category, icon, onClick, text }) => {

    const iconComponent = icon ? solidIcons[icon] : solidIcons["faList"];
    
    const toUpperFirst = (s) => {
        if (!s) return "";
        if (typeof s !== "string") return s;
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return (
        <div
            className="flex m-2 cursor-pointer"
            onClick={onClick}
        >
            <div
                className="
                    flex items-center justify-center
                    m-auto w-auto gap-2 p-1 pr-3
                    rounded-lg
                    shadow-lg hover:shadow-xl
                    transition-all duration-500 ease-in-out
                    translate-y-0 hover:-translate-y-1
                    bg-gradient-to-br from-pink-200 to-pink-100
                    border border-fuchsia-600
                    text-pink-950 font-bold text-sm
                    "
            >
                <div className="
                    flex items-center justify-center
                    w-10 min-h-10 h-full
                    bg-pink-400
                    text-xl text-pink-900
                    rounded-md 
                    shadow-lg
                ">
                    <FontAwesomeIcon icon={iconComponent} />
                </div>
                <div className="flex flex-col">
                    <div>
                        {toUpperFirst(text)}
                    </div>
                    <div className="font-normal text-xs text-pink-800/60 italic">
                        {category ? toUpperFirst(category) : "No Category"}
                    </div>
                </div>
            </div>
        </div>
    )
}

SkillNode.propTypes = {
    category: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
}
SkillNode.defaultProps = {
    category: "No Category",
    icon: "faList",
    text: "No text provided.",
}
export default SkillNode;