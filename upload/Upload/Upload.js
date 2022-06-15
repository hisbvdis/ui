import { useState } from "react";
import "./Upload.scss";

const Upload = ({className=""}) => {
  const [fileName, setFileName] = useState("Upload your photo");
  const [selected, setSelected] = useState(false);

  const handleChange = (evt) => {
    const files = evt.target.files;
    if (files.length === 0) {
      setFileName("Upload your photo");
      setSelected(false);
      return;
    }
    setFileName(files[0].name);
    setSelected(true);
  }
  
  return (<>
    <label className={`file  ${className}`}>
      <input className="file__input" type="file" onChange={handleChange} />
      <span className="file__btn">Upload</span>
      <span className={`file__name ${selected && "file__name--selected"}`}>{fileName}</span>
    </label>
  </>)
}

export default Upload;