import CardDesigns from "../components/cardDesigns/CardDesigns";
import { Exchange } from "../components/exchange/Exchange";
import { Features } from "../components/features/Features";
import { GlobalMap } from "../components/globalMap/GlobalMap";
import { News } from "../components/news/News";
import { NewsSub } from "../components/newsSub/NewsSub";
import { Support } from "../components/support/Support";

function Body() {
    return (
      <main>
        <CardDesigns />
        <Features />
        <Exchange />
        <GlobalMap />
        <News />
        <Support />
        <NewsSub />
      </main>
    );
  }
  
  export default Body;
  