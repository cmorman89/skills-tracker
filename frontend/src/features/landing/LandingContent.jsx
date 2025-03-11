import CardBlock from "../../components/block/CardBlock";
import ColorBlock from "../../components/block/ColorBlock";
import CardGrid from "../../components/grid/CardGrid";
import CardGridItem from "../../components/grid/CardGridItem";
import TitleText from "../../components/text/TitleText";

const LandingContent = () => {
  return (
    <div className="flex flex-col gap-8">
      <ColorBlock />
      <CardBlock>
        <TitleText text="Choose an option:" />
        <CardGrid>
          <CardGridItem>
            <p>One</p>
            <p>One</p>
          </CardGridItem>
          <CardGridItem>One</CardGridItem>
          <CardGridItem>One</CardGridItem>
        </CardGrid>
      </CardBlock>
    </div>
  );
};
export default LandingContent;
