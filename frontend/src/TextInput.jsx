
import PropTypes from 'prop-types';

const TextInput = ({ label, id, name, placeholder, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        autoComplete="off"
        type="text"
        id={id}
        name={name}
        className="mt-1 block w-full p-2 border border-slate-600 rounded-md shadow-sm bg-slate-900/40"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
TextInput.defaultProps = {
  placeholder: '',
};

export default TextInput;