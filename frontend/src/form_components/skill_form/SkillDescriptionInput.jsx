
import PropTypes from 'prop-types';
import TextArea from '../input/TextArea';

const SkillDescriptionInput = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <TextArea
        label="Skill Description"
        id="skillDescription"
        name="skillDescription"
        placeholder="Enter a brief description of the skill (optional)."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
SkillDescriptionInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

SkillDescriptionInput.defaultProps = {
  value: '',
  onChange: (value) => { console.log(value); },
};

export default SkillDescriptionInput;