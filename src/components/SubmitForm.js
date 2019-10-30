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
    url:""
    
  });
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  
 

  const uploadFile = (handleURLChange) => {
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
          savePosts(values,url);
          
          // console.log(downloadURL);
          
       

          
      });
      
      // console.log(values);
      // savePosts(values);
  });


};


  // handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if (!file) {
      return;
    }
    uploadFile();

    // console.log(post);
    // savePosts(values);
    getPosts();

    setValues({
      title: "",
      blurb: "",
      instrument: "",
      genre: "",
      url:""
    });
    setFile(null);
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
          <MenuItem value="Banjo">Banjo</MenuItem>
          <MenuItem value="Bass">Bass</MenuItem>
          <MenuItem value="Bassoon">Bassoon</MenuItem>
          <MenuItem value="Cello">Cello</MenuItem>
          <MenuItem value="Clarinet">Clarinet</MenuItem>
          <MenuItem value="Drums">Drums</MenuItem>
          <MenuItem value="Electric Bass">Electric Bass</MenuItem>
          <MenuItem value="Electric Guitar">Electric Guitar</MenuItem>
          <MenuItem value="Flute">Flute</MenuItem>
          <MenuItem value="French Horn">French Horn</MenuItem>
          <MenuItem value="Guitar">Guitar</MenuItem>
          <MenuItem value="Mandolin">Mandolin</MenuItem>
          <MenuItem value="Piano">Piano</MenuItem>
          <MenuItem value="Saxophone">Saxophone</MenuItem>
          <MenuItem value="Trumpet">Trumpet</MenuItem>
          <MenuItem value="Tuba">Tuba</MenuItem>
          <MenuItem value="Ukulele">Ukulele</MenuItem>
          <MenuItem value="Viola">Viola</MenuItem>
          <MenuItem value="Violin">Violin</MenuItem>
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
          <MenuItem value="Classical">Classical</MenuItem>
          <MenuItem value="Country">Country</MenuItem>
          <MenuItem value="Folk">Folk</MenuItem>
          <MenuItem value="Latino">Latino</MenuItem>
          <MenuItem value="Jazz">Jazz</MenuItem>
          <MenuItem value="Pop">Pop</MenuItem>
          <MenuItem value="Reggae">Reggae</MenuItem>
          <MenuItem value="Rock">Rock</MenuItem>
          <MenuItem value="Rhythm and Blues">Rhythm and Blues</MenuItem>
          <MenuItem value="Soul">Soul</MenuItem>
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
        filesLimit={1}
        acceptedFiles={["image/*", "application/pdf"]}
        onChange={files => setFile(files[0])}
      />
      <Button
        variant="contained"
        type="submit"
        className={classes.submitButton}
      >
        Submit
      </Button>
    </form>
  );
});
