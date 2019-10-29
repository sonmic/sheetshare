import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import ClassIcon from "@material-ui/icons/Class";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  card: {
    maxWidth: 345,
    marginTop: "30px"
  },
  media: {
    height: 140
  }
}));

export default function MediaCard({
  title,
  blurb,
  onClick,
  genre,
  instrument
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <a
        href="https://firebasestorage.googleapis.com/v0/b/sheet-share-41538.appspot.com/o/Bohemian_Rhapsody.png?alt=media&token=d6817355-f4ee-489b-8a16-e3f86d97c75d"
        target="_blank"
      >
        <CardMedia
          className={classes.media}
          image="https://firebasestorage.googleapis.com/v0/b/sheet-share-41538.appspot.com/o/Bohemian_Rhapsody.png?alt=media&token=d6817355-f4ee-489b-8a16-e3f86d97c75d"
          title=""
        />
      </a>

      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* <div className="genre">{genre}</div>
            <div className="instrument">{instrument}</div> */}
          <div className="blurb">{blurb}</div>
          <div className="chipsContainer">
            <Chip
              avatar={
                <Avatar>
                  {" "}
                  <MusicNoteIcon />
                  {/* <QueueMusicIcon /> */}
                </Avatar>
              }
              label="example"
              component="a"
              href="#chip"
              clickable
            />
            <Chip
              avatar={<Avatar>{genre[0]}</Avatar>}
              label={genre}
              clickable
              color="primary"
            />
            <Chip label={instrument} clickable color="primary" />
          </div>
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
        {onClick && (
          <IconButton onClick={onClick} className="deleteBtn">
            <Button size="small" color="primary">
              DELETE
            </Button>
            <DeleteForeverIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

// const PostCard = ({ title, blurb, onClick, genre, instrument }) => {
//   return (

//     <div className="media" >
//       <a href="https://firebasestorage.googleapis.com/v0/b/sheet-share-41538.appspot.com/o/Bohemian_Rhapsody.png?alt=media&token=d6817355-f4ee-489b-8a16-e3f86d97c75d"
//       target="blank">
//       <img src="https://firebasestorage.googleapis.com/v0/b/sheet-share-41538.appspot.com/o/Bohemian_Rhapsody.png?alt=media&token=d6817355-f4ee-489b-8a16-e3f86d97c75d"
//         className="mr-3"
//         alt="..."
//         style={{ width: '100px', height: '100px' }} />
//         </a>

//       <div className="media-body">
//         <h3 className="mt-0">{title}</h3>
//         <h6 className="card-title">{genre}</h6>
//         <h6 className="card-title">{instrument}</h6>
//         {blurb}
//         <hr />
//         {(onClick == null)? null : <button
//           name="delete"
//           onClick={onClick}
//           className="btn btn-danger">Delete</button>
//         }
//       </div>
//     </div>
//   );
// }

// export default PostCard;
