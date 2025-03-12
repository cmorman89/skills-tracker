import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InputLabel from "../../../../components/input/form/InputLabel";
import Button from "../../../../components/input/button/Button";
import SkillNameInput from "./SkillNameInput";
import axios from "axios";
import TextArea from "../../../../components/input/form/TextArea";
import { useParams } from "react-router-dom";
import SkillParentSelection from "./SkillParentSelection";
import CardBlock from "../../../../components/block/CardBlock";
import TitleText from "../../../../components/text/TitleText";
import Divider from "../../../../components/text/Divider";
import SkillCategorySelection from "./SkillCategorySelection";

const SkillForm = ({ createMessage }) => {
  // Get the skill_id from the URL params if it exists
  const { skill_id } = useParams();

  // Define the keys and initial values for the form data
  const initialFormData = {
    name: "",
    category_id: "",
    description: "",
    example: "",
    exampleList: [],
    mastery: 1,
    parents: [],
  };
  // Define the state variables
  const [isEditing, setIsEditing] = useState(false);
  const [originalSkillData, setOriginalSkillData] = useState({});
  const [formData, setFormData] = useState({ ...initialFormData });
  // Fetch the skill data if we are editing a skill
  useEffect(() => {
    if (skill_id) {
      setIsEditing(true);
      const fetchSkill = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:5000/api/v1/skills/${skill_id}`
          );
          const responseData = response.data;
          if (response.status === 200) {
            console.log(responseData);
            setFormData({ ...responseData });
            setOriginalSkillData({ ...responseData });
          } else {
            createMessage(responseData.error, "error");
          }
        } catch (error) {
          createMessage(error.message, "error");
        }
      };
      fetchSkill();
    }
  }, []);

  // Form functions
  // Update a key/value pair
  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
    console.log(`Form data updated ${key}: ${value}`);
  };
  // Clear the form data
  const resetFormData = () => {
    setFormData({ ...initialFormData });
    console.log("Form data reset");
  };
  // Process form submission and check if successful
  const handleSubmit = (e) => {
    // Prevent submitting the form via the browser
    e.preventDefault();
    const success = submitForm(formData);
    // Reset the form data if the form was submitted successfully
    if (success && !isEditing) {
      resetFormData();
    }
  };
  // Prevent accidental form submission on Enter key
  const disableFormEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("Enter key suppressed");
    }
  };
  // Submit the form data to the API
  const submitForm = async (formData) => {
    const API_URL = skill_id
      ? `http://127.0.0.1:5000/api/v1/skills/${skill_id}`
      : "http://127.0.0.1:5000/api/v1/skills/";
    const cachedFormData = { ...formData };
    try {
      const response = isEditing
        ? await axios.put(API_URL, formData)
        : await axios.post(API_URL, formData);
      const responseData = await response.data;
      if (response.status == 200) {
        const msg = isEditing
          ? "Skill updated successfully"
          : "Skill added successfully";
        createMessage(msg, "success");
        return true;
      } else {
        createMessage(responseData.error, "error");
      }
    } catch (error) {
      if (error.response) {
        // Bad request or other error
        createMessage(
          error.response.data.error || "An unknown error occurred",
          "error"
        );
      } else {
        // Network error or other issue
        createMessage(error.message, "error");
      }
    }

    setFormData(cachedFormData);
    return false;
  };

  return (
    <CardBlock>
      <TitleText text={isEditing ? "Edit Skill" : "Add Skill"} />
      <form
        onKeyDown={disableFormEnterKey}
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4 mx-8"
      >
        <div className="flex gap-4">
          <div className="flex flex-col w-4/5">
            <SkillNameInput
              onChange={updateFormData}
              originalValue={originalSkillData.name}
              value={formData.name}
            />
            <div className="flex flex-col">
              <InputLabel label="Description" name="description" />
              <TextArea
                name="description"
                onChange={updateFormData}
                placeholder="Ex. A popular programming language that is used to create interactive websites."
                rows="5"
                value={formData.description}
              />
            </div>
          </div>
          <div className="flex ">
            <SkillCategorySelection
              onChange={updateFormData}
              value={formData.category_id}
            />

          </div>
        </div>

        <Divider />
        <SkillParentSelection
          name="parents"
          onChange={updateFormData}
          skill_id={skill_id ? skill_id : null}
          value={formData.parents}
        />

        <div className="divider"></div>
        <Button
          label={isEditing ? "Save Changes" : "Create New Skill"}
          type="submit"
        />
      </form>
    </CardBlock>
  );
};

SkillForm.propTypes = {
  createMessage: PropTypes.func.isRequired,
};

export default SkillForm;
