import PropTypes from "prop-types";

const InputLabel = ({ label, name }) => {
  return (
    <label htmlFor={name} className="font-semibold accent-dark">
      {label}
    </label>
  );
};

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default InputLabel;
