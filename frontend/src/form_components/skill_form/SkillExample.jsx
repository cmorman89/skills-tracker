import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TextInputWithButton from "../input/TextInputWithButton";
import PropTypes from "prop-types";

const SkillExample = ({ onChange, onClick, exampleList, value }) => {
    return (
        <div className="flex flex-grow flex-row">
            <TextInputWithButton
                buttonIcon={faPlus}
                exampleList={exampleList}
                label="Skill Example"
                id="skillExample"
                name="skillExample"
                placeholder="Enter skill example"
                value={value}
                onChange={onChange}
                onClick={onClick}
            />
        </div>
    )
}
SkillExample.propTypes = {
    exampleList: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
export default SkillExample;