import { useEffect } from "react";
import { useBoardsStore } from "./useBoardsStore";
import { useAuth } from "providers/AuthProvider";

const BoardsStore = () => {
  const { auth } = useAuth();
  const fetchBoards = useBoardsStore((store) => store.fetchBoards);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchBoards();
    }
  }, [auth]);

  return null;
};

export default BoardsStore;
