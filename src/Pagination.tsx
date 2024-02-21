interface Props {
  nextPage: string | null;
  getPeople: (searchTerm: string, nextPage: string | null) => Promise<void>;
  searchTerm: string;
}
export const Pagination: React.FC<Props> = ({
  nextPage,
  getPeople,
  searchTerm,
}) => {
  const loadMore = () => {
    if (nextPage) {
      getPeople(searchTerm, nextPage);
    }
  };
  return (
    <div>
      <button onClick={loadMore}>Загрузить еще</button>
    </div>
  );
};
