// import { createCRC } from '@real2csc/lib-real2csc';

// import { parseReal } from './real';
// import { real2midi } from '@real2csc/lib-real2csc';

import * as fs from 'fs';
import { Playlist } from 'ireal-musicxml';

export function convert(file: string) {
  try {
    const outfile = 'data/new.csc';

    const contents = fs.readFileSync(file, 'utf8');

    const playList = new Playlist(contents);

    console.log(JSON.stringify(playList, null, 2));
    // const song = realSonglist.songs[0];
    // console.log(JSON.stringify(song, null, 2));

    // const midiJSON = real2midi(song);
    // console.log(JSON.stringify(midiJSON, null, 2));
    // const buf = createCRC(midiJSON);
    fs.writeFileSync('out.txt', JSON.stringify(playList, null, 2), 'utf8');
    console.log('File created', outfile);
  } catch (e) {
    console.error(e);
  }
}
