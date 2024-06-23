import { header, xmlData } from './template';
import { MidiData, writeMidi } from 'midi-file';
import { Buffer } from 'buffer';

export function createCRC(midiJSON: MidiData): Buffer {
  const contentSizeOffset = 7;
  const midiSizeOffset = 25;
  // const midiFileStart = 29;

  const bufHeader = Buffer.from(header);
  const rawmidi = writeMidi(midiJSON);
  const bufXML = Buffer.from(xmlData);
  const bufMidi = Buffer.from(rawmidi);

  // console.log(bufMidi.length);

  const buf = Buffer.concat([bufHeader, bufMidi, bufXML]);

  const totalSize = buf.length;
  const contentSize = totalSize - contentSizeOffset - 4;
  const midiSize = bufMidi.length;

  buf.writeInt32BE(contentSize, contentSizeOffset);
  buf.writeInt32BE(midiSize, midiSizeOffset);

  return buf;
}
