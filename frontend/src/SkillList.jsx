import PropTypes from "prop-types";
import SkillTree from "./SkillTree";
import TextInput from "./TextInput";

const SkillList = ({ items }) => {
    return (
        <>
            <div className="mb-2">
                <TextInput
                    label="Search"
                    placeholder="Search..."
                />
            </div>
            <SkillTree
                items={items}
            />
        </>
    );
}

SkillList.propTypes = {
    items: PropTypes.array,
}

SkillList.defaultProps = {
    items: ["Empty List"],
}


export default SkillList;