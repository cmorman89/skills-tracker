import PropTypes from "prop-types";

const CardBlock = ({ children }) => {
  return (
    <div
      className="
        flex flex-col items-center justify-center 
        p-8
        min-h-32
        bg-white 
        rounded-3xl 
        shadow-xl"
    >
      {children}
    </div>
  );
};

CardBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
CardBlock.defaultProps = {
  children: null,
};
export default CardBlock;
