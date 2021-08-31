import "./App.css";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Images from "./Components/images";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { saveAs } from "file-saver";
import { useState, useEffect } from "react";

function App() {
  const [imgdata, setImgdata] = useState([]);
  const [imagefile, setImageFile] = useState([]);

  const addImages = (e) => {
    setImageFile(e.target.files);

    var result = Object.keys(e.target.files).map((key) => [
      e.target.files[key],
    ]);
    setImgdata(result.map((img) => URL.createObjectURL(img[0])));
  };

  const handleSubmit = (e) => {
    var formData = new FormData();
    let date = new Date().toString().split(" ").join("").split("+");
    date = date[0].toString().split(":").join("");
    if (imagefile.length == 1) {
      formData.append("image", imagefile[0]);
      fetch("http://localhost:5000/api/v1/update", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "multipart/form-data",
        },
      })
        .then((res) => res.blob())
        .then((blob) => saveAs(blob, date + ".docx"))
        .catch((err) => console.log(err));
    } else {
      console.log("hitting");
      for (let i = 0; i < imagefile.length; i++) {
        formData.append("image", imagefile[i]);
      }
      fetch("http://localhost:5000/api/v1/updates", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "multipart/form-data",
        },
      })
        .then((res) => res.blob())
        .then((blob) => saveAs(blob, date + ".docx"))
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
            id="raised-button-file"
            name="image"
            type="file"
            onChange={addImages}
            multiple
            hidden
          />
          <label htmlFor="raised-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              {" "}
              <PhotoCamera />{" "}
            </IconButton>{" "}
          </label>
          <input
            type="submit"
            value="Get docx"
            id="contained-button-file"
            className="btn btn-default"
            hidden
          ></input>
          <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Get docx
        </Button>
      </label>
        </form>
        <Images imageList={imgdata} />
      </Container>
    </div>
  );
}

export default App;
