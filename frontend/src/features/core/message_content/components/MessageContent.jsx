import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types";

const MessageContent = ({ message, setMessageVisible, type, visible }) => {

    return (
        <div
            className={`
                flex items-center
                shadow-2xl
                rounded-xl
                px-4 mx-4
                ease-in-out duration-200
                relative
                ${visible ? 'h-16 py-2 border opacity-100 my-4' : 'h-0 py-0 border-0 opacity-0 my-0'} 
                ${type === 'info' ?
                    'bg-blue-300 border-blue-700 text-blue-900'
                    : type === 'error' ?
                        '  bg-red-300 border-red-700 text-red-900'
                        : type === 'success' ?
                            'bg-green-300 border-green-700 text-green-900'
                            :
                            'bg-blue-300 border-blue-700 text-blue-900'
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