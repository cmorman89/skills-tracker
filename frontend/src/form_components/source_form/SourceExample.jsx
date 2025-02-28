import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TextInputWithButton from "../input/TextInputWithButton";
import PropTypes from "prop-types";

const SourceExample = ({ onChange, onClick, exampleList, value }) => {
    return (
        <div className="flex flex-grow flex-row">
            <TextInputWithButton
                buttonIcon={faPlus}
                exampleList={exampleList}
                label="Add an Example"
                id="sourceExample"
                name="sourceExample"
                placeholder="Ex. Implemented Python to automate tasks, resulting in a 30% reduction in processing time."
                value={value}
                onChange={onChange}
                onClick={onClick}
            />
        </div>
    )
}
SourceExample.propTypes = {
    exampleList: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
export default SourceExample;