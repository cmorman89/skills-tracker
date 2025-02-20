import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const TextWithX = ({ text, onClick }) => {
    return (
        <div
            className="flex border border-slate-600 flex-wrap items-center w-fit m-2 px-2 py-1 bg-slate-700 rounded-md shadow-lg justify-between hover:border-orange-400"
            >
            <small className="mr-2">
                {text}
            </small>
            <a onClick={onClick}>
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-orange-300/50 hover:text-orange-400"
                />
            </a>    
        </div>
    );
}

TextWithX.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

TextWithX.defaultProps = {
    onClick: () => {},
};

export default TextWithX;