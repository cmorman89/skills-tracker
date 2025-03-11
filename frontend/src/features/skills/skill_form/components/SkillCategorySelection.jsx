import axios from "axios";
import PropTypes from "prop-types";
import { use, useEffect, useState } from "react";
("@fortawesome/react-fontawesome");
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import InputLabel from "../../../../components/input/form/InputLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SkillCategorySelection = ({ onChange, value }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [iconComponent, setIconComponent] = useState(solidIcons["faList"]);

  useEffect(() => {
    const sortCategories = (categories) => {
      return categories.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    };
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/v1/categories/"
        );
        const responseData = response.data;
        if (response.status === 200) {
          setCategoryOptions(sortCategories(responseData));
        } else {
          console.error(responseData.error);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!loading && categoryOptions[value]) {
      const icon = categoryOptions[value - 1].icon;
      setIconComponent(solidIcons[icon]);
    } else {
      setIconComponent(solidIcons["faList"]);
    }
  }, [loading, categoryOptions, value]);

  return (
    <div className="flex flex-col justify-between pt-6">
      <div
        className="
            flex flex-col items-center
            rounded-2xl
            shadow-md hover:shadow-xl
            p-4 w-fit h-full
            gradient-accent text-white
        "
      >
        <FontAwesomeIcon icon={iconComponent} className="text-9xl mb-2" />
        <div className="flex w-full">
          <InputLabel htmlFor="category" variant="light">
            Category
          </InputLabel>
        </div>
        <select
          name="category"
          id="category"
          className={`
                    bg-neutral-100/50
                    ring ring-pink-900 focus:ring-2 focus:ring-pink-600 outline-none
                    
                    ${value == "" ? "text-neutral-400" : "text-neutral-800"}
                    placeholder-neutral-400
                    translate-y-0 focus:-translate-y-1 hover:-translate-y-1
                    transition-all ease-in-out duration-700
                    shadow-md hover:shadow-xl
                    p-2 mt-1
                    rounded-xl h-10
                    overflow-hidden 
                `}
          value={value}
          onChange={(e) => onChange("category", e.target.value)}
        >
          <option value="">No category</option>
          {loading ? (
            <option value="">Loading...</option>
          ) : (
            categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
};

SkillCategorySelection.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

SkillCategorySelection.defaultProps = {
  value: "",
};

export default SkillCategorySelection;
