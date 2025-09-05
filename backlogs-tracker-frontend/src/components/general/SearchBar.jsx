// Hooks
import { useEffect, useRef, useState } from "react";
// Icons
import { GoAlertFill } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
// Utils
import { toast } from "react-toastify";
// Services
import { searchService } from "services/boards";
import { hackerText } from "utils/text";

// JSON PRETTY
import { Icons } from "utils/icons";

const SearchBar = () => {
  const [resultsOpened, setResultsOpened] = useState(true);
  const [query, setQuery] = useState("");
  const reqTimeout = useRef(null);

  // const results = [{ name: "alessandro" }, { name: "edoardo" }, {}, {}, {}];
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  function closeSearchResults() {
    setResultsOpened(false);
  }

  function openSearchResults() {
    setResultsOpened(true);
  }

  async function handleSearch(searchQuery) {
    const res = await searchService(searchQuery);
    if (res.ok) {
      openSearchResults();
      setResults(res.data.results);
      setError(null);
    } else {
      setError(res.err);
    }
  }

  useEffect(() => {
    // setResults([]);
    if (!query.length) closeSearchResults();
    // else {
    //   openSearchResults();
    //   if (reqTimeout.current) clearTimeout(reqTimeout.current);
    //   reqTimeout.current = setTimeout(() => handleSearch(query), 500);
    // }

    // return () => {
    //   clearTimeout(reqTimeout.current);
    // };
  }, [query]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="absolute top-8 left-1/2 -translate-x-[44%] flex gap-3 items-center z-[11]"
    >
      <div
        className="border border-black w-[1000px] rounded-full relative"
        style={{
          borderTopLeftRadius: resultsOpened ? "20px" : "",
          borderTopRightRadius: resultsOpened ? "20px" : "",
          borderBottomRightRadius: resultsOpened ? "0px" : "",
          borderBottomLeftRadius: resultsOpened ? "0px" : "",
        }}
      >
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca una board… digita * per vedere tutte"
          className=" w-full h-full py-3 px-2 rounded-full outline-none hover:bg-[#b57ce8]/20 transition-all text-black"
          style={{
            borderTopLeftRadius: resultsOpened ? "20px" : "",
            borderTopRightRadius: resultsOpened ? "20px" : "",
            borderBottomRightRadius: resultsOpened ? "0px" : "",
            borderBottomLeftRadius: resultsOpened ? "0px" : "",
          }}
        />
        {resultsOpened && (
          <SearchResults query={query} results={results} error={error} />
        )}
      </div>
      <button
        onClick={() => handleSearch(query)}
        className="p-2 border border-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#b57ce8]/40"
      >
        <IoSearchSharp className="text-black" />
      </button>
    </form>
  );
};

const SearchResults = ({ query, results, error }) => {
  function getDisplay() {
    if (error) return <DisplayError error={error} />;
    if (results && !results.length) return <EmptySearchResults />;
    return <Rows query={query} results={results} />;
  }

  return (
    <div className="absolute w-[100.2%] min-h-[300px] h-fit max-h-[800px] border border-black -translate-x-[1px] bg-[#b57ce8]/90 p-2 overflow-x-scroll">
      {getDisplay()}
    </div>
  );
};

const DisplayError = ({ error }) => {
  return <div className="h-full w-full">{error}</div>;
};

const EmptySearchResults = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 pt-16">
      <GoAlertFill className="text-5xl" />
      <p>La ricerca non ha prodotto risultati</p>
    </div>
  );
};
const isFlatObjectArray = (arr) =>
  Array.isArray(arr) &&
  arr.every(
    (item) => typeof item === "object" && item !== null && !Array.isArray(item)
  );

// Flatten nested arrays of any depth and keep only objects
const flattenResults = (arr) =>
  arr.flatMap((item) =>
    Array.isArray(item)
      ? flattenResults(item)
      : typeof item === "object" && item !== null
      ? [item]
      : []
  );

const Rows = ({ query, results = [] }) => {
  const vulnerableRef = useRef(null);
  useEffect(() => {
    if (vulnerableRef.current) {
      if (vulnerableRef?.current?.innerText?.length < 1000) {
        hackerText(vulnerableRef.current);
      }
    }
  }, [results]);

  const flatResults = flattenResults(results);

  const allKeys = Array.from(
    new Set(flatResults.flatMap((result) => Object.keys(result)))
  );

  if (isFlatObjectArray(flatResults)) {
    return (
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {allKeys.map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flatResults.map((result, i) => (
              <tr
                key={i}
                className="hover:bg-gray-100 transition-colors duration-150"
              >
                {allKeys.map((key) => {
                  let displayResult;
                  if (key === "icon") {
                    const Icon = Icons.getIcon(result[key]);
                    if (Icon) {
                      displayResult = <Icon className="text-black text-xl" />; // render as JSX
                    }
                  }
                  if (key === "color") {
                    displayResult = (
                      <div
                        className="w-6 h-6 rounded-full border border-black"
                        style={{ backgroundColor: result[key] }}
                      />
                    );
                  }
                  return (
                    <td key={key} className="px-4 py-2 text-sm text-gray-800">
                      {(displayResult || result[key]) ?? "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default SearchBar;
