import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import FilterItemList from "./FilterItemList";

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
            <FilterItemList
                label="Add a Parent Skill"
                id="addParent"
                name="addParent"
                texts={skillParents}
                onClick={handleAddParent}
                variant="add"
                results="10"
                resultsOnEmpty={false}
            />
            <FilterItemList
                label="Remove a Parent Skill"
                id="removeParent"
                name="removeParent"
                texts={skillParents}
                onClick={handleRemoveParent}
                variant="remove"
                results="10"
                resultsOnEmpty={true}
            />
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