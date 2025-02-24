import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const TextWithIcon = ({ icon, text, onClick }) => {
    const titleCase = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return (
        <div
            className="flex flex-nowrap text-nowrap border border-pink-800 items-center w-fit m-2 bg-slate-700 rounded-md shadow-lg justify-between hover:border-pink-600/80 h-10"
        >
            <div className="bg-pink-800/50 flex items-center justify-center h-full p-2 mr-3">
                <a onClick={() => onClick(text)}>
                    <FontAwesomeIcon
                        icon={icon}
                        className="text-white/50 hover:text-white/80"
                    />
                </a>    
            </div>
            <small className="pr-3 ">
                {titleCase(text)}
            </small>
        </div>
    );
}

TextWithIcon.propTypes = {
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

TextWithIcon.defaultProps = {
    onClick: () => {},
};

export default TextWithIcon;