import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
const SkillParent = ({ dummy, icon, onClick, text }) => {
    return (
        <div
            className={`
                flex
                items-center justify-center
                p-3
                rounded-full
                border border-cyan-500
                bg-gradient-to-br
                from-cyan-300 to-cyan-500
                ${dummy ? 'hover:cursor-default' : 'hover:cursor-pointer'}
                shadow-md hover:shadow-xl
                translate-y-0 hover:-translate-y-1
                transition-transform duration-500 ease-in-out
                text-cyan-950/80 text-sm font-bold
            `}
            onClick={onClick}
        >
            {
                icon ?
                    <FontAwesomeIcon icon={icon} className="mr-2" />
                    :
                    ""
            }
            {text}
        </div>
    );
}

SkillParent.propTypes = {
    dummy: PropTypes.bool,
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}
SkillParent.defaultProps = {
    dummy: false
}
export default SkillParent;