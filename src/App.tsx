import { useEffect, useState } from "react";
import { debounce } from "./debounce";
import { Input } from "./Input";
import { List } from "./List";
import { Pagination } from "./Pagination";
import "./styles.css";

export type Person = {
  name: string;
};

type ApiResponse = {
  results: Person[];
  next: string | null;
};

const API_URL = "https://swapi.dev/api/people";

export const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const getPeople = async (
    searchTerm: string,
    nextPage: string | null = null
  ) => {
    setLoading(true);
    const url = nextPage ? nextPage : `${API_URL}?search=${searchTerm}`;
    const response = await fetch(url);
    const data: ApiResponse = await response.json();
    setPeople([...people, ...data.results]);
    setNextPage(data.next);
    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm) {
      getPeople(searchTerm);
    }
  }, [searchTerm]);

  const handleInputChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setPeople([]);
      setNextPage(null);
    },
    200
  );

  return (
    <div className="App">
      <Input handleInputChange={handleInputChange} />
      <List loading={loading} people={people} />
      <Pagination
        nextPage={nextPage}
        getPeople={getPeople}
        searchTerm={searchTerm}
      />
    </div>
  );
};
