import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginTop: "30px"
  },
  media: {
    height: 140
  }
});

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
      <CardActionArea>
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
            <div className="genre">{genre}</div>
            <div className="instrument">{instrument}</div>
            <div className="blurb">{blurb}</div>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
        {onClick && (
          <Button size="small" color="primary" onClick={onClick}>
            Delete
          </Button>
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
