
import PropTypes from 'prop-types';
import TextArea from './TextArea';

const SkillDescriptionInput = ({ value }) => {
  return (
    <div className="mb-4">
      <TextArea
        label="Skill Description"
        id="skillDescription"
        name="skillDescription"
        placeholder="Enter a brief description of the skill (optional)."
        value={value}
        onChange=''
      />
    </div>
  );
};
SkillDescriptionInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SkillDescriptionInput;