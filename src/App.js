import Assignment from "./component/Assignment/assignment";
import "./App.css";
import { NAMES_LIST } from "./Names";

function App() {
  return (
    <div className="App">
      <h1 className="app-title">Search And Checkboxes</h1>
      <Assignment namesList={NAMES_LIST} />;
    </div>
  );
}

export default App;
