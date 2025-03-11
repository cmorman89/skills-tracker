import PropTypes from "prop-types";

const TextArea = ({
  autoFocus = false,
  id,
  name,
  onChange,
  placeholder,
  rows,
  value,
}) => {
  return (
    <textarea
      autoComplete="off"
      aria-autocomplete="none"
      aria-haspopup="false"
      autoFocus={autoFocus}
      className="
                bg-neutral-100
                ring ring-pink-900 focus:ring-2 focus:ring-pink-600 outline-none
                text-neutral-800 placeholder-neutral-400
                translate-y-0 focus:-translate-y-1 hover:-translate-y-1
                transition-all ease-in-out duration-700
                shadow-md hover:shadow-xl
                p-2 mt-1 
                rounded-xl
            "
      id={id || name}
      name={name}
      onChange={(e) => onChange(name, e.target.value)}
      placeholder={placeholder}
      rows={rows}
      value={value}
    />
  );
};

TextArea.propTypes = {
  autoFocus: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
  value: PropTypes.string,
};
TextArea.defaultProps = {
  autoFocus: false,
  onChange: (e) => {
    console.error(
      `no onChange passed to TextArea component with name: ${e.target.name}`
    );
  },
  placeholder: "",
  rows: "4",
  value: "",
};

export default TextArea;
