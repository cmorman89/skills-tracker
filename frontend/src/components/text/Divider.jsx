import PropTypes from "prop-types";

const Divider = ({ fade = "none" }) => {
  return (
    <div
      className={`
                my-4 h-px
                ${
                  fade === "none"
                    ? "bg-pink-700"
                    : "bg-gradient-to-" + fade + " from-pink-700 to-transparent"
                }
            `}
    ></div>
  );
};

Divider.propTypes = {
  fade: PropTypes.oneOf(["l", "r", "none"]),
};
Divider.defaultProps = {
  fade: "none",
};
export default Divider;
