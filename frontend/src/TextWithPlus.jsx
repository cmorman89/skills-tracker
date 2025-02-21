import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const TextWithPlus = ({ text, onClick }) => {
    return (
        <div
            className="flex border border-teal-800 flex-wrap items-center w-fit m-2 px-2 py-1 bg-slate-700 rounded-md shadow-lg justify-between hover:border-teal-400/50"
            >
            <small className="mr-2">
                {text}
            </small>
            <a onClick={() => onClick(text)}>
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    className="text-teal-300/50 hover:text-teal-400"
                />
            </a>    
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