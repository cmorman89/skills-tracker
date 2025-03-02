const InputLabel = ({ label, name }) => {
    return (
        <label htmlFor={name} className="font-semibold text-fuchsia-800">
            {label}
        </label>
    );
}

export default InputLabel;