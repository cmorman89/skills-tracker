import { faBuildingCircleArrowRight, faCaretDown, faCaretUp, faHome, faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./MenuItem";
import { useEffect, useState } from "react";

const Sidebar = () => {

    const [isCollapsed, setIsCollapsed] = useState();
    const [isFullyCollapsed, setIsFullyCollapsed] = useState(false); // Tracks when h-0 should be applied

    useEffect(() => {
        if (isCollapsed) {
            const timeout = setTimeout(() => setIsFullyCollapsed(true), 500); // Match duration-500
            return () => clearTimeout(timeout);
        } else {
            setIsFullyCollapsed(false); // Reset immediately when expanding
        }
    }, [isCollapsed]);

    return (
        // Create the main sidebar container
        <div className={`${isCollapsed ? 'w-24' : 'w-56'} flex flex-col bg-gradient-to-br from-purple-800 to-pink-800 py-8 text-neutral-300 shadow-xl ease-in-out duration-700`} >
            <div className="flex items-center justify-center">
                <img
                    src="../logo.png"
                    alt="SkillTrack Logo"
                    className={`${isCollapsed ? 'w-16 mb-4' : 'w-32 mb-6'} h-auto ease-in-out duration-700`}
                />
            </div>


            <MenuItem icon={faHome} label="Home" url="/" collapsed={isCollapsed} />
            <MenuItem icon={faList} label="Skills" url="/" collapsed={isCollapsed} />
            <MenuItem icon={faBuildingCircleArrowRight} label="Sources" url="/" collapsed={isCollapsed} />
            <div
                className={`flex flex-col pl-4 overflow-hidden transition-all duration-500 ease-in-out ${isCollapsed ? "opacity-0 scale-y-0" : "opacity-100 scale-y-100"
                    } origin-top ${isFullyCollapsed ? "h-0" : "h-auto"}`} // Apply h-0 only after animation
            >
                <MenuItem icon={faPlus} label="Add Skill" url="/skills/add" collapsed={isCollapsed} />
                <MenuItem icon={faPlus} label="Add Source" url="/sources/add" collapsed={isCollapsed} />
            </div>
            <MenuItem icon={isCollapsed ? faCaretUp : faCaretDown} label="Collapse" collapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />

        </div>
    )
}

export default Sidebar;