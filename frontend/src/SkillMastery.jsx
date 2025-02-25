import PropTypes from "prop-types";
import RangeInput from "./RangeInput";

const SkillMastery = ({ value, onChange }) => {
    return (
        <div>
            <RangeInput
                id="mastery"
                label="Mastery Level"
                min={1}
                minLabel="Beginner"
                max={5}
                maxLabel="Expert"
                onChange={onChange}
                step={1}
                value={value}
            />
        </div>
    );
}

SkillMastery.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default SkillMastery;