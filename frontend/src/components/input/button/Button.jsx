
import PropTypes from 'prop-types';

const Button = ({ classNameAddition, label, onClick, type }) => {
    return (
        <button
            className={`
                bg-gradient-to-br from-pink-600 to-fuchsia-700
                text-fuchsia-50 hover:text-fuchsia-100
                text-sm font-semibold
                shadow-md hover:shadow-xl
                translate-y-0 hover:-translate-y-1 
                p-4 
                rounded-xl
                ease-in-out duration-700
                cursor-pointer
                ${classNameAddition}
            `}
            onClick={onClick}
            type={type}
        >
            {label}
        </button>
    );
}

Button.propTypes = {
    classNameAddition: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
}
Button.defaultProps = {
    classNameAddition: "",
    type: "button",
}

export default Button;