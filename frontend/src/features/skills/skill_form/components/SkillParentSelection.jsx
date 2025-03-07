import { faCircle } from "@fortawesome/free-solid-svg-icons";
import InputLabel from "../../../../components/input/form/InputLabel";
import FilterList from "../../skill_table/components/FilterList";
import { useEffect, useState } from "react";
import axios from "axios";

const skillParentSelection = ({ name, onChange, skill_id, value }) => {

    const [currentParents, setCurrentParents] = useState([]);
    const [possibleParents, setPossibleParents] = useState([]);
    const [currentParentFilter, setCurrentParentFilter] = useState("");
    const [possibleParentFilter, setPossibleParentFilter] = useState("");
    
    useEffect(() => {
        const fetchCurrentParents = async () => {
            if (skill_id) {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/api/v1/skills/${skill_id}/parents`);
                    const responseData = response.data;
                    if (response.status === 200) {
                        // Remove root skill from the list of possible parents
                        setCurrentParents(responseData.filter((item) => item.id !== 1));
                    } else {
                        console.log(responseData.error);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }   

        const fetchAvailableParents = async () => {
            try {
                const response = skill_id ?
                    await axios.get(`http://127.0.0.1:5000/api/v1/skills/${skill_id}/possible_parents`)
                    :
                    await axios.get(`http://127.0.0.1:5000/api/v1/skills/`);
                
                const responseData = response.data;
                if (response.status === 200) {
                    // Remove the root skill from the list of possible parents
                    setPossibleParents(responseData.filter((item) => item.id !== 1));
                } else {
                    console.log(responseData.error);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchCurrentParents();
        fetchAvailableParents();

    }, [skill_id]);

    useEffect(() => {
        onChange(name, currentParents);
    }, [currentParents]);

    const handleAddParent = (parent) => {
        setCurrentParents((prevCurrentParents) => 
            [...prevCurrentParents, parent].sort((a, b) => a.name.localeCompare(b.name))
        );
        setPossibleParents((prevPossibleParents) => 
            prevPossibleParents.filter((item) => item.name !== parent.name).sort((a, b) => a.name.localeCompare(b.name))
        );
    };

    const handleRemoveParent = (parent) => {
        setPossibleParents((prevPossibleParents) => 
            [...prevPossibleParents, parent].sort((a, b) => a.name.localeCompare(b.name))
        );
        setCurrentParents((prevCurrentParents) => 
            prevCurrentParents.filter((item) => item.name !== parent.name).sort((a, b) => a.name.localeCompare(b.name))
        );
    };


    return (
        <div className="flex flex-col">
            <InputLabel
                label="Add a Skill Parent"
                name="currentParents"
            />
            <FilterList 
                list={possibleParents}
                onChange={setPossibleParentFilter}
                onClick={handleAddParent}
                filterValue={possibleParentFilter}
            />

            <InputLabel
                label="Remove a Skill Parent"
                name="possibleParents"
            />
            <FilterList 
                list={currentParents}
                onChange={setCurrentParentFilter}
                onClick={handleRemoveParent}
                filterValue={currentParentFilter}
            />
        </div>
    )
}  

export default skillParentSelection;