import PropTypes from 'prop-types';

const MessageTest = ({ createMessage }) => {
    return (

        // Message Tests
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
    );
}

MessageTest.propTypes = {
    createMessage: PropTypes.func.isRequired,
}
export default MessageTest;