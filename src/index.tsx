import ReactDOM from "react-dom/client";
import TestPro from "./TestPro";
import Cookie from "./assets/cookie.png";
import Christmas, { ReactComponent as Tree } from "./assets/christmas.svg";

const App = () => {
  console.log(process.env.PUBLIC_URL, process.env.REACT_APP_API_HOST);

  return (
    <>
      <TestPro />
      <Tree />
      <img src={Cookie} />
      <img src={Christmas} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

export default App;
