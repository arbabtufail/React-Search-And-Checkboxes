import "./name-list.styles.css";

const NameList = ({ names }) => {
  return (
    <div className="name-list">
      {names.map((name, index) => {
        return (
          <div className="name" key={index}>
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default NameList;
