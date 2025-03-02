import { useState } from "react";
import PropTypes from "prop-types";
import Input from "../../../components/input/form/Input";
import InputLabel from "../../../components/input/form/InputLabel";
import Button from "../../../components/input/button/Button";
import SkillNameInput from "./SkillNameInput";

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
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        // On Success
        createMessage("Skill added successfully", "success");
        resetFormData();
    }
    const disableFormEnterKey = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("Enter key suppressed");
        }
    }
    return (
        <div>
            <form onKeyDown={disableFormEnterKey} onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 mx-8">
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
                            autoFocus={true}
                            name="description"
                            onChange={updateFormData}
                            placeholder="Ex. A popular programming language that is used to create interactive websites."
                            type="text"
                            value={formData.description}
                        />
                    </div>
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