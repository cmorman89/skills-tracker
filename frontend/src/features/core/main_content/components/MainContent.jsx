import PropTypes from 'prop-types';

const MainContent = ({ innerComponents, setMessage, setMessageType, setMessageVisible }) => {

    const createMessage = (message, type) => {
        setMessage(message);
        setMessageType(type);
        setMessageVisible(true);
    }

    return (
        <div className="flex flex-col flex-grow bg-fuchsia-300/15 rounded-xl shadow-2xl border border-fuchsia-700/60 p-8">
            <div className="flex gap-4">
                <div onClick={() => createMessage("This is a test success message", "success")} className="flex-grow mb-2 cursor-pointer bg-blue-300/15 rounded-xl shadow-2xl border border-blue-700/60 p-4 text-blue-300">
                    Show Success Message
                </div>
                <div onClick={() => createMessage("This is a test error message", "error")} className="flex-grow mb-2 cursor-pointer bg-blue-300/15 rounded-xl shadow-2xl border border-blue-700/60 p-4 text-blue-300">
                    Show Error Message
                </div>
                <div onClick={() => createMessage("This is a test info message", "info")} className="flex-grow mb-2 cursor-pointer bg-blue-300/15 rounded-xl shadow-2xl border border-blue-700/60 p-4 text-blue-300">
                    Show Info Message
                </div>
            </div>
            {innerComponents.map((component, key) => (
                <div key={key} className="mb-4">
                    {component}
                </div>
            ))}
        </div>
    )
}

MainContent.propTypes = {
    innerComponents: PropTypes.array.isRequired,
    setMessage: PropTypes.func.isRequired,
    setMessageType: PropTypes.func.isRequired,
    setMessageVisible: PropTypes.func.isRequired,
}
export default MainContent;