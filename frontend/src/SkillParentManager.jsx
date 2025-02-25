import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import SkillParentList from './SkillParentList';
import TextWithX from './TextWithX';
import TextInput from './TextInput';
import TextWithNA from './TextWithNA';

const SkillParentManager = ({ skill, parents, onChange }) => {

    const [availableParents, setAvailableParents] = useState([]);
    const [filterAddSkill, setFilterAddSkill] = useState('');
    const [filterRemoveSkill, setFilterRemoveSkill] = useState('');


    const handleAddParent = (e) => {
        // Check if the value is already in the parents list
        if (!parents.includes(e)) {
            // Add the value to the parents list
            const updatedParents = [...parents, e];

            console.log("Updated parents");
            // Remove the value from the available parents list
            setAvailableParents(availableParents.filter((parent) => parent.id !== e.id));

            // Call the onChange function with the updated parents list
            onChange(updatedParents);
        }
    }

    const handleRemoveParent = (e) => {
        // Remove the value from the parents list
        const updatedParents = parents.filter((parent) => parent.id !== e.id);
        // Add the value back to the available parents list
        setAvailableParents([...availableParents, e]);
        // Call the onChange function with the updated parents list
        onChange(updatedParents);
    }

    const filterAddResults = () => {
        /* Filter the available parents based on the search input */
        if (!filterAddSkill) return availableParents;
        return availableParents.filter((skill) => skill.name.toLowerCase().includes(filterRemoveSkill.toLowerCase()));
    } 

    const filterRemoveResults = () => {
        /* Filter the current parents based on the search input */
        if (!filterRemoveSkill) return parents;
        return parents.filter((skill) => skill.name.toLowerCase().includes(filterRemoveSkill.toLowerCase()));
    } 

    useEffect(() => {
        // Set the skill ID 
        const skillId = skill ? skill.id : undefined;
        // Fetch the available parents
        const fetchAvailableParents = async () => {
            try {
                // If the skill ID is undefined, fetch all skills except the root skill
                if (skillId === undefined) {
                    const response = await axios.get('http://127.0.0.1:5000/api/v1/skills/');
                    const legal_nodes = await response.data.filter((skill) => skill.id !== 1);
                    setAvailableParents(legal_nodes);
                    // Otherwise, fetch the available parents for the skill
                } else {
                    const response = await axios.get(`http://127.0.0.1:5000/api/v1/skills/${skillId}/available_parents`);
                    setAvailableParents(response.data);
                }
            }
            // Log any errors
            catch (error) {
                console.error("Error fetching available parents: ", error);
            }
        }

        // Trigger fetching available parents
        fetchAvailableParents();
        console.log("Refetched parents");
    }, [skill]);

    return (
        <div className='flex flex-grow flex-col '>
            {/* Add Parent Skills Section */}
            {/* Add Skill Filter */}
            <div className="mb-4">
                <TextInput
                    label="Add a Parent Skill"
                    id="addSkillSearch"
                    name="addSkillSearch"
                    onChange={(e) => setFilterAddSkill(e.target.value)}
                    placeholder="Search..."
                    value={filterAddSkill}
                />
            </div>
            {/* Add Parent Skills List */}
            <SkillParentList
                onClick={handleAddParent}
                skillList={filterAddResults()}
            />

            {/* Remove Parent Skills Section */}
            {/* Remove Skill Filter */}
            <div className="mb-4">
                <TextInput
                    label="Remove a Parent Skill"
                    id="removeSkillSearch"
                    name="removeSkillSearch"
                    onChange={(e) => setFilterRemoveSkill(e.target.value)}
                    placeholder="Search..."
                    value={filterRemoveSkill}
                />
            </div>
            {/* Remove Parent Skills List */}
            <SkillParentList
                Component={TextWithX}
                onClick={handleRemoveParent}
                skillList={filterRemoveResults()}
            />

        </div>
    );
}

SkillParentManager.propTypes = {
    skill: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
    }),
    parents: PropTypes.array.isRequired,
    onChange: PropTypes.func,
};

SkillParentManager.defaultProps = {
    parents: [],
    onChange: (value) => { console.log(value); },
    skill: { "id": 0 },
};
export default SkillParentManager;