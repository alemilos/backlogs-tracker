import Tag from "components/ui/tag/Tag";
import { Difficulties } from "constants/tasks";

const DifficultySelector = ({ difficulty, changeDifficulty }) => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold text-lg">Difficoltà</p>
      <div className="flex gap-2">
        <Tag
          text="Facile"
          bg="#11AF62"
          enabled={difficulty === Difficulties.Easy}
          onClick={() => changeDifficulty(Difficulties.Easy)}
        />
        <Tag
          text="Media"
          bg="#F89400"
          enabled={difficulty === Difficulties.Medium}
          onClick={() => changeDifficulty(Difficulties.Medium)}
        />
        <Tag
          text="Difficile"
          bg="#DB0001"
          enabled={difficulty === Difficulties.Hard}
          onClick={() => changeDifficulty(Difficulties.Hard)}
        />
      </div>
    </div>
  );
};

export default DifficultySelector;
