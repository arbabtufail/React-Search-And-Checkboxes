import Checkbox from "../checkbox/checkbox.component";
const CheckboxList = ({
  searchBoxSearchedNamesListCheckBox,
  onClickCheckboxHandler,
}) => {
  return (
    <div className="chekbox-container">
      {searchBoxSearchedNamesListCheckBox &&
        searchBoxSearchedNamesListCheckBox.map((name, index) => {
          return (
            <Checkbox
              name={name}
              onClickCheckboxHandler={onClickCheckboxHandler}
              key={index}
            />
          );
        })}
    </div>
  );
};
export default CheckboxList;
