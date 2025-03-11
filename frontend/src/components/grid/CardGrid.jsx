import PropTypes from "prop-types";
const CardGrid = ({ children, cols = 3 }) => {
  return (
    <div
      className={`
        grid grid-cols-${cols} 
        w-full gap-4
        `}
    >
      {children}
    </div>
  );
};
CardGrid.propTypes = {
  children: PropTypes.node.isRequired,
  cols: PropTypes.number,
};
CardGrid.defaultProps = {
  cols: 3,
};
export default CardGrid;
