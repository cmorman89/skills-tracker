import CardBlock from "../../components/block/CardBlock";
import ColorBlock from "../../components/block/ColorBlock";
import CardGrid from "../../components/grid/CardGrid";
import CardGridItem from "../../components/grid/CardGridItem";

const LandingContent = () => {
  return (
    <div className="flex flex-col gap-8">
      <ColorBlock />
      <CardBlock>
        <h1 className="text-4xl font-bold font-inter text-gradient-accent self-start mb-8">
          What would you like to do?
        </h1>
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
