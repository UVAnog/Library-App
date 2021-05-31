import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Result from "../components/result";
import { nanoid } from "nanoid";

function Search() {
  const [type, setType] = useState(0);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [results, setResults] = useState([]);

  const handleGet = () => {
    axios
      .get("http://localhost:3001/books", {
        params: {
          title: title,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          if (res.data.data.items !== undefined)
            setResults(res.data.data.items);
          else alert("No results found");
        } else alert("Please enter a title");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    switch (type) {
      case 0:
        handleGet();
        break;
    }
  };

  const addToLibrary = (index, title, author, image) => {
    axios
      .post("http://localhost:3001/books/add", {
        data: results[index],
      })
      .then((res) => {
        if (res.status === 200) console.log("Successful addition to library");
        else alert("There was an error");
      })
      .catch((err) => {
        console.log("There was an error");
      });
  };

  const resList = results.map((item, index) => (
    <Result
      key={nanoid()}
      title={item.volumeInfo.title}
      author={
        item.volumeInfo.authors !== undefined
          ? item.volumeInfo.authors[0]
          : "Unknown"
      }
      index={index}
      image={
        item.volumeInfo.imageLinks !== undefined
          ? item.volumeInfo.imageLinks.thumbnail
          : "https://icon-library.net/images/no-image-icon/no-image-icon-5.jpg"
      }
      addToLibrary={addToLibrary}
    />
  ));
  const useStyles = makeStyles({
    root: {
      paddingTop: 50,
    },
    search: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <TextField
          className={classes.search}
          id="outlined-basic"
          label="Search Title or Author"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {(type === 1 || type === 2) && (
          <TextField
            className={classes.search}
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        )}
        <Button
          className={classes.search}
          style={{ marginLeft: "20px", top: "10px" }}
          variant="contained"
          color="secondary"
          onClick={handleClick}
        >
          Search
        </Button>
      </div>
      {resList}
    </div>
  );
}

export default Search;
