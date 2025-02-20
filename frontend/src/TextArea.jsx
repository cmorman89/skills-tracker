
import PropTypes from 'prop-types';

const TextArea = ({ label, id, name, placeholder, value, onChange }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-300"
      >
        {label}
      </label>
      
      <textarea
        id={id}
        name={name}
        className="mt-1 block w-full p-2 border border-slate-600 rounded-md shadow-sm bg-slate-900/40"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows="4"
      ></textarea>
    </div>
  );
};
TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
TextArea.defaultProps = {
  placeholder: '',
  value: '',
};

export default TextArea;