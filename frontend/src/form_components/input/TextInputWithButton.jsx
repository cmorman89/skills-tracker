
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const TextInputWithButton = ({ buttonIcon, label, id, name = id, placeholder, value, onChange, onClick}) => {
  return (
    <div className='flex flex-col flex-grow'>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className='flex flex-grow justify-between items-center mt-1'>
        <input
          autoComplete="off"
          type="text"
          id={id}
          name={name}
          className="mr-2 block w-full p-2 border border-slate-600 rounded-md shadow-lg bg-slate-900/40"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div
          className='flex justify-center items-center h-10 w-10 p-2 border border-teal-600/50 rounded-md shadow-lg bg-teal-700/40'
          onClick={(e) => onClick(e)}
        >
          <FontAwesomeIcon
            icon={buttonIcon}
          />
        </div>
      </div>
    </div>
  );
};
TextInputWithButton.propTypes = {
  buttonIcon: PropTypes.object.isRequired,
  exampleList: PropTypes.array,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func.isRequired,
};
TextInputWithButton.defaultProps = {
  onChange: () => { },
  placeholder: '',
  value: '',
};

export default TextInputWithButton;