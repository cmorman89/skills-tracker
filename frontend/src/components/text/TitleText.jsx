import PropTypes from "prop-types";
import Divider from "./Divider";

const TitleText = ({ text, underline = false }) => {
  return (
    <div
      className={`flex flex-col w-full gap-2 ${underline ? "mb-4" : "mb-8"}`}
    >
      <h1 className="text-6xl font-bold font-inter text-gradient-accent self-start">
        {text}
      </h1>
      {underline ? <Divider fade="r" /> : null}
    </div>
  );
};

TitleText.propTypes = {
  text: PropTypes.string,
  underline: PropTypes.bool,
};
TitleText.defaultProps = {
  text: "No text provided.",
  underline: false,
};
export default TitleText;
