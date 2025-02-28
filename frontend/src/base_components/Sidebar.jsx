import "react"


const Sidebar = () => {
    return (
        <aside className="fixed flex flex-col left-0 top-0 h-full w-64 bg-transparent text-white p-6">
            <div className="flex items-center justify-center mb-8">
                <span
                    className="text-3xl font-bold text-white">SkillTrack</span>
            </div>
            <nav
                className="flex flex-col flex-grow">
                <div>
                    <a
                        href="/"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300">
                        <i className="fa-solid fa-home px-4"></i>
                        Home
                    </a>

                    <div className="block mb-1 mt-4 pb-1 text-center justify-self-center text-slate-500/70 w-4/5 border-b border-slate-600/50 mx-auto">
                        Skill Views
                    </div>
                    <a
                        href="/skills"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300"
                    >
                        <i className="fa-solid fa-list px-4"></i>
                        Skill Table
                    </a>
                    <a
                        href="/skills/tree"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300"
                    >
                        <i className="fa-solid fa-sitemap px-4"></i>
                        Skill Tree
                    </a>
                    <a
                        href="/skills"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300"
                    >
                        <i className="fa-regular fa-rectangle-list px-4"></i>
                        Skill View
                    </a>

                    <div className="block mb-1 mt-6 pb-1 text-center justify-self-center text-slate-500/70 w-3/4 border-b border-slate-600/50 mx-auto">
                        Manage Skills
                    </div>
                    <a
                        href="/skills/add"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300"
                    >
                        <i className="fa-solid fa-plus px-4"></i>
                        Add a Skill
                    </a>

                    <div className="block mb-1 mt-6 pb-1 text-center justify-self-center text-slate-500/70 w-3/4 border-b border-slate-600/50 mx-auto">
                        Manage Sources
                    </div>
                    <a
                        href="/sources"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300"
                    >
                        <i className="fa-solid fa-building-circle-arrow-right px-4"></i>
                        Sources
                    </a>
                    <a
                        href="/sources/add"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300"
                    >
                        <i className="fa-solid fa-plus px-4"></i>
                        Add a Source
                    </a>


{/* 
                    <div className="block mb-1 mt-6 pb-1 text-center justify-self-center text-slate-500/70 w-3/4 border-b border-slate-600/50 mx-auto">
                        Manage Examples
                    </div>

                    <a
                        href="/examples"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300"
                    >
                        <i className="fa-solid fa-diagram-project px-4"></i>
                        Examples
                    </a>
                    <a
                        href="/examples/add"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300"
                    >
                        <i className="fa-solid fa-plus px-4"></i>
                        Add an Example
                    </a> */}
                </div>
                <div className="mt-auto">
                    <div className="block mb-1 mt-4 pb-1 text-center justify-self-center text-slate-500/70 w-4/5 border-b border-slate-600/50 mx-auto">
                        Options
                    </div>
                    <a
                        href="/about"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300"
                    >
                        <i className="fa-solid fa-circle-info px-4"></i>
                        About
                    </a>
                    <a
                        href="/faq"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300"
                    >
                        <i className="fa-solid fa-circle-question px-4"></i>
                        FAQ
                    </a>
                    <a
                        href="/settings"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300 {% if request.path == '/settings' %}bg-sky-700{% endif %}"
                    >
                        <i className="fa-solid fa-gear px-4"></i>
                        Settings
                    </a>
                    <a
                        href="/export"
                        className="block py-2 px-4 rounded hover:bg-sky-700 transition duration-300 {% if request.path == '/export' %}bg-sky-700{% endif %}"
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