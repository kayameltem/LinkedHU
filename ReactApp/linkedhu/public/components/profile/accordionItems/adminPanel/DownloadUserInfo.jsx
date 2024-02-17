import axios from "axios";
import React, {useState, useRef} from "react";
import { Button, Form, FormControl } from "react-bootstrap";
const DownloadUserInfo = () => {


    const [data, setData] = useState();
    const handleDownload = (e) => {
      e.preventDefault();
       const x = axios.get("http://localhost:8080/admin/export").then(response => setData(response.data));
        console.log("x",x);
        console.log("hello get request", data);

  }

    
  return (
    <div>
      {" "}
        {" "}
        <Button
          className="btn-search"
          style={{ background: "#008080" }}
          variant="btn-search"
          type="submit"
          sheet = "sheet"
          onClick = {handleDownload}
        >
          Download User Information
         </Button>      

    </div>
  );
};

export default DownloadUserInfo;
