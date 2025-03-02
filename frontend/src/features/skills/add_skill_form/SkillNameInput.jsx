import Input from "../../../components/input/form/Input";
import InputLabel from "../../../components/input/form/InputLabel";
import PropTypes from "prop-types";

const SkillNameInput = ({ value, onChange }) => {
    return (
        <div className="flex flex-col">
            <InputLabel
                label="Skill Name"
                name="name"
            />
            <Input
                autoFocus={true}
                name="name"
                onChange={onChange}
                placeholder="Ex. JavaScript"
                type="text"
                value={value}
            />
            <div>
                <small className='font-bold text-red-600'>
                    ⛔ <span className="italic">Skill name already taken. Please choose another.</span>
                </small>
            </div>
        </div>
    )
}

SkillNameInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default SkillNameInput;