import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types";

const MessageContent = ({ message, setMessageVisible, type, visible }) => {

    return (
        <div
            className={`
                flex items-center
                rounded-xl shadow-2xl 
                px-4
                ease-in-out duration-200
                ${visible ? 'h-16 py-2 border opacity-100 mb-8' : 'h-0 py-0 border-0 opacity-0 mb-0'} 
                ${type === 'info' ?
                    'bg-blue-300/15 border-blue-700/60 text-blue-300'
                    : type === 'error' ?
                        '  bg-red-300/15 border-red-700/60 text-red-300'
                        : type === 'success' ?
                            'bg-green-300/15 border-green-700/60 text-green-300'
                            :
                            'bg-blue-300/15 border-blue-700/60 text-blue-300'
                }
                `}
        >
            <div className="flex flex-grow">
                {message}
            </div>

            <FontAwesomeIcon
                icon={faCircleXmark}
                onClick={() => setMessageVisible(false)}
                className="cursor-pointer text-lg"
            />

        </div>
    )
}
MessageContent.propTypes = {
    message: PropTypes.string,
    setMessageVisible: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['info', 'error', 'success']),
    visible: PropTypes.bool
}
MessageContent.defaultProps = {
    message: "",
    type: 'info',
    visible: false
}
export default MessageContent;