import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const TextWithNA = ({ skill, text, onClick }) => {
    return (
        <div
            className="flex border border-gray-200/30 overflow-hidden flex-wrap items-center w-fit m-2 pl-3 bg-slate-700 rounded-md shadow-lg justify-between hover:border-gray-400/80 h-10"
            onClick={() => onClick(skill)}
        >
            <small className="pr-3">
                {text}
            </small>
            <div className="bg-gray-950/50 flex items-center justify-center h-full p-2">
                <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-white/50 hover:text-white/80"
                />
            </div>
        </div>
    );
}


TextWithNA.propTypes = {
    onClick: PropTypes.func,
    skill: PropTypes.object,
    text: PropTypes.string.isRequired,
};

TextWithNA.defaultProps = {
    onClick: () => { },
};

export default TextWithNA;