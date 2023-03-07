const Checkbox = ({ name, onClickCheckboxHandler }) => {
  return (
    <label>
      <input
        type="checkbox"
        id={name}
        name={name}
        value={name}
        onClick={onClickCheckboxHandler}
      />
      {name}
    </label>
  );
};
export default Checkbox;
