import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import { DropzoneArea } from "material-ui-dropzone";
import { storage } from "../firebase";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { getPosts, savePosts } from "../actions/postAction";
import "./style.css";

const useStyles = makeStyles(theme => ({
  container: {
    // display: "flex",
    // flexWrap: "wrap"
  },
  textField: {
    margin: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  submitButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(3)
  },
  goldenrod:{
    color:"goldenrod"
  }
}));

export default connect(
  null,
  { getPosts, savePosts }
)(({ savePosts, getPosts }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    title: "",
    blurb: "",
    instrument: "",
    genre: "",
    link: ""
  });
  var submitKey = 1;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const uploadFile = handleURLChange => {
    console.log("Uploading", file);
    const storageRef = storage.ref("sheets/" + file.name);

    //upload  file
    const task = storageRef.put(file);

    // update progress
    task.on(
      "state_changed",
      function progress(snapshot) {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      function error(err) {
        console.log("File upload error", err);
      },

      function complete() {
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          let url = downloadURL;
          savePosts(values, url);
        });
      }
    );
  };

  // handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if (!file) {
      return;
    }
    uploadFile();

    getPosts();

    setValues({
      title: "",
      blurb: "",
      instrument: "",
      genre: "",
      link: ""
    });
    // setFile(null);
  };

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <TextField
        label="Title"
        className={classes.textField}
        placeholder="Song Title..."
        onChange={handleChange("title")}
        value={values.title}
        fullWidth
        required
      />
      <FormControl className={classes.formControl} fullWidth required>
        <InputLabel htmlFor="instrument">Instrument</InputLabel>
        <Select
          value={values.instrument}
          onChange={handleChange("instrument")}
          inputProps={{
            name: "instrument",
            id: "instrument"
          }}
         
        >
          
          <MenuItem  className={classes.goldenrod} value="Banjo">Banjo</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Bass">Bass</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Bassoon">Bassoon</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Cello">Cello</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Clarinet">Clarinet</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Drums">Drums</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Electric Bass">Electric Bass</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Electric Guitar">Electric Guitar</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Flute">Flute</MenuItem>
          <MenuItem  className={classes.goldenrod} value="French Horn">French Horn</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Guitar">Guitar</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Mandolin">Mandolin</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Piano">Piano</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Saxophone">Saxophone</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Trumpet">Trumpet</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Tuba">Tuba</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Ukulele">Ukulele</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Viola">Viola</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Violin">Violin</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} fullWidth required>
        <InputLabel htmlFor="genre">Genre</InputLabel>
        <Select
          value={values.genre}
          onChange={handleChange("genre")}
          inputProps={{
            name: "genre",
            id: "genre"
          }}
        >
          <MenuItem  className={classes.goldenrod} value="Classical">Classical</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Country">Country</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Folk">Folk</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Latino">Latino</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Jazz">Jazz</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Pop">Pop</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Reggae">Reggae</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Rock">Rock</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Rhythm and Blues">Rhythm and Blues</MenuItem>
          <MenuItem  className={classes.goldenrod} value="Soul">Soul</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="filled-multiline-flexible"
        label="About this Song..."
        multiline
        rowsMax="4"
        value={values.blurb}
        onChange={handleChange("blurb")}
        className={classes.textField}
        margin="normal"
        helperText="hello"
        name="blurb"
        required
        fullWidth
      />

      <LinearProgress variant="determinate" value={progress} />
      <DropzoneArea
        key={submitKey}
        filesLimit={1}
        acceptedFiles={["image/*", "application/pdf"]}
        onChange={files => setFile(files[0])}
      />
      <Button
        variant="contained"
        type="submit"
        className={classes.submitButton}
        onSubmit={submitKey++}
      >
        Submit
      </Button>
    </form>
  );
});
