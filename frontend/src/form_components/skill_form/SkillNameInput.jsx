import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TextInput from '../input/TextInput';

const SkillNameInput = ({ value, onChange }) => {
  const [error, setError] = useState('');

  const querySkillName = async (value) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/skills/name/${value}`);
      return response.data;
    }
    catch (error) {
      console.error('Error fetching skill name: ', error);
    }
  };

  useEffect(() => {

    const checkNameUnique = async () => {
      
      if (value.length > 50) {
        setError('Skill name too long.');
        return;
      } else {
        setError('');
      }
      try {
        const result = await querySkillName(value.toLowerCase());

        if (result !== null) {
          setError('Skill name already exists.');
        } else {
          setError('');
        }
      } catch (error) {
        console.error('Error fetching skill name: ', error);
        setError('Error checking skill name.');
      }
    };

    checkNameUnique();
  }
  , [value, onChange]);


  return (
    <div className="mb-4">
      <TextInput
        label="Skill Name"
        id="skillName"
        name="skillName"
        placeholder="Enter skill name"
        value={value}
        onChange={onChange}
      />
      {error && <small className='text-orange-400'>{error}</small>}
    </div>
  );
};
SkillNameInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SkillNameInput;