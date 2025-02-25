import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const SkillParentManager = ({ skill, parents, onChange }) => {

    const [availableParents, setAvailableParents] = useState([]);
    const [availableParentsLoading, setAvailableParentsLoading] = useState(true);

    const handleAddParent = (e) => {
        // Get the value of the clicked element
        const value = e.target.innerHTML;
        console.log("Adding ", value);

        // Check if the value is already in the parents list
        if (!parents.includes(value)) {
            // Add the value to the parents list
            const updatedParents = [...parents, value];

            // Remove the value from the available parents list
            setAvailableParents(availableParents.filter((parent) => parent.name !== value));

            // Call the onChange function with the updated parents list
            onChange(updatedParents);
        }
    }

    const handleRemoveParent = (e) => {
        // Get the value of the clicked element
        const value = e.target.innerHTML;
        console.log("Removing ", value);

        // Remove the value from the parents list
        const updatedParents = parents.filter((parent) => parent !== value);
        
        // Add the value back to the available parents list
        setAvailableParents([...availableParents, { name: value
        }]);
        // Call the onChange function with the updated parents list
        onChange(updatedParents);
    }

    useEffect(() => {
        const skillId = skill ? skill.id : undefined;
        const fetchAvailableParents = async () => {
            try {
                if (skillId === undefined) {
                    const response = await axios.get('http://127.0.0.1:5000/api/v1/skills/');
                    const legal_nodes = await response.data.filter((skill) => skill.id !== 1);
                    setAvailableParents(legal_nodes);
                } else {
                    const response = await axios.get(`http://127.0.0.1:5000/api/v1/skills/${skillId}/available_parents`);
                    setAvailableParents(response.data);
                }
            }
            catch (error) {
                console.error("Error fetching available parents: ", error);
            }
            finally {
                setAvailableParentsLoading(false);
            }
        }

        fetchAvailableParents();
    }, []);

    return (
        <div>
            <h2 className='text-2xl text-slate-400 font-bold'>ADD</h2>
            <div className='flex flex-row flex-wrap text-slate-300'>
                {availableParentsLoading ?
                    (<div>Loading...</div>)
                    :
                    (
                        console.log("Available Parents are ", availableParents),
                        availableParents.map(parent => (
                            <div key={parent.name} onClick={handleAddParent} className='flex text-center items-center justify-center h-16 w-16 m-1 bg-teal-200/50 rounded-full'>
                                {parent.name}
                            </div>
                        ))
                    )
                }
            </div>
            <div className='h-px w-full border border-slate-400 mx-1/4 my-4'></div>
            <h2 className='text-2xl text-slate-400 font-bold'>REMOVE</h2>
            <div className='flex flex-row flex-wrap text-slate-300'>
                {parents.map(parent => (
                    <div key={parent} onClick={handleRemoveParent} className='flex text-center items-center justify-center h-16 w-16 m-1 bg-pink-500/50 rounded-full'>
                        {parent}
                    </div>
                ))}
            </div>
            <div>

            </div>
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