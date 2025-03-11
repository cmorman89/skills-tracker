import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const SkillActionButton = ({ icon, onClick }) => {
  return (
    <div
      className="
            flex justify-center items-center 
            w-10 h-10
            text-lg
            text-neutral-100
            bg-pink-600 hover:bg-fuchsia-800
            rounded-full 
            shadow-md hover:shadow-xl
            translate-y-0 hover:-translate-y-1
            transition-transform duration-500 ease-in-out
            hover:cursor-pointer
            "
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

SkillActionButton.propTypes = {
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SkillActionButton;
