import "./App.css";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { saveAs } from "file-saver";
import { useState, useEffect } from "react";

function App() {
  const [imgdata, setImgdata] = useState([]);

  const addImages = (e) => {
    var result = Object.keys(e.target.files).map((key) => [
      e.target.files[key],
    ]);
    setImgdata(result.map((img) => URL.createObjectURL(img[0])));
    // console.log(imgdata)
    // setImddata(URL.createObjectURL(e.target.files[0]));
    // console.log(imgdata);
  };

  useEffect(() => {
    console.log(imgdata);
  }, [imgdata]);

  const handleSubmit = (e) => {
    var formData = new FormData();
    let date = new Date().toString().split(" ").join("").split("+");
    date = date[0].toString().split(":").join("");
    if (imgdata.length == 1) {
      formData.append("image", imgdata[0]);
      fetch("http://localhost:5000/api/v1/update", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "multipart/form-data",
        },
        // credentials:'include',
      })
        .then((res) => res.blob())
        .then((blob) => saveAs(blob, date + ".docx"))
        .catch((err) => console.log(err));
    } else {
      console.log("hitting");
      for (let i = 0; i < imgdata.length; i++) {
        formData.append("image", imgdata[i]);
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
        {imgdata.length
          ? imgdata.map((img) => {
             return <img src={img} key={img} alt={img} />;
            })
          : ""}
      </Container>
    </div>
  );
}

export default App;
