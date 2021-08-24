import "./App.css";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { saveAs } from "file-saver";
import { useState, useEffect } from "react";

function App() {
  const [imgdata, setImddata] = useState([]);

  const addImages = (e) => {
    setImddata(e.target.files);
    // console.log(imgdata);
  };

  useEffect(() => {
    console.log(imgdata.length);
  }, [imgdata]);

  const handleSubmit = (e) => {
    var formData = new FormData();
    let date = new Date().toString().split(" ").join("").split("+");
date = date[0].toString().split(":").join("");
    if (imgdata.length == 1) {
      formData.append("image", imgdata[0]);
      fetch("http://localhost:8000/img/upload", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "multipart/form-data",
        },
        // credentials:'include',
      })
        .then((res) => res.blob())
        .then((blob) => saveAs(blob, date+".docx"))
        .catch((err) => console.log(err));
    } else{
      console.log("hitting");
      for (let i = 0 ; i < imgdata.length ; i++) {
          formData.append("image", imgdata[i]);
      }
      // formData.append("image", imgdata);
      fetch("http://localhost:8000/img/uploads", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "multipart/form-data",
        },
        // credentials:'include',
      })
        .then((res) => res.blob())
        .then((blob) => saveAs(blob, date+".docx"))
        .catch((err) => console.log(err));
        e.preventDefault();

    }

    e.preventDefault();
  };
  return (
    <div className="App">
      <Container>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            accept="image/*"
            // style={{ display: "none" }}
            id="raised-button-file"
            name="image"
            type="file"
            onChange={addImages}
            multiple
          />
          {/* <label htmlFor="raised-button-file"> */}
            {/* <Button variant="raised" component="span"> */}
              {/* Upload */}
            {/* </Button> */}
          {/* </label> */}
          <input
            type="submit"
            value="Get docx"
            className="btn btn-default"
          ></input>
        </form>
        {imgdata.length ? (
          <img src={imgdata[0].name} alt={imgdata[0].name} />
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}

export default App;
