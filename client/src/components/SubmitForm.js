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
          <MenuItem value="Banjo" style={{ color: 'goldenrod' }} >Banjo</MenuItem>
          <MenuItem value="Bass" style={{ color: 'goldenrod' }} >Bass</MenuItem>
          <MenuItem value="Bassoon" style={{ color: 'goldenrod' }} >Bassoon</MenuItem>
          <MenuItem value="Cello" style={{ color: 'goldenrod' }} >Cello</MenuItem>
          <MenuItem value="Clarinet" style={{ color: 'goldenrod' }} >Clarinet</MenuItem>
          <MenuItem value="Drums" style={{ color: 'goldenrod' }} >Drums</MenuItem>
          <MenuItem value="Electric Bass" style={{ color: 'goldenrod' }} >Electric Bass</MenuItem>
          <MenuItem value="Electric Guitar" style={{ color: 'goldenrod' }} >Electric Guitar</MenuItem>
          <MenuItem value="Flute" style={{ color: 'goldenrod' }} >Flute</MenuItem>
          <MenuItem value="French Horn" style={{ color: 'goldenrod' }} >French Horn</MenuItem>
          <MenuItem value="Guitar" style={{ color: 'goldenrod' }} >Guitar</MenuItem>
          <MenuItem value="Mandolin" style={{ color: 'goldenrod' }} >Mandolin</MenuItem>
          <MenuItem value="Piano" style={{ color: 'goldenrod' }} >Piano</MenuItem>
          <MenuItem value="Saxophone" style={{ color: 'goldenrod' }} >Saxophone</MenuItem>
          <MenuItem value="Trumpet" style={{ color: 'goldenrod' }} >Trumpet</MenuItem>
          <MenuItem value="Tuba" style={{ color: 'goldenrod' }} >Tuba</MenuItem>
          <MenuItem value="Ukulele" style={{ color: 'goldenrod' }} >Ukulele</MenuItem>
          <MenuItem value="Viola" style={{ color: 'goldenrod' }} >Viola</MenuItem>
          <MenuItem value="Violin" style={{ color: 'goldenrod' }} >Violin</MenuItem>
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
          <MenuItem value="Classical" style={{ color: 'goldenrod' }} >Classical</MenuItem>
          <MenuItem value="Country" style={{ color: 'goldenrod' }} >Country</MenuItem>
          <MenuItem value="Folk" style={{ color: 'goldenrod' }} >Folk</MenuItem>
          <MenuItem value="Latino" style={{ color: 'goldenrod' }} >Latino</MenuItem>
          <MenuItem value="Jazz" style={{ color: 'goldenrod' }} >Jazz</MenuItem>
          <MenuItem value="Pop" style={{ color: 'goldenrod' }} >Pop</MenuItem>
          <MenuItem value="Reggae" style={{ color: 'goldenrod' }} >Reggae</MenuItem>
          <MenuItem value="Rock" style={{ color: 'goldenrod' }} >Rock</MenuItem>
          <MenuItem value="Rhythm and Blues" style={{ color: 'goldenrod' }} >Rhythm and Blues</MenuItem>
          <MenuItem value="Soul" style={{ color: 'goldenrod' }} >Soul</MenuItem>
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
