import { useEffect, useState } from "react";
import ItemListWithX from "./ItemListWithX";
import PropTypes from 'prop-types';
import TextInput from "./TextInput";
import ItemList from "./ItemList";
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
            <hr className="my-8 border-1 border-slate-700 shadow-lg" />
            <FilterItemList
                texts={skillParents}
                onClick={handleAddParent}

            />
            <ItemList
                texts={skillParents}
                onClick={handleRemoveParent}
                variant="add"
            />
            <div className="mb-4">
                <TextInput
                    label="Remove a Parent Skill"
                    id="skillParents"
                    name="skillParents"
                    placeholder="Search..."
                    value=""
                />
            <ItemList
                texts={skillParents}
                onClick={handleRemoveParent}
                variant="remove"
            />
            </div>

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