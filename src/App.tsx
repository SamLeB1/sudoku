import Header from "./components/Header/Header.tsx";
import Sudoku from "./components/Sudoku/Sudoku.tsx";
import InputButtons from "./components/InputButtons/InputButtons.tsx";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="game">
        <Sudoku />
        <InputButtons />
      </div>
    </div>
  );
}
