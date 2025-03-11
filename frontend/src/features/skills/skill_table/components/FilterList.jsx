import Input from "../../../../components/input/form/Input";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SkillNode from "../../skill_tree/components/SkillNode";

const FilterList = ({ list, onChange, onClick, filterValue }) => {
  const [filteredList, setFilteredList] = useState([list]);

  const filterList = (filterValue) => {
    return list.filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  useEffect(() => {
    setFilteredList(filterList(filterValue));
  }, [filterValue, list]);

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
        {Array.isArray(filteredList) && filteredList.length > 0 ? (
          filteredList.map((item, i) => (
            <SkillNode
              key={i}
              icon={item.icon}
              onClick={() => onClick(item)}
              text={item.name}
            />
          ))
        ) : (
          <SkillNode
            dummy={true}
            icon={"faBan"}
            onClick={() => {}}
            text="No items found."
          />
        )}
      </div>
    </div>
  );
};

FilterList.propTypes = {
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};

export default FilterList;
