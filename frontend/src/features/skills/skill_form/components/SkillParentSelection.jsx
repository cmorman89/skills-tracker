import { faCircle } from "@fortawesome/free-solid-svg-icons";
import InputLabel from "../../../../components/input/form/InputLabel";
import FilterList from "../../skill_table/components/FilterList";
import { useState } from "react";

const skillParentSelection = ({ onChange, value }) => {
    const dummyList = [{name: "one", "icon": {faCircle}}, {name: "two"}, {name: "three"}];
    const [currentParents, setCurrentParents] = useState([...dummyList]);
    const [possibleParents, setPossibleParents] = useState([]);
    const [currentParentFilter, setCurrentParentFilter] = useState("");
    const [possibleParentFilter, setPossibleParentFilter] = useState("");

    return (
        <div className="flex flex-col">
            <InputLabel
                label="Add a Skill Parent"
                name="currentParents"
            />
            <FilterList 
                list={currentParents}
                onChange={setCurrentParentFilter}
                filterValue={currentParentFilter}
            />

            <InputLabel
                label="Remove a Skill Parent"
                name="possibleParents"
            />
            <FilterList 
                list={possibleParents}
                onChange={setPossibleParentFilter}
                filterValue={possibleParentFilter}
            />
        </div>
    )
}  

export default skillParentSelection;