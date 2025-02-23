import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const TextWithX = ({ text, onClick }) => {
    return (
        <div
            className="flex border border-amber-800 flex-wrap items-center w-fit m-2 pl-3 bg-slate-700 rounded-md shadow-lg justify-between hover:border-orange-400/50 h-10"
            >
            <small className="pr-3">
                {text}
            </small>
            <div className="bg-orange-400/50 flex items-center justify-center h-full p-2">
                <a onClick={() => onClick(text)}>
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="text-white/50 hover:text-white/80"
                    />
                </a>    
            </div>
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