import PropTypes from "prop-types";

const BodyBlock = ({ children }) => {
  return (
    <div
      className="
            flex flex-col items-center justify-center
            rounded-2xl shadow-inner
            w-full h-full p-8
            border border-pink-100
            bg-slate-100/50
            "
    >
      {children}
    </div>
  );
};
BodyBlock.propTypes = {
  children: PropTypes.node.isRequired,
};
export default BodyBlock;