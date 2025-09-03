import BackgroundImage from "assets/background.png";
import CreateBoardZone from "components/general/CreateBoardZone";
import SearchBar from "components/general/SearchBar";
import DailyBoard from "components/boards/DailyBoard";
import { useRef } from "react";
import Boards from "components/boards/Boards";
import LogoutButton from "components/general/LogoutButton";

const Home = () => {
  const containerRef = useRef(null);

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
      <DailyBoard />
      <Boards containerRef={containerRef} />
      <CreateBoardZone />
      <LogoutButton />
    </div>
  );
};

export default Home;
