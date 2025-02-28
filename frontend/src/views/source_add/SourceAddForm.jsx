import { useEffect, useState } from "react";
import axios from "axios"; import Divider from "../../form_components/style/Divider";
import TextInput from "../../form_components/input/TextInput";
import TextArea from "../../form_components/input/TextArea";
import SourceExample from "../../form_components/source_form/SourceExample";
import SourceExampleList from "../../form_components/source_form/SourceExampleList";
;

const SourceAddForm = () => {
    const [msgType, setMsgType] = useState("");
    const [msg, setMsg] = useState("");
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nameUnique, setNameUnique] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "",
        example: "",
        exampleList: [],
    });

    const onChange = (key, value) => {

        setMsg(`Key: ${key}, Value: ${value}`);
        setFormData({ ...formData, [key]: value });
    }
    const handleExampleOnChange = (value) => {
        setFormData({ ...formData, example: value });
    }

    const handleExampleListOnChange = (value, index) => {
        const updatedExampleList = [...formData.exampleList];
        updatedExampleList[index] = value;
        setFormData({ ...formData, exampleList: updatedExampleList });
    }
    const handleAddExample = () => {
        if (formData.example.trim() === "") {
            return;
        }
        const updatedExampleList = [...formData.exampleList, formData.example];
        setFormData({ ...formData, exampleList: updatedExampleList, example: "" });
        console.log("Example added: ", formData.example);
    }

    const handleRemoveExample = (index) => {
        const updatedExampleList = formData.exampleList.filter((_, i) => i !== index);
        setFormData({ ...formData, exampleList: updatedExampleList });
        return;
    }
    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get("http://127.0.1:5000/api/v1/sources/types");
                const data = response.data;
                console.log("Types: ", data);
                setTypes(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching types: ", error);
                setMsgType("error");
                setMsg("Error fetching types from the server");
                setLoading(false);
            }
        };
        fetchTypes();
    }, []);


    useEffect(() => {

        const validateNameUnique = async (name) => {
            if (name !== "") {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/api/v1/sources/name/${name}`);
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
            example: "",
            exampleList: [],
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
        } finally {
            resetForm();
        }

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
                            <div className='flex flex-col flex-grow w-full'>
                                <label htmlFor="type" className="block text-sm font-medium text-slate-300">
                                    Source Type
                                </label>
                                <select
                                    className="mt-1 block w-full p-2 border border-slate-600 rounded-md shadow-lg bg-slate-900/40"
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={(e) => onChange(e.target.name, e.target.value)}
                                >

                                    <option
                                        className="text-slate-700"
                                        value=""
                                        disabled
                                    >
                                        Select Type
                                    </option>
                                    {
                                        loading ?
                                            console.log("Loading: ", loading, "Types", types)

                                            :
                                            console.log("Loading: ", loading, "Types", types)
                                    }
                                    {
                                        loading ?
                                            <option>Loading...</option>
                                            :
                                            (
                                                types.map((type) => (
                                                    <option
                                                        className="text-slate-700"
                                                        key={type.id}
                                                        value={type.id}
                                                    >
                                                        {type.name}
                                                    </option>
                                                ))
                                            )
                                    }


                                </select>
                            </div>
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

                    {/* Source Example */}
                    <SourceExample
                        exampleList={formData.exampleList}
                        onChange={handleExampleOnChange}
                        onClick={handleAddExample}
                        value={formData.example}
                    />
                    <SourceExampleList
                        exampleList={formData.exampleList}
                        onChange={handleExampleListOnChange}
                        onClick={handleRemoveExample}
                    />
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