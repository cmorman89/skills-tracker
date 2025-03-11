import PropTypes from "prop-types";

const InputLabel = ({ children, label, name, variant = "dark"}) => {
  return (
    <label htmlFor={name} className={`font-semibold ${variant === "light" ? 'accent-light' : 'accent-dark'}`}>
      {children || label}
    </label>
  );
};

InputLabel.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["light", "dark"]),
};

export default InputLabel;
