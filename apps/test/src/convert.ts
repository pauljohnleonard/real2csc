import { createCRC } from '@real2csc/lib-real2csc';
import { RealSongList } from '@real2csc/lib-real2csc';
import { parseReal } from './real';
import { real2midi } from '@real2csc/lib-real2csc';

import * as fs from 'fs';

export function convert(file: string) {
  try {
    const outfile = 'data/new.csc';
    const realSonglist: RealSongList = parseReal(file);
    const song = realSonglist.songs[0];
    console.log(JSON.stringify(song, null, 2));

    const midiJSON = real2midi(song);
    console.log(JSON.stringify(midiJSON, null, 2));
    const buf = createCRC(midiJSON);
    fs.writeFileSync(outfile, buf);
    console.log('File created', outfile);
  } catch (e) {
    console.error(e);
  }
}
