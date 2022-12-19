import "./App.css";
import { Blockquote } from "./components/helpers/Blockquote";
import { CardGrid } from "./components/ui/Blog/CardGrid";
import { Slideshow } from "./components/ui/Slideshow";
function App() {
  return (
    <>
    <Blockquote heading="Willkommen im Ticket Shop" comment="Hier werden Sie fündig!" />
    <Slideshow />
      <CardGrid />
    </>
  );
}

export default App;
