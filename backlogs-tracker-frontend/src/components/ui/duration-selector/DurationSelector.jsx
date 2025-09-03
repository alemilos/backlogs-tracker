import Input from "components/ui/input/Input";
import { TimeUnits } from "constants/tasks";

const DurationSelector = ({ duration, setDuration, timeUnit, setTimeUnit }) => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold text-lg">Durata stimata</p>
      <div className="flex gap-2">
        <Input
          type="number"
          className="rounded-lg hover:bg-[#B0C4DE]/40"
          placeholder="Inserisci durata"
          value={duration || ""}
          onChange={(e) => setDuration(e.target.value)}
        />
        <select
          className="outline-none border py-2.5 px-2 rounded-lg cursor-pointer hover:bg-[#721C1C]/20"
          defaultValue={timeUnit}
          onChange={(e) => setTimeUnit(e.target.value)}
        >
          <option value={TimeUnits.Minutes}>Minuti</option>
          <option value={TimeUnits.Hours}>Ore</option>
          <option value={TimeUnits.Days}>Giorni</option>
        </select>
      </div>
    </div>
  );
};

export default DurationSelector;
