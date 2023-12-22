// import { sortTask } from "../../context/TaskContext";

const SortItem = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        paddingTop: "10px",
        padding: "10px",
        marginTop: "5px",
        margin: "5px 10px",
        borderRadius: "10px",
        cursor: "pointer",
        background: "none",
        color: "#1da1f2",
        border: "none",
        fontSize: "15px",
        transition: "background-color 0.2s ease",
        textAlign: "left",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "#1B1B1B";
        e.target.style.color = "#1da1f2";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "none";
        e.target.style.color = "#1da1f2";
      }}
    >
      {text}
    </button>
  );
};

export default SortItem;
