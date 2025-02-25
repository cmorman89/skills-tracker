import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import SkillParentList from './SkillParentList';
import TextWithX from './TextWithX';
import TextInput from './TextInput';

const SkillParentManager = ({ skill, parents, onChange }) => {

    const [availableParents, setAvailableParents] = useState([]);
    const [availableParentsLoading, setAvailableParentsLoading] = useState(true);
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
            // Set loading flag to complete
            finally {
                setAvailableParentsLoading(false);
            }
        }

        // Trigger fetching available parents
        fetchAvailableParents();
        console.log("Refetched parents");
    }, []);

    return (
        <div className='flex flex-grow flex-col '>
            {/* Add Parent Skills Section */}
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
            <SkillParentList
                onClick={handleAddParent}
                skillList={availableParents}
                variant='add'
            />

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
            <SkillParentList
                Component={TextWithX}
                onClick={handleRemoveParent}
                skillList={parents}
            />

        </div>
    );
}

SkillParentManager.propTypes = {
    skill: PropTypes.shape({
        id: PropTypes.number,
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