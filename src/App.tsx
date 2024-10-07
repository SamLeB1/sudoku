import Sudoku from "./components/Sudoku/Sudoku.tsx";
import InputButtons from "./components/InputButtons/InputButtons.tsx";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Sudoku />
      <InputButtons />
    </div>
  );
}
