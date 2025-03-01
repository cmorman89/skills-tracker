
import PropTypes from 'prop-types';

const Button = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="
            relative
            bg-fuchsia-700 hover:bg-fuchsia-600 
            text-gray-100 font-semibold
            shadow-lg hover:shadow-2xl
            translate-y-0 hover:-translate-y-1 
            p-4 
            rounded-xl
            ease-in-out duration-400
            cursor-pointer"
        >
            {text}
        </button>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Button;