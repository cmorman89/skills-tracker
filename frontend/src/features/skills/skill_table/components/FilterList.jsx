import Input from "../../../../components/input/form/Input";
import PropTypes from "prop-types";
import SkillParent from "./SkillParent";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const FilterList = ({ list, onChange, onClick, filterValue }) => {
    
    const [filteredList, setFilteredList] = useState([list]);

    const filterList = (filterValue) => {
        console.log(filterValue);
        const new_list = list.filter((item) => item.name.toLowerCase().includes(filterValue.toLowerCase()));
        console.log(new_list);
        return new_list;
    }

    useEffect(() => {
        setFilteredList(filterList(filterValue));
    }
    , [filterValue]);
        
    return (
        <div>
            <Input
                onChange={onChange}
                placeholder="Search for a skill"
                type="search"
                value={filterValue}
            />
            <div
                className="
                    flex flex-wrap justify-center items-center
                    mt-4 gap-2
                    "
            >
                {
                    (Array.isArray(filteredList) && filteredList.length > 0) ? 
                        filteredList.map((item, i) => (
                            <SkillParent
                                key={i}
                                icon={item.icon}
                                onClick={() => onClick(item)}
                                text={item.name}
                                />
                        ))
                        :
                        <SkillParent
                            icon={faBan}
                            onClick={() => {}}
                            text="No items found."
                        />
                }
            </div>
        </div>
    );
}

FilterList.propTypes = {
    list: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    filterValue: PropTypes.string.isRequired
}

export default FilterList;