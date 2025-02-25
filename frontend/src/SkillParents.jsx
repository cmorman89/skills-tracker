import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import FilterItemList from "./FilterItemList";

const SkillParents = ({ skillId, parentOnChange }) => {
    const [actualParents, setActualParents] = useState([]);
    const [actualParentsLoading, setActualParentsLoadings] = useState(true);
    const [availableParents, setAvailableParents] = useState([]);
    const [availableParentsLoading, SetAvailableParentsLoading] = useState(true);

    useEffect(() => {
        const fetchParents = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/v1/skills/${skillId}/parents`);
                setActualParents(response.data.map((parent) => parent.name));
            } catch (error) {
                console.error("Error fetching parents: ", error);
            } finally {
                setActualParentsLoadings(false);
            }
        };

        const fetchAvailableParents = async () => {
            try {
                console.log("SKILL ID IS ", skillId);
                if (skillId == undefined) {
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
                SetAvailableParentsLoading(false);
            }
        }

        fetchParents();
        fetchAvailableParents();
    }, [skillId]);

    const handleAddParent = (parentName) => {
        const parentObj = availableParents.find((p) => p.name === parentName);
        if (parentObj) {
            setActualParents((actualParents) => {
                const newParents = [...actualParents, parentObj.name];
                parentOnChange(newParents);
                return newParents;
            });
            setAvailableParents(availableParents.filter((p) => p.name !== parentName));
        }
    };

    const handleRemoveParent = (parentName) => {
        setActualParents((actualParents) => {
            const newParents = actualParents.filter((p) => p !== parentName);
            parentOnChange(newParents);
            return newParents;
        });
        setAvailableParents([...availableParents, { name: parentName }]);
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
    SkillId: PropTypes.number,
    parentOnChange: PropTypes.func,
};

SkillParents.defaultProps = {
    SkillId: undefined,
    parentOnChange: (value) => { console.log(value); },
};

export default SkillParents;