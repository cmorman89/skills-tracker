
import PropTypes from 'prop-types';
import TextArea from './TextArea';

const SkillDescriptionInput = ({ value, parentOnChange }) => {
  return (
    <div className="mb-4">
      <TextArea
        label="Skill Description"
        id="skillDescription"
        name="skillDescription"
        placeholder="Enter a brief description of the skill (optional)."
        value={value}
        onChange={(e) => parentOnChange(e.target.value)}
      />
    </div>
  );  
};
SkillDescriptionInput.propTypes = {
  value: PropTypes.string,
  parentOnChange: PropTypes.func,
};
SkillDescriptionInput.defaultProps = {
  value: '',
  parentOnChange: (value) => {console.log(value);},
};

export default SkillDescriptionInput;