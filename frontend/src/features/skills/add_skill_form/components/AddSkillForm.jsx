import { useState } from "react";
import PropTypes from "prop-types";
import Input from "../../../../components/input/form/Input";
import InputLabel from "../../../../components/input/form/InputLabel";
import Button from "../../../../components/input/button/Button";
import SkillNameInput from "./SkillNameInput";
import axios from "axios";

const AddSkillForm = ({ createMessage }) => {

    // Define the keys and initial values for the form data
    const initialFormData = {
        name: "",
        description: "",
        parents: [],
        mastery: 1,
        example: "",
        exampleList: [],
    }

    // Store the form data in the state
    const [formData, setFormData] = useState({ ...initialFormData });

    // Form functions
    const updateFormData = (key, value) => {
        setFormData({ ...formData, [key]: value });
    }
    const resetFormData = () => {
        setFormData({ ...initialFormData });
        console.log("Form data reset");
    }
    const handleSubmit = (e) => {
        // Prevent submitting the form via the browser
        e.preventDefault();

        const success = submitForm(formData);

        // Reset the form data if the form was submitted successfully
        if (success) {
            resetFormData();
        }
    }
    const disableFormEnterKey = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("Enter key suppressed");
        }
    }

    const submitForm = async (formData) => {
        const cachedFormData = { ...formData };
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/v1/skills/", formData);
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
                        value={formData.name}
                        onChange={updateFormData}
                    />
                    <div className="flex flex-col">
                        <InputLabel
                            label="Description"
                            name="description"
                        />
                        <Input
                            name="description"
                            onChange={updateFormData}
                            placeholder="Ex. A popular programming language that is used to create interactive websites."
                            type="text"
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