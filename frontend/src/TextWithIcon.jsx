import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { icon } from '@fortawesome/fontawesome-svg-core';

const TextWithIcon = ({ text, icon, color, onClick }) => {
    return (
        <div
            className={`flex border border-${color}-800 flex-wrap items-center w-fit m-2 pl-3 bg-slate-700 rounded-md shadow-lg justify-between hover:border-${color}-400/50 h-10`}
            >
            <small className="pr-3">
                {text}
            </small>
            <div className={`bg-${color}-800/50 flex items-center justify-center h-full p-2`}>
                <a onClick={() => onClick(text)}>
                    <FontAwesomeIcon
                        icon={icon}
                        className={`text-${color}-300/50 hover:text-${color}-400`}
                    />
                </a>    
            </div>
        </div>
    );
}

TextWithIcon.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onClick: PropTypes.func,
};

TextWithIcon.defaultProps = {
    onClick: () => { },
    icon: faPlusCircle,
};

export default TextWithIcon;