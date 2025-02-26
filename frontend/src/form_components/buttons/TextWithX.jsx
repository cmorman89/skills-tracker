import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const TextWithX = ({ skill, text, onClick }) => {
    return (
        <div
            className="flex border border-orange-400/50 flex-wrap overflow-hidden items-center w-fit m-2 pl-3 bg-slate-700 rounded-md shadow-lg justify-between hover:border-orange-400/80 h-10"
            onClick={() => onClick(skill)}
        >
            <small className="pr-3">
                {text}
            </small>
            <div className="bg-orange-400/50 flex items-center justify-center h-full p-2">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-white/50 hover:text-white/80"
                />
            </div>
        </div>
    );
}


TextWithX.propTypes = {
    onClick: PropTypes.func,
    skill: PropTypes.object,
    text: PropTypes.string.isRequired,
};

TextWithX.defaultProps = {
    onClick: () => {},
};

export default TextWithX;