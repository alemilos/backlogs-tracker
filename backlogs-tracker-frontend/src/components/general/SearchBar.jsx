import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3 items-center"
    >
      <div className="border border-black w-[400px] rounded-full">
        <input
          type="text"
          className=" w-full h-full py-3 px-2 rounded-full outline-none hover:bg-[#b57ce8]/20 transition-all"
        />
      </div>
      <button className="p-2 border border-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#b57ce8]/40">
        <IoSearchSharp className="text-black" />
      </button>
    </form>
  );
};

export default SearchBar;
