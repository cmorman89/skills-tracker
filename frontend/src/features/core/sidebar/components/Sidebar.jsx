import { faAnglesLeft, faAnglesRight, faBuildingCircleArrowRight, faChartDiagram, faHome, faList, faPlus, faTableList } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./MenuItem";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import MenuGroup from "./MenuGroup";

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
        <div className={`${isCollapsed ? 'w-24' : 'w-56'} flex flex-col bg-gradient-to-br from-pink-800 to-fuchsia-800 text-neutral-300 shadow-xl ease-in-out duration-700`} >
            <div className="flex items-center justify-center">
                {/* <img
                    src="../logo.png"
                    alt="SkillTrack Logo"
                    className={`${isCollapsed ? 'w-16 my-4' : 'w-32 my-6'} h-auto ease-in-out duration-700 rotate`}
                /> */}
                <Logo isCollapsed={isCollapsed} isFullyCollapsed={isFullyCollapsed} />
            </div>
            <div className="flex flex-col flex-grow bg-black/25">
                {/* Home */}
                <MenuItem icon={faHome} label="Home" url="/" collapsed={isCollapsed} />
                {/* Skills */}
                <MenuGroup isCollapsed={isCollapsed} isFullyCollapsed={isFullyCollapsed}
                    parent={<MenuItem icon={faList} label="Skills" url="/skills/table" collapsed={isCollapsed} />}
                >
                    <MenuItem icon={faTableList} label="View Table" level={1} url="/skills/table" collapsed={isCollapsed} />
                    <MenuItem icon={faChartDiagram} label="View Tree" level={1} url="/skills/tree" collapsed={isCollapsed} />
                    <MenuItem icon={faPlus} label="Add New Skill" level={1} url="/skills/add" collapsed={isCollapsed} />
                </MenuGroup>
                {/* Sources */}
                <MenuItem icon={faBuildingCircleArrowRight} label="Sources" url="/" collapsed={isCollapsed} />
                <div
                    className={`flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${isCollapsed ? "opacity-0 scale-y-0" : "opacity-100 scale-y-100"
                        } origin-top ${isFullyCollapsed ? "h-0" : "h-auto"}`}
                >
                    <MenuItem icon={faPlus} label="Add Source" level={1}  url="/sources/add" collapsed={isCollapsed} />
                </div>
            {/* Bottom Menu */}
            <div className='flex flex-col mt-auto '>
                <MenuItem icon={isCollapsed ? faAnglesRight : faAnglesLeft} label="Shrink Menu" collapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
            </div>
            </div>

        </div>
    )
}

export default Sidebar;