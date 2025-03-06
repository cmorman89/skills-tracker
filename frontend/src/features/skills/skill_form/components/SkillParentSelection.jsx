import { faCircle } from "@fortawesome/free-solid-svg-icons";
import InputLabel from "../../../../components/input/form/InputLabel";
import FilterList from "../../skill_table/components/FilterList";
import { useState } from "react";

const skillParentSelection = ({ onChange, value }) => {
    const dummyList = [
        { name: "one" },
        { name: "two" },
        { name: "three" },
        { name: "four" },
        { name: "five" },
        { name: "six" },
        { name: "seven" },
        { name: "eight" },
        { name: "nine" },
        { name: "ten" },
        { name: "eleven" },
        { name: "twelve" },
        { name: "thirteen" },
        { name: "fourteen" },
        { name: "fifteen" },
        { name: "sixteen" },
        { name: "seventeen" },
        { name: "eighteen" },
        { name: "nineteen" },
        { name: "twenty" },
    ];
    const [currentParents, setCurrentParents] = useState([]);
    const [possibleParents, setPossibleParents] = useState([...dummyList]);
    const [currentParentFilter, setCurrentParentFilter] = useState("");
    const [possibleParentFilter, setPossibleParentFilter] = useState("");

    const handleAddParent = (parent) => {
        setCurrentParents((prevPossibleParents) => [...prevPossibleParents, parent]);
        setPossibleParents((prevCurrentParents) => prevCurrentParents.filter((item) => item.name !== parent.name));
    };


    const handleRemoveParent = (parent) => {
        setPossibleParents((prevPossibleParents) => [...prevPossibleParents, parent]);
        setCurrentParents((prevCurrentParents) => prevCurrentParents.filter((item) => item.name !== parent.name));
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