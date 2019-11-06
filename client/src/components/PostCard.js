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
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
    width: 275,
    margin:"10px",
    display:"inline-block",
    height:350,
    
    
    
    
  },
  media: {
    height: 175
  }
}));

export default function MediaCard({
  title,
  blurb,
  onClick,
  genre,
  instrument,
  link
}) {
  const classes = useStyles();
  const endsWithPdf = new URL(link).pathname.endsWith(".pdf");
  return (
    <Card className={classes.card}>
      <a
        href={link}
        target="_blank"
      >
        <CardMedia
          className={classes.media}
          style={{position: 'relative',zIndex: 0}}
        >
          {
            endsWithPdf
            ? (<Document
            file={link}>
              <Page 
              pageNumber={1}
              width={275} />
            </Document>)
            : (<img style={{width: 275}}src={link} alt="preview"/>)
          }
          
        </CardMedia>
      </a>

      <CardContent
      style={{position: 'relative',zIndex: 1, backgroundColor: '#353432'}}>
        <Typography style={{color:"goldenrod"}}gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography style={{color:"goldenrod"}} variant="body2" color="textSecondary" component="div">
          <div className="blurb">{blurb}</div>
          <div className="chipsContainer">
            <Chip style={{margin:"5px"}}
              avatar={
                <Avatar>
                  {" "}
                  <MusicNoteIcon />
                </Avatar>
              }
              label="example"
              component="a"
              href="#chip"
              clickable
            />
            <Chip style={{marginRight:"5px"}}
              avatar={<Avatar>{genre[0]}</Avatar>}
              label={genre}
              clickable
              color="primary"
            />
            <Chip label={instrument} clickable color="primary" />
          </div>
        </Typography>
      </CardContent>

      <CardActions
      style={{height: '70px',position: 'relative', zIndex: '2',backgroundColor: '#353432'}}>
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
