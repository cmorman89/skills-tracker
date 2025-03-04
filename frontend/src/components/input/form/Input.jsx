import PropTypes from 'prop-types';

const Input = ({ autoFocus = false, id, name, onChange, placeholder, type, value }) => {
    return (
        <div className="flex flex-col">
            <input
                autoComplete="off"
                aria-autocomplete='none'
                aria-haspopup='false'
                autoFocus={autoFocus}
                className="
                    bg-neutral-100
                    ring ring-pink-900 focus:ring-2 focus:ring-pink-600 outline-none
                    text-neutral-800 placeholder-neutral-400
                    translate-y-0 focus:-translate-y-1 hover:-translate-y-1
                    transition-all ease-in-out duration-700
                    shadow-md hover:shadow-xl
                    p-2 mt-1 
                    rounded-xl
                "
                id={id || name}
                name={name}
                onChange={(e) => onChange(name, e.target.value)}
                placeholder={placeholder}
                type={type}
                value={value}
            />
        </div>
    );
}

Input.propTypes = {
    autoFocus: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
}
Input.defaultProps = {
    autoFocus: false,
    onChange: (e) => { console.error(`no onChange passed to Input component with name: ${e.target.name}`) },
    placeholder: "",
    type: "text",
    value: "",
}

export default Input;