
import PropTypes from 'prop-types';

const RangeInput = ({ id, label, max, maxLabel, min, minLabel, name = id, onChange, step, value }) => {

  const range = (min, max, step = 1) =>
    Array.from({ length: Math.ceil((max - min) / step) + 1 }, (_, i) => min + i * step); 

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <div className='flex justify-between text-slate-400 italic my-2'>
        <small>{minLabel}</small>
        <small>{maxLabel}</small>
      </div>
      <div>
        <input
          className="mb-1 block w-full rounded-md shadow-lg accent-slate-400"
          id={id}
          max={max}
          min={min}
          name={name}
          onChange={(e) => onChange(Number(e.target.value))}
          type="range"
          value={value}
        />
      </div>
      <div className='flex justify-between px-1 text-slate-500'>
        {
          range(min, max, step).map((val) => (
            <small key={val}>{val}</small>
          ))
        }
      </div>
    </div>
  );
};
RangeInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  minLabel: PropTypes.string,
  maxLabel: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
RangeInput.defaultProps = {
  placeholder: '',
  value: '',
};

export default RangeInput;