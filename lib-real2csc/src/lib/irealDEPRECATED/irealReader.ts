const protocolRegex = /.*?irealb:\/\/([^"]*)/;
const musicPrefix = '1r34LbKcu7';

import { unscramble } from './unscramble';
import { parser } from './parser';
import { RealMusic, RealSong, RealSongList } from './classes';

function parseMusic(data): RealMusic {
  const parts = data.split(musicPrefix);
  return parser(unscramble(parts[1]));
}

function makeSong(data): RealSong {
  const parts = data.split(/=+/).filter((x) => x != ''); //split on one or more equal signs, remove the blanks
  let title,
    composer,
    style,
    key,
    transpose,
    music,
    compStyle,
    bpm,
    repeats = null;

  if (parts.length === 7) {
    [title, composer, style, key, music, bpm, repeats] = parts;
  }
  if (parts.length === 8 && parts[4].startsWith(musicPrefix)) {
    [title, composer, style, key, music, compStyle, bpm, repeats] = parts;
  }
  if (parts.length === 8 && parts[5].startsWith(musicPrefix)) {
    [title, composer, style, key, transpose, music, bpm, repeats] = parts;
  }
  if (parts.length === 9) {
    [title, composer, style, key, transpose, music, compStyle, bpm, repeats] =
      parts;
  }

  return {
    title,
    composer,
    style,
    key,
    transpose: transpose ? parseInt(transpose) : null,
    music: parseMusic(music),
    compStyle,
    bpm: bpm ? parseInt(bpm) : null,
    repeats: repeats ? parseInt(repeats) : null,
  };
}

export function iRealReader(data): RealSongList {
  const percentEncoded = protocolRegex.exec(data);
  const percentDecoded = decodeURIComponent(percentEncoded[1]);
  const parts = percentDecoded.split('==='); //songs are separated by ===

  return {
    name: parts.length > 1 ? parts.pop() : undefined,
    songs: parts.map((x) => makeSong(x)),
  };
}
