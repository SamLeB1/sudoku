import useAppContext from "../../hooks/useAppContext.tsx";
import "./ToggleNotesMode.css";

export default function ToggleNotesMode() {
  const { stateApp, setStateApp } = useAppContext();

  return (
    <div
      className="toggle-notes-mode"
      onClick={() =>
        setStateApp((prevState) => ({
          ...prevState,
          isNotesMode: !prevState.isNotesMode,
        }))
      }
    >
      Notes Mode:{" "}
      {stateApp.isNotesMode ? (
        <button className="btn-on" type="button">
          ON
        </button>
      ) : (
        <button className="btn-off" type="button">
          OFF
        </button>
      )}
    </div>
  );
}
