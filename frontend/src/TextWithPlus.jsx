import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const TextWithPlus = ({ text, onClick }) => {
    return (
        <div
            className="flex border border-teal-800 flex-wrap items-center w-fit m-2 pl-3 bg-slate-700 rounded-md shadow-lg justify-between hover:border-teal-400/50 h-10"
            >
            <small className="pr-3">
                {text}
            </small>
            <div className="bg-teal-800/50 flex items-center justify-center h-full p-2">
                <a onClick={() => onClick(text)}>
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="text-teal-300/50 hover:text-teal-400"
                    />
                </a>    
            </div>
        </div>
    );
}

TextWithPlus.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

TextWithPlus.defaultProps = {
    onClick: () => {},
};

export default TextWithPlus;