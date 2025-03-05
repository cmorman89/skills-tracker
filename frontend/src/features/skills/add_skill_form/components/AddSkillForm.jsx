import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Input from "../../../../components/input/form/Input";
import InputLabel from "../../../../components/input/form/InputLabel";
import Button from "../../../../components/input/button/Button";
import SkillNameInput from "./SkillNameInput";
import axios from "axios";
import TextArea from "../../../../components/input/form/TextArea";
import { useParams } from "react-router-dom";

const AddSkillForm = ({ createMessage }) => {
    // Get the skill_id from the URL params if it exists
    const { skill_id } = useParams();
    
    
    // Define the keys and initial values for the form data
    const initialFormData = {
        name: "",
        description: "",
        parents: [],
        mastery: 1,
        example: "",
        exampleList: [],
    }
    const [isEditing, setIsEditing] = useState(false);
    const [originalSkillData, setOriginalSkillData] = useState({});
    const [formData, setFormData] = useState({ ...initialFormData });
    // Store the form data in the state
    // Fetch the skill data if we are editing a skill
    useEffect(() => {
        if (skill_id) {
            setIsEditing(true);
            const fetchSkill = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/api/v1/skills/${skill_id}`);
                    const responseData = response.data;
                    if (response.status === 200) {
                        setFormData({ ...responseData });
                        setOriginalSkillData({ ...responseData });
                    } else {
                        createMessage(responseData.error, "error");
                    }
                } catch (error) {
                    createMessage(error.message, "error");
                }
            }
            fetchSkill();
        }
    }, []);


    // Form functions
    // Update a key/value pair
    const updateFormData = (key, value) => {
        setFormData({ ...formData, [key]: value });
    }
    // Clear the form data
    const resetFormData = () => {
        setFormData({ ...initialFormData });
        console.log("Form data reset");
    }
    // Process form submission and check if successful
    const handleSubmit = (e) => {
        // Prevent submitting the form via the browser
        e.preventDefault();
        const success = submitForm(formData);
        // Reset the form data if the form was submitted successfully
        if (success) {
            resetFormData();
        }
    }
    // Prevent accidental form submission on Enter key
    const disableFormEnterKey = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("Enter key suppressed");
        }
    }
    // Submit the form data to the API
    const submitForm = async (formData) => {
        const API_URL = skill_id ? `http://127.0.0.1:5000/api/v1/skills/${skill_id}/` : "http://127.0.0,1:5000/api/v1/skills/";
        const cachedFormData = { ...formData };
        try {
            const response = await axios.post(API_URL, formData);
            const responseData = response.data;
            if (response.status == 200) {
                createMessage("Skill added successfully", "success");
                return true;
            } else {
                createMessage(responseData.error, "error");
            }
        } catch (error) {
            if (error.response) {
                // Bad request or other error
                createMessage(error.response.data.error || "An unknown error occurred", "error");
            } else {
                // Network error or other issue
                createMessage(error.message, "error");
            }
        }

        setFormData(cachedFormData);
        return false;

    };

    return (
        <div>
            <form onKeyDown={disableFormEnterKey} onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 mx-8">
                    <div className="divider"></div>
                    <SkillNameInput
                        onChange={updateFormData}
                        originalValue={originalSkillData.name}
                        value={formData.name}
                    />
                    <div className="flex flex-col">
                        <InputLabel
                            label="Description"
                            name="description"
                        />
                        <TextArea
                            name="description"
                            onChange={updateFormData}
                            placeholder="Ex. A popular programming language that is used to create interactive websites."
                            rows="4"
                            value={formData.description}
                        />
                    </div>

                    <div className="divider"></div>

                    <Button
                        label="Add Skill"
                        type="submit"
                    />
                </div>
            </form>
        </div >
    );
}

AddSkillForm.propTypes = {
    createMessage: PropTypes.func.isRequired,
}

export default AddSkillForm;