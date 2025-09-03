import { Statuses } from "constants/tasks";
import Tag from "components/ui/tag/Tag";

const StatusSelector = ({ status, changeStatus }) => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold text-lg">Stato</p>
      <div className="flex gap-2">
        <Tag
          text="Da fare"
          bg="#1671F5"
          enabled={status === Statuses.Todo}
          onClick={() => changeStatus(Statuses.Todo)}
        />
        <Tag
          text="In corso"
          bg="#F89400"
          enabled={status === Statuses.Doing}
          onClick={() => changeStatus(Statuses.Doing)}
        />
        <Tag
          text="Completato"
          bg="#11AF62"
          enabled={status === Statuses.Completed}
          onClick={() => changeStatus(Statuses.Completed)}
        />
      </div>
    </div>
  );
};

export default StatusSelector;
