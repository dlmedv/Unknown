interface Props {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<Props> = ({ handleInputChange }) => {
  return <input onChange={handleInputChange} type="text" placeholder="Поиск" />;
};
