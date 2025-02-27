import { useEffect, useState } from "react";
import axios from "axios"; import Divider from "../../form_components/style/Divider";
import TextInput from "../../form_components/input/TextInput";
import TextArea from "../../form_components/input/TextArea";
;

const SourceAddForm = () => {
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const [nameUnique, setNameUnique] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "",
    });

    const onChange = (key, value) => {

        setMsg(`Key: ${key}, Value: ${value}`);
        setFormData({ ...formData, [key]: value });
    }


    useEffect(() => {

        const validateNameUnique = async (name) => {
            if (name !== "") {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/api/v1/sources/${name}`);
                    const data = response.data;
                    if (data) {
                        setNameUnique(false);
                        setMsgType("error");
                        setMsg("Source name already exists");
                        return false;
                    }
                    setNameUnique(true);
                    setMsgType("success");
                    setMsg("Source name is unique");
                    return true;
                } catch (error) {
                    console.error("Error validating name uniqueness: ", error);
                    setNameUnique(false);
                    setMsgType("error");
                    setMsg("Error accessing the server");
                    return false;
                }
            }
        }

        validateNameUnique(formData.name)
    }, [formData.name]);

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            type: "",
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/v1/sources/", formData)
            const data = response.data;
            if (data.error) {
                setMsgType("error");
                setMsg(data.error);
            } else {
                setMsgType("success");
                setMsg("New Source added completed successfully");
            }
        } catch (error) {
            console.error("Error submitting source: ", error);
        }

        // Reset form data
        setFormData({
            name: "",
            description: "",
            type: "",
        });

    }

    return (
        // Build card structure for the form
        <div className="flex flex-grow w-auto max-w-4xl mx-auto items-center justify-center p-2 bg-slate-400/40 rounded-2xl shadow-xl inset-shadow-lg inset-shadow-white">
            <div className="flex flex-col flex-grow p-6 max-w-4xl mx-auto bg-slate-800/80 text-slate-300 inset-shadow-lg inset-shadow-white rounded-lg">
                {/* Message */}
                {msg && (
                    <div
                        className={`text-sm p-2 mb-4 rounded-md ${msgType === "error" ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"
                            }`}
                    >
                        {msg}
                    </div>
                )}
                {/* Form Heading */}
                <h1 className="text-2xl font-bold text-sky-200">Create a New Source</h1>
                <Divider />

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-grow w-full gap-4">
                        <div className="w-full flex flex-col flex-grow">
                            <TextInput
                                label="Source Name"
                                placeholder="Enter the source name"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={onChange} // Log the value to the console
                            />
                            {!nameUnique && formData.name && <small className='text-orange-400 pl-0.5 mt-0.5 italic'>Error: Duplicate source name.</small>}
                        </div>
                        <div className="w-1/4">
                            <TextInput
                                label="Type"
                                placeholder="Work, etc."
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={onChange} // Log the value to the console
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <TextArea
                            label="Source Description"
                            placeholder="Enter the source description"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={onChange} // Log the value to the console
                        />
                    </div>
                    <Divider />

                    {/* Submit Button */}
                    <div className="pt-4 mb-4 flex flex-col flex-grow">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-teal-500/20 text-white rounded-md shadow-lg hover:bg-teal-500/30 focus:outline-none"
                        >
                            Create Source
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SourceAddForm;