import { useEffect, useState } from "react";
import Input from "../../../../components/input/form/Input";
import InputLabel from "../../../../components/input/form/InputLabel";
import PropTypes from "prop-types";
import axios from "axios";

const SkillNameInput = ({ value, onChange, originalValue }) => {
  // State to store whether the skill name is already taken
  const [isNameTaken, setIsNameTaken] = useState(false);

  // Check if the skill name is already taken when the value changes
  useEffect(() => {
    const checkName = async () => {
      if (value === "" || value === originalValue) {
        setIsNameTaken(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/v1/skills/name/${value}`
        );
        if (response.status === 200) {
          setIsNameTaken(true);
        } else {
          setIsNameTaken(false);
        }
      } catch {
        setIsNameTaken(false);
      }
    };
    checkName();
  }, [value]);

  return (
    <div className="flex flex-col">
      <InputLabel label="Skill Name" name="name" />
      <Input
        autoFocus={true}
        id="skillName"
        inErrorState={isNameTaken}
        name="name"
        onChange={onChange}
        placeholder="Ex. JavaScript"
        type="text"
        value={value}
      />
      <div
        className={`mt-1 flex justify-center ease-in-out duration-300 ${
          isNameTaken ? "opacity-100" : "opacity-0"
        }`}
      >
        <small className="font-bold text-error">
          ⛔{" "}
          <span className="italic">
            Skill name already taken. Please choose another.
          </span>
        </small>
      </div>
    </div>
  );
};

SkillNameInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  originalValue: PropTypes.string,
  value: PropTypes.string.isRequired,
};
SkillNameInput.defaultProps = {
  originalValue: "",
};
export default SkillNameInput;
