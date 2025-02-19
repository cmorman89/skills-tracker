import React from "react";

const SkillForm = () => {
    return (
        <div className="flex flex-col flex-grow p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Create a New Skill</h1>
            <form>
                <div className="mb-4">
                    <label
                        htmlFor="skillName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Skill Name
                    </label>
                    <input
                        type="text"
                        id="skillName"
                        name="skillName"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter skill name"
                    />

                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Skill Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter a description of the skill (optional)."
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="parentSkills"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Parent Skills    
                    </label>
                    <select
                        id="parentSkills"
                        name="parentSkills"
                        multiple
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="1">Skill 1</option>
                        <option value="2">Skill 2</option>
                        <option value="3">Skill 3</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        Hold Ctrl to select multiple parents.
                    </p>
                </div>
                <div className="mb-4 flex flex-col flex-grow">
                    <label
                        htmlFor="examples"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Examples
                    </label>
                    <div className="flex items-center justify-center">
                        <select
                            className="mt-1 mr-2 block w-fit p-2 border border-gray-300 rounded-md shadow-sm"
                            name="exampleSource"
                        >
                            <option value="None">No Source</option>
                        </select>
                        <input
                            type="text"
                            className="mt-1 mr-2 block flex-grow p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="More info (optional)"
                        />

                        <button
                            type="button"
                            className="block mt-1 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none"
                        >
                            +
                        </button>
                    </div>
                    <button
                            type="button"
                            className="block mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none justify-self-right"
                        >
                            Add another source [+]
                    </button>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="mastery"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Mastery Level
                    </label>
                    <div className="flex mt-1 mx-1 justify-between text-gray-500">
                        <small>Beginner</small>
                        <small>Expert</small>
                    </div>
                    <input
                        type="range"
                        id="masery"
                        min="1"
                        max="5"
                        step="1"
                        className="mt-1 block w-full"
                    >
                    </input>
                    <div className="flex mt-1 mx-1 justify-between text-gray-500">
                        <small>1</small>
                        <small>2</small>
                        <small>3</small>
                        <small>4</small>
                        <small>5</small>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        Adjust the slider from 1-5
                    </p>
                </div>
                <div className="pt-4 mb-4 flex flex-col flex-grow">
                    <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none"
                    >
                    Save Skill
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SkillForm;
