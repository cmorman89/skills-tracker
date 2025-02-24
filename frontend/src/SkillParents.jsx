import { use, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import FilterItemList from "./FilterItemList";

const SkillParents = ({ skill_id }) => {
    const [actualParents, setActualParents] = useState([]);
    const [actualParentsLoading, setActualParentsLoadings] = useState(true);
    const [availableParents, setAvailableParents] = useState([]);
    const [availableParentsLoading, SetAvailableParentsLoading] = useState(true);

    useEffect(() => {
        const fetchParents = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/v1/skills/${skill_id}/parents`);
                setActualParents(response.data.map((parent) => parent.name));
            } catch (error) {
                console.error("Error fetching parents: ", error);
            } finally {
                setActualParentsLoadings(false);
            }
        };

        const fetchAvailableParents = async () => {
            try {
                console.log("SKILL ID IS ", skill_id);
                if (skill_id == undefined) {
                    console.log("SKILL ID IS UNDEFINED - detected");
                    const response = await axios.get('http://127.0.0.1:5000/api/v1/skills/');
                    const legal_nodes = response.data.filter((skill) => skill.id !== 1);
                    setAvailableParents(legal_nodes);
                    console.log("AVAILABLE PARENTS ARE ", response.data);
                    console.log("LEGAL NODES ARE ", legal_nodes);
                } else {
                    const response = await axios.get(`http://127.0.0.1:5000/api/v1/skills/${skill_id}/available_parents`);
                    setAvailableParents(response.data);
                }
            }
            catch (error) {
                console.error("Error fetching available parents: ", error);
            }
            finally {
                SetAvailableParentsLoading(false);
            }
        }

        fetchParents();
        fetchAvailableParents();
    }, [skill_id]);

    const handleAddParent = (parentName) => {
        const parentObj = availableParents.find((p) => p.name === parentName);
        if (parentObj) {
            setActualParents([...actualParents, parentObj.name]);
            setAvailableParents(availableParents.filter((p) => p.name !== parentName));
        }
    };

    const handleRemoveParent = (parentName) => {
        setAvailableParents([...availableParents, { name: parentName }]);
        setActualParents(actualParents.filter((p) => p !== parentName));
    };

    return (
        <div className="mb-4">
            <FilterItemList
                label="Add a Parent Skill"
                id="addParent"
                name="addParent"
                texts={availableParentsLoading ? ["Loading..."] : availableParents.map((skill) => skill.name)}
                onClick={handleAddParent}
                variant="add"
                results="10"
                resultsOnEmpty={true}
            />
            <FilterItemList
                label="Remove a Parent Skill"
                id="removeParent"
                name="removeParent"
                texts={actualParentsLoading ? ["Loading..."] : actualParents}
                onClick={handleRemoveParent}
                variant="remove"
                results="10"
                resultsOnEmpty={true}
            />
        </div>
    );
};


SkillParents.propTypes = {
    skill_id: PropTypes.number.isRequired,
};

export default SkillParents;