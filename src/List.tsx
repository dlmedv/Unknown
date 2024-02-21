import { Person } from "./App";

interface Props {
  loading: boolean;
  people: Person[];
}

export const List: React.FC<Props> = ({ loading, people }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {people.map((person, index) => (
        <li key={index}>{person.name}</li>
      ))}
    </ul>
  );

};
