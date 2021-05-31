import React from "react";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";
const Result = ({ title, author, addToLibrary, index, image }) => {
  // handling the addition to the library
  // const handleClick = () => {
  //   axios
  //     .post("http://localhost:3001/books/add", {
  //       data: index[0],
  //       title,
  //       author,
  //       image,
  //     })
  //     .then((res) => {
  //       if (res.status === 200) console.log("Added successfully");
  //       else alert("There was an error");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const handleClick = () => {
    addToLibrary(index);
  };

  return (
    <div id="resultWrapper">
      <Paper style={{ padding: "5px 20px", margin: "20px 0" }} elevation={3}>
        <b>
          <p style={{ fontSize: "24px" }}>{title}</p>
        </b>
        <p style={{ fontSize: "20px" }}>{"By: " + author}</p>
        <img src={image} />
        <div className="buttonWrapper">
          <Button variant="outlined" color="primary" onClick={handleClick}>
            Add to library
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Result;
