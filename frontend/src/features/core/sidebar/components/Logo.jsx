import PropTypes from 'prop-types';

const Logo = ({ isCollapsed, isFullyCollapsed }) => {
    return (
        <div
            className={`
                flex items-center justify-center
                ease-in-out duration-700
                ${isCollapsed ? 'w-16 my-4' : 'w-32 my-6'}
            `}
        >
            <div
                className="flex flex-col text-5xl items-center">
                <div className='flex items-baseline'>
                    <div
                        className={`
                            font-geist font-semibold
                            origin-right transform overflow-hidden
                            ease-in-out duration-400 transition-all
                            ${isCollapsed ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
                            ${isCollapsed ? 'translate-x-full' : 'translate-x-0'}
                            ${isCollapsed ? "w-0" : "w-auto"}
                        `}
                    >
                        Sk
                    </div>
                    <div
                        className={`
                            font-semibold
                            -rotate-90 relative
                            ease-in-out duration-200 transition-all
                            ${isCollapsed ? 'text-8xl' : ''}
                            ${isCollapsed ? 'top-0 left-0' : 'top-0.5 left-1'}
                        `}
                    >
                        ill
                    </div>
                </div>
                <div
                    className={`
                            font-geist font-light
                            origin-top transform overflow-hidden
                            ease-in-out duration-200 transition-all
                            ${isCollapsed ? 'opacity-0' : 'opacity-100'}
                            ${isCollapsed ? '-translate-y-full translate-x-full' : 'translate-y-0 translate-x-0'}
                            ${isCollapsed ? "h-0 w-0 scale-y-0" : "h-auto w-auto scale-y-100"}
                        `}
                >
                    Atlas
                </div>
            </div>
        </div >
    );
}



export default Logo;
