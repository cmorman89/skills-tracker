import { useEffect, useState } from "react";
import ItemsList from "./ItemsList";
import PropTypes from 'prop-types';
import TextInput from "./TextInput";

const SkillParents = ({ parents }) => {
    const [skillParents, setSkillParents] = useState(parents);

    useEffect(() => {
        setSkillParents(parents);
    }, [parents]);

    const handleAddParent = (parent) => {
        setSkillParents([...skillParents, parent]);
    };

    const handleRemoveParent = (parent) => {
        console.log(parent);
        setSkillParents(skillParents.filter((p) => p !== parent));
    };
    
    return (
        <div className="mb-4">
            {/* Text Field for Search */}
            <TextInput
                label="Search for a Skill Parent"
                id="searchSkillParent"
                name="searchSkillParent"
                placeholder="Search for a Skill Parent"
            />
            {/* // Dropdown for Filter */}

            {/* // OnClick of Parent in Dropdown, add to List */}
            {/* // List of Skill Parents */}
            <ItemsList
                texts={skillParents}
                onClick={handleRemoveParent}
            />
            {/* // OnClick of Parent in List, remove from List */}
        </div>
    );

}

SkillParents.propTypes = {
    parents: PropTypes.arrayOf(PropTypes.string),
};

SkillParents.defaultProps = {
    parents: [],
};

export default SkillParents;