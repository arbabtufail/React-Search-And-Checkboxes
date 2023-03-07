import { useEffect, useState } from "react";
import SearchBox from "../search-box/search-box.component";
import NameList from "../name-list/name-list.component";
import CheckboxList from "../checkbox-list/checkbox-list.component";

const Assignment = ({ namesList }) => {
  const [fileterdNames, setFilteredNames] = useState(namesList);
  const [searchField, setSearchFeild] = useState("");
  const [searchStrinWithCheckBox, setSearchStrinWithCheckBox] = useState("");
  const [
    searchBoxSearchedNamesListCheckBox,
    setSearchBoxSearchedNamesListCheckBox,
  ] = useState([]);

  const [searchBoxSearchedNamesList, setSearchBoxSearchedNamesList] = useState(
    []
  );
  const [checkBoxSearchedNamesList, setCheckBoxSearchedNamesList] = useState(
    []
  );

  useEffect(() => {
    const expirationTime = localStorage.getItem("myArrayExpiration");
    if (expirationTime && new Date().getTime() > expirationTime) {
      setSearchBoxSearchedNamesListCheckBox([]);
    } else {
      const storedArray = JSON.parse(localStorage.getItem("myArray"));
      setSearchBoxSearchedNamesListCheckBox(storedArray);
    }
  }, []);

  useEffect(() => {
    if (checkBoxSearchedNamesList.length === 0) {
      if (searchField) {
        const newFilteredNames = namesList.filter((name) => {
          return name.toLocaleLowerCase().includes(searchField);
        });
        setFilteredNames(newFilteredNames);
      } else {
        setFilteredNames(namesList);
      }
    } else {
      const newFilteredNames = namesList.filter((name) => {
        if (
          checkBoxSearchedNamesList.some((ele) =>
            name.toLocaleLowerCase().includes(ele)
          )
        )
          return true;
        return false;
      });
      setFilteredNames(newFilteredNames);
    }
  }, [checkBoxSearchedNamesList]);

  useEffect(() => {
    if (searchField === "" && checkBoxSearchedNamesList.length === 0) {
      setFilteredNames(namesList);
    }
    if (searchBoxSearchedNamesList.length !== 0) {
      if (checkBoxSearchedNamesList.length !== 0) {
        const newFilteredName1 = namesList.filter((name) => {
          if (
            searchBoxSearchedNamesList.some((ele) =>
              name.toLocaleLowerCase().includes(ele)
            )
          )
            return true;
          return false;
        });
        const newFilteredName2 = namesList.filter((name) => {
          if (
            checkBoxSearchedNamesList.some((ele) =>
              name.toLocaleLowerCase().includes(ele)
            )
          )
            return true;
          return false;
        });
        const newFilteredName3 = newFilteredName1.concat(newFilteredName2);
        setFilteredNames(newFilteredName3);
      } else {
        const newFilteredNames = namesList.filter((name) => {
          return name.toLocaleLowerCase().includes(searchField);
        });
        setFilteredNames(newFilteredNames);
      }
    } else {
      if (checkBoxSearchedNamesList.length !== 0) {
        const newFilteredNames = namesList.filter((name) => {
          if (
            checkBoxSearchedNamesList.some((ele) =>
              name.toLocaleLowerCase().includes(ele)
            )
          )
            return true;
          return false;
        });
        setFilteredNames(newFilteredNames);
      } else {
        setFilteredNames(namesList);
      }
    }
  }, [searchBoxSearchedNamesList]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchField) {
        if (!searchBoxSearchedNamesListCheckBox.includes(searchField)) {
          setSearchBoxSearchedNamesListCheckBox((oldData) => [
            ...oldData,
            searchField,
          ]);
          localStorage.setItem(
            "myArray",
            JSON.stringify([...searchBoxSearchedNamesListCheckBox, searchField])
          );
          const expirationTime = new Date().getTime() + 1 * 60 * 1000;
          localStorage.setItem("myArrayExpiration", expirationTime);
        }
      }
      if (searchField && checkBoxSearchedNamesList.length !== 0) {
        let searchingFilteredNameAgain = false;
        fileterdNames.forEach((ele) => {
          if (ele.toLowerCase().includes(searchField)) {
            searchingFilteredNameAgain = true;
          }
        });
        if (searchingFilteredNameAgain) {
          const newFilteredNames = namesList.filter((name) => {
            if (
              checkBoxSearchedNamesList.some((ele) =>
                name.toLocaleLowerCase().includes(ele)
              )
            )
              return true;
            return false;
          });
          setFilteredNames(newFilteredNames);
        } else {
          setSearchBoxSearchedNamesList((old) => [...old, searchField]);
        }
      }
      if (searchField && checkBoxSearchedNamesList.length === 0) {
        setSearchBoxSearchedNamesList(searchField);
      }
      if (searchStrinWithCheckBox && searchField === "") {
        setCheckBoxSearchedNamesList(
          checkBoxSearchedNamesList.filter(
            (filterTag) => filterTag !== searchStrinWithCheckBox
          )
        );
        setSearchStrinWithCheckBox("");
      }

      if (searchField === "") {
        setSearchBoxSearchedNamesList([]);
      }
    }, 800);
    return () => clearTimeout(delayDebounceFn);
  }, [searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchFeild(searchFieldString);
  };

  const onClickCheckboxHandler = (event) => {
    if (searchField) {
      if (
        !checkBoxSearchedNamesList.includes(searchField) &&
        searchField !== event.target.value
      ) {
        setCheckBoxSearchedNamesList((old) => [...old, searchField]);
        setSearchStrinWithCheckBox(searchField);
      }
    }

    if (event.target.checked) {
      setCheckBoxSearchedNamesList((old) => [...old, event.target.value]);
    } else {
      setCheckBoxSearchedNamesList(
        checkBoxSearchedNamesList.filter(
          (filterTag) => filterTag !== event.target.value
        )
      );
    }
  };

  return (
    <div>
      <SearchBox
        className="search-box"
        placeholder="search names..."
        onChangeHandler={onSearchChange}
      />
      <CheckboxList
        searchBoxSearchedNamesListCheckBox={searchBoxSearchedNamesListCheckBox}
        onClickCheckboxHandler={onClickCheckboxHandler}
      />
      <NameList names={fileterdNames} />
    </div>
  );
};
export default Assignment;
