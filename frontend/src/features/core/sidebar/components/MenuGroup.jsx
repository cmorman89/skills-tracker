import PropTypes from 'prop-types';

const MenuGroup = ({ isCollapsed, isFullyCollapsed, parent, children }) => {
    return (
        <>
            {parent}
            <div
                className={`
                    flex flex-col overflow-hidden origin-top
                    transition-all duration-500 ease-in-out
                    ${isCollapsed ? "opacity-0 scale-y-0" : "opacity-100 scale-y-100"}
                    ${isFullyCollapsed ? "h-0" : "h-auto"}
                `}
            >
                {children}
            </div>
        </>
    );
}

MenuGroup.propTypes = {
    children: PropTypes.node.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    isFullyCollapsed: PropTypes.bool.isRequired,
    parent: PropTypes.node.isRequired
};

MenuGroup.defaultProps = {
    isCollapsed: false,
    isFullyCollapsed: false,
    parent: null
};

export default MenuGroup;
