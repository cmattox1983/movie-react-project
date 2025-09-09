import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loadingstate = () => {
  return (
    <div className="search__loading visible">
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className="search__loading--spinner"
      />
    </div>
  );
};

export default Loadingstate;
