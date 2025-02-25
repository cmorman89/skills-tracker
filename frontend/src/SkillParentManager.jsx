import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import SkillParentList from './SkillParentList';
import TextWithX from './TextWithX';

const SkillParentManager = ({ skill, parents, onChange }) => {

    const [availableParents, setAvailableParents] = useState([]);
    const [availableParentsLoading, setAvailableParentsLoading] = useState(true);

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
        <div>
            <h2 className='text-2xl text-slate-400 font-bold'>ADD</h2>
            <SkillParentList
                onClick={handleAddParent}
                skillList={availableParents}
                variant='add'
            />

            <div className='h-px w-full border border-slate-400 mx-1/4 my-4'></div>

            <h2 className='text-2xl text-slate-400 font-bold'>REMOVE</h2>

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