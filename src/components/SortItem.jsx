const SortItem = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      class="pt-2 mt-3 p-2 mx-4 rounded-xl cursor-pointer bg-transparent text-white border-none text-base transition duration-200 ease-in-out text-left"
      onMouseEnter={(e) => {
        e.target.style.background = "white";
        e.target.style.color = "black";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "none";
        e.target.style.color = "white";
      }}
    >
      {text}
    </button>
  );
};

export default SortItem;
