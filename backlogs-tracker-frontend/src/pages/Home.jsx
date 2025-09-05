import BackgroundImage from "assets/background.png";
import CreateBoardZone from "components/general/CreateBoardZone";
import SearchBar from "components/general/SearchBar";
import { useRef } from "react";
import Boards from "components/boards/Boards";
import LogoutButton from "components/general/LogoutButton";
import HelperSqlQueries from "components/general/HelperSqlQueries";
import { useAuth } from "providers/AuthProvider";
import AdminLabel from "components/general/AdminLabel";

const Home = () => {
  const { auth } = useAuth();
  const containerRef = useRef(null);

  const isAdmin = auth?.user?.role === "admin";
  console.log(auth.user);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "repeat",
        backgroundSize: "120px 120px",
      }}
    >
      <SearchBar />
      <HelperSqlQueries />
      <Boards containerRef={containerRef} />
      <CreateBoardZone />
      <LogoutButton />
      {isAdmin && <AdminLabel />}
    </div>
  );
};

export default Home;
