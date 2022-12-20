import ReactDOM from "react-dom";
import TestPro from "./TestPro";
import Cookie from "./assets/cookie.png";
import Christmas, { ReactComponent as Tree } from "./assets/christmas.svg";

const App = () => {
  return (
    <>
      <TestPro />
      <Tree />
      <img src={Cookie} />
      <img src={Christmas} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
