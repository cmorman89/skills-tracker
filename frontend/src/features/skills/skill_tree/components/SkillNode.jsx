import { faChessKing } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const SkillNode = ({ text }) => {
    return (
        <div
            className="
                flex
                m-2
                "
        >
            <div
                className="
                    flex items-center justify-center
                    m-auto w-auto gap-2 p-1 pr-3
                    rounded-lg
                    shadow-lg
                    bg-pink-200 
                    border border-fuchsia-600
                    text-pink-950 font-bold text-sm
                    "
            >
                <div className="
                    flex items-center justify-center
                    w-10 min-h-10 h-full
                    bg-gradient-to-br from-pink-500 to-fuchsia-400
                    text-xl text-pink-900
                    rounded-md 
                    shadow-lg
                ">
                    <FontAwesomeIcon icon={faChessKing} />
                </div>
                <div className="flex flex-col">
                    <div>
                        {text}
                    </div>
                    <div className="font-normal text-sm text-pink-800/70">Category</div>
                </div>
            </div>
        </div>
    )
}

SkillNode.propTypes = {
    text: PropTypes.string.isRequired,
}
SkillNode.defaultProps = {
    text: "No text provided.",
}
export default SkillNode;