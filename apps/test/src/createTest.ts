import * as midiManager from 'midi-file';
import * as fs from 'fs';

import { header, xmlData } from '@real2csc/lib-real2csc';

import { midiObject2 } from './midiExamp';

export function createTest() {
  console.log('Creating file...');
  const contentSizeOffset = 7;
  const midiSizeOffset = 25;
  // const midiFileStart = 29;

  const bufHeader = Buffer.from(header);
  const midi = midiManager.writeMidi(midiObject2);
  const bufXML = Buffer.from(xmlData);
  const bufMidi = Buffer.from(midi);

  // console.log(bufMidi.length);

  const buf = Buffer.concat([bufHeader, bufMidi, bufXML]);

  const totalSize = buf.length;
  const contentSize = totalSize - contentSizeOffset - 4;
  const midiSize = bufMidi.length;

  buf.writeInt32BE(contentSize, contentSizeOffset);
  buf.writeInt32BE(midiSize, midiSizeOffset);

  // const buf2 = fs.readFileSync('data/Am_F_G_E.csc');

  // if (buf2.length !== buf.length) {
  //   console.error('Lengths do not match');
  // }

  // for (let i = 0; i < buf2.length; i++) {
  //   if (buf2[i] !== buf[i]) {
  //     if (buf2[i] !== buf[i]) {
  //       console.log('DATA ERROR', i, buf2[i], buf[i]);
  //     }
  //   }
  // }

  fs.writeFileSync('data/test2.csc', buf);

  console.log('File created');
}
