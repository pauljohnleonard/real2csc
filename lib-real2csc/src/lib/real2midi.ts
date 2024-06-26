import {
  MidiData,
  MidiEndOfTrackEvent,
  MidiEvent,
  MidiHeader,
} from 'midi-file';
import { Song } from 'ireal-musicxml';

export function real2midi(song: Song): MidiData {
  // const music = song.music;

  const numerator = 4;
  const denominator = 4;

  const ticksPerBeat = 384;
  const metronome = 24;
  const microsecondsPerBeat = 588235;

  const ticksPerBar = (ticksPerBeat * numerator * 4) / denominator;

  const header: MidiHeader = {
    format: 0,
    numTracks: 1,
    ticksPerBeat,
  };

  const track: MidiEvent[] = [
    {
      deltaTime: 0,
      meta: true,
      type: 'timeSignature',
      numerator,
      denominator,
      metronome,
      thirtyseconds: 8,
    },
    {
      deltaTime: 0,
      meta: true,
      type: 'setTempo',
      microsecondsPerBeat,
    },
    {
      deltaTime: 0,
      meta: true,
      type: 'keySignature',
      key: 4,
      scale: 0,
    },
  ];

  let nextEventDeltaTime = 0;
  // for (const cell of song.cells) {
  //   const nChords = cell.length;
  //   const deltaTimeChord = ticksPerBar / nChords;
  //   for (const chord of measure) {
  //     if (chord === 'p') {
  //       nextEventDeltaTime += deltaTimeChord;
  //       continue;
  //     }

  //     const event: MidiEvent = {
  //       deltaTime: nextEventDeltaTime,
  //       meta: true,
  //       type: 'text',
  //       text: chord,
  //     };
  //     nextEventDeltaTime = deltaTimeChord;
  //     track.push(event);
  //   }
  // }

  // let totTime1 = 0;
  // for (const e of track) {
  //   totTime1 += e.deltaTime;
  // }

  // const totTime2 = music.measures.length * ticksPerBar;

  // if (totTime1 > totTime2) {
  //   throw new Error('totTime1 > totTime2 : ' + totTime1 + ' > ' + totTime2);
  // }

  // const endOfTrack: MidiEndOfTrackEvent = {
  //   deltaTime: totTime2 - totTime1,
  //   meta: true,
  //   type: 'endOfTrack',
  // };

  // track.push(endOfTrack);

  const midi: MidiData = {
    header,
    tracks: [track],
  };

  return midi;
  // console.log(JSON.stringify(midi, null, 2));
}
