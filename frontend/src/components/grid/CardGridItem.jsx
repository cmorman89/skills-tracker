import PropTypes from "prop-types";

const CardGridItem = ({ children }) => {
  return (
    <div
      className="
        flex flex-col
        items-center justify-center
        min-h-64 h-fill p-4
        bg-gradient-to-b from-pink-200 to-purple-200
        rounded-xl
        shadow-lg
        "
    >
      {children}
    </div>
  );
};

CardGridItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
CardGridItem.defaultProps = {
  children: null,
};
export default CardGridItem;
