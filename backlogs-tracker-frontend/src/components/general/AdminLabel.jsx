import { v4 } from "uuid";

const AdminLabel = () => {
  return (
    <div className="absolute border px-4 py-2 border-black bottom-8 left-4 rounded-lg transition-all hover:bg-[#0f0]/50 z-10 w-[480px]">
      <span className="font-bold">Secret Code:</span> {v4("string")}
    </div>
  );
};

export default AdminLabel;
