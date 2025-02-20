import { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

const SkillNameInput = ({ value, onChange }) => {
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Simple validation example:
    if (newValue.length > 50) {
      setError('Skill name too long.');
    } else {
      setError('');
    }
  };

  return (
    <div className="mb-4">
      <TextInput
        label="Skill Name"
        id="skillName"
        name="skillName"
        placeholder="Enter skill name"
        value={value}
        onChange={handleInputChange}
      />
      {error && <small style={{ color: 'red' }}>{error}</small>}
    </div>
  );
};
SkillNameInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SkillNameInput;