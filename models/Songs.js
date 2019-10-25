/* CONSTRUCTOR FOR NEW SONG DATA */

// integrations
const firebase = require('firebase');
const database = firebase.database();

class newSong {
    constructor(title, artist, year = 'N/A', instrument, file, userid) {
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.instrument = instrument;
        this.file = file;
        this.user = userid;
    }
}

function addNewSong (tt, art, yr, inst, fl){
    let userId = firebase.auth().currentUser.uid;
    let song = new newSong (tt, art, yr, inst, fl, userId);
    database.ref('/songs/',+sid).set({song});
}

export default {newSong,addNewSong}