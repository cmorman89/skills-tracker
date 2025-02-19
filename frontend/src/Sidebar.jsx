import React from "react"


const Sidebar = () => {
    return (
        <aside className="fixed flex flex-col left-0 top-0 h-full w-64 bg-indigo-800 text-white p-6">
            <div className="flex items-center justify-center mb-8">
                <span 
                className="text-3xl font-bold text-white">SkillTrack</span>
            </div>
            <nav 
            className="flex flex-col flex-grow">
                <div>
                    <a
                        href="/"
                        className="block py-2 px-4 rounded hover:bg-indigo-700 transition duration-300">
                        <i className="fa-solid fa-home px-4"></i>
                        Home
                    </a>
                    <a
                        href="/skills"
                        className="block py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
                    >
                        <i className="fa-solid fa-list px-4"></i>
                        Skills
                    </a>
                    <a
                        href="/skills/add"
                        className="block py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
                    >
                        <i className="fa-solid fa-list px-4"></i>
                        Add a Skill
                    </a>
                    <a
                        href="/skills/tree"
                        className="block py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
                    >
                        <i className="fa-solid fa-indent px-4"></i>
                        Skill Tree
                    </a>
                    <a
                        href="/projects"
                        className="block py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
                    >
                        <i className="fa-solid fa-bars-progress px-4"></i>
                        Projects
                    </a>
                </div>
                <div 
                className="mt-auto">
                    <a
                        href="/about"
                        className="block py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
                    >
                        <i className="fa-solid fa-circle-info px-4"></i>
                        About
                    </a>
                    <a
                        href="/faq"
                        className="block py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
                    >
                        <i className="fa-solid fa-circle-question px-4"></i>
                        FAQ
                    </a>
                    <a
                        href="/settings"
                        className="block py-2 px-4 rounded hover:bg-indigo-700 transition duration-300 {% if request.path == '/settings' %}bg-indigo-700{% endif %}"
                    >
                        <i className="fa-solid fa-gear px-4"></i>
                        Settings
                    </a>
                    <a
                        href="/export"
                        className="block py-2 px-4 rounded hover:bg-indigo-700 transition duration-300 {% if request.path == '/export' %}bg-indigo-700{% endif %}"
                    >
                        <i className="fa-solid fa-download px-4"></i>
                        Export
                    </a>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;