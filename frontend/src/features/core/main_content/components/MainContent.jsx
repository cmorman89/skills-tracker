import PropTypes from "prop-types";

const MainContent = ({ children, pageTitle }) => {
  return (
    <div
      className="
        flex flex-col flex-grow
        bg-gradient-to-b from-neutral-200 to-fuchsia-100
        p-8 gap-8
        "
    >
      {children}
    </div>
  );
};

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string,
};
MainContent.defaultProps = {
  pageTitle: "Page Title",
};
export default MainContent;
