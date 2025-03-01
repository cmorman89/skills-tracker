import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const MenuItem = ({ collapsed, icon, label, url, onClick }) => {
    useEffect(() => {
    }, [collapsed]);

    // If onClick is provided, use it; otherwise, default to navigating to the url
    const handleClick = onClick || (() => window.location.href = url);

    return (
        <div
            className={`transition-all relative flex gap-2 cursor-pointer border border-transparent hover:border-pink-300/20 hover:bg-pink-500/20 hover:shadow-lg py-4 px-8 rounded ease-in-out duration-400`}
            onClick={handleClick}
        >
            <div className="transition-all text-xl ease-in-out duration-400">
                <FontAwesomeIcon icon={icon} />
            </div>
            <span className={`transition-all mt-1 block text-lg whitespace-nowrap ${collapsed ? 'opacity-0 ' : 'opacity-100 '} ease-in-out duration-400`}>
                {label}
            </span>
        </div>
    );
};

MenuItem.propTypes = {
    collapsed: PropTypes.bool,
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string,
    onClick: PropTypes.func,

};
MenuItem.defaultProps = {
    collapsed: false,
    url: '/'
};
export default MenuItem;