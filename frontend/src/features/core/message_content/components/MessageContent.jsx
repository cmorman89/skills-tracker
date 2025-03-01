import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MessageContent = ({ message, onClose, type, visible }) => {

    return (
        <div
            className={`
                flex items-center
                rounded-xl shadow-2xl 
                px-8
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
                icon={faTimes}
                onClick={onClose}
                className="cursor-pointer r-0"
            />

        </div>
    )
}
export default MessageContent;