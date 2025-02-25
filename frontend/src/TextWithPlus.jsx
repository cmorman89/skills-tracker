import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const TextWithPlus = ({ skill, text, onClick }) => {
    return (
        <div
            className="flex border border-teal-800 flex-wrap items-center w-fit m-2 pl-3 bg-slate-700 rounded-md shadow-lg justify-between hover:border-teal-400/50 h-10"
            onClick={() => onClick(skill)}
            >
            <small className="pr-3">
                {text}
            </small>
            <div className="bg-teal-800/50 flex items-center justify-center h-full p-2">
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="text-white/50 hover:text-white/80"
                    /> 
            </div>
        </div>
    );
}

TextWithPlus.propTypes = {
    onClick: PropTypes.func,
    skill: PropTypes.object,
    text: PropTypes.string.isRequired,
};

TextWithPlus.defaultProps = {
    onClick: () => {},
};

export default TextWithPlus;