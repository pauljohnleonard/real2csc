import {
  MidiData,
  MidiEndOfTrackEvent,
  MidiEvent,
  MidiHeader,
  MidiTextEvent,
} from 'midi-file';
import { RealSong } from './ireal/classes';

export function real2midi(song: RealSong): MidiData {
  const music = song.music;
  const numerator = music.timeSignature ? +music.timeSignature.charAt(0) : 4;
  const denominator = music.timeSignature ? +music.timeSignature.charAt(0) : 4;

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
  for (const measure of music.measures) {
    const nChords = measure.length;
    const deltaTimeChord = ticksPerBar / nChords;
    for (const chord of measure) {
      if (chord === 'p') {
        nextEventDeltaTime += deltaTimeChord;
        continue;
      }

      const event: MidiEvent = {
        deltaTime: nextEventDeltaTime,
        meta: true,
        type: 'text',
        text: chord,
      };
      nextEventDeltaTime = deltaTimeChord;
      track.push(event);
    }
  }

  let totTime1 = 0;
  for (const e of track) {
    totTime1 += e.deltaTime;
  }

  const totTime2 = music.measures.length * ticksPerBar;

  if (totTime1 > totTime2) {
    throw new Error('totTime1 > totTime2 : ' + totTime1 + ' > ' + totTime2);
  }

  const endOfTrack: MidiEndOfTrackEvent = {
    deltaTime: totTime2 - totTime1,
    meta: true,
    type: 'endOfTrack',
  };

  track.push(endOfTrack);

  const midi: MidiData = {
    header,
    tracks: [track],
  };

  return midi;
  // console.log(JSON.stringify(midi, null, 2));
}
