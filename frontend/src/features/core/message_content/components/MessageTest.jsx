import PropTypes from "prop-types";
import Button from "../../../../components/input/button/Button";

const MessageTest = ({ createMessage }) => {
  return (
    // Message Tests
    <div className="grid grid-cols-3 gap-4">
      <Button
        text="Show Success Message"
        onClick={() =>
          createMessage("This is a test success message", "success")
        }
      />
      <Button
        text="Show Error Message"
        onClick={() => createMessage("This is a test error message", "error")}
      />
      <Button
        text="Show Info Message"
        onClick={() => createMessage("This is a test info message", "info")}
      />
    </div>
  );
};

MessageTest.propTypes = {
  createMessage: PropTypes.func.isRequired,
};
export default MessageTest;
