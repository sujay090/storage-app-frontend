import { useState } from "react";
import { RiPlugFill } from "react-icons/ri"
import ConnectionAppList from "./connectionAppList";

const ConnectWithOtherApp = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && <ConnectionAppList />}
            <button
                className="flex bg-[var(--bg-surface)] text-[var(--text-muted)] w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md items-center justify-center text-[1rem] sm:text-[1.1rem] transition-all border border-[var(--border-subtle)] hover:border-[#00d4ff] hover:text-[#00d4ff] mr-0 sm:mr-3"
                title="Connect Apps"
            >
                <RiPlugFill />
            </button>
        </div>
    )
}

export default ConnectWithOtherApp