import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ collapsed, icon, label, level, onClick, url }) => {
    useEffect(() => {
    }, [collapsed]);

    // If onClick is provided, use it; otherwise, default to navigating to the url
    const navigate = useNavigate();
    const handleClick = onClick || (() => navigate(url));

    const getIndent = () => {
        const indent = level ? `left-${level * 4}` : ''; 
        console.log(indent);
        return indent;
    }

    return (
        <div
            className={`transition-all relative flex gap-2 cursor-pointer border-t border-b border-transparent hover:border-pink-300/80 hover:bg-pink-500/50 hover:shadow-lg py-4 px-8 ease-in-out duration-400`}
            onClick={handleClick}
        >
            <div className="hidden left-0 left-4 left-8">
                {/* // TODO Fix: Add Utility Classes to Tailwind Always Load Area */}
            </div>
            <div className={`transition-all text-xl ease-in-out duration-400 relative ${getIndent()}`}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <span className={`transition-all block text-lg top-0.5 whitespace-nowrap relative ${getIndent()} ${collapsed ? 'opacity-0 ' : 'opacity-100 '} ease-in-out duration-400`}>
                {label}
            </span>
        </div>
    );
};

MenuItem.propTypes = {
    collapsed: PropTypes.bool,
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    level: PropTypes.number,
    url: PropTypes.string,
    onClick: PropTypes.func,

};
MenuItem.defaultProps = {
    collapsed: false,
    level: 0,
    url: '/'
};
export default MenuItem;