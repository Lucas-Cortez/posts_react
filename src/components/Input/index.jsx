const Input = ({ handleChange, searchValue }) => (
  <input
    type="search"
    className="text-input"
    onChange={handleChange}
    value={searchValue}
    placeholder="Type your search"
  />
);

export default Input;
