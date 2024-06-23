export type RealMeasure = string[] | null;

export type RealMusic = {
  timeSignature: string;
  measures: RealMeasure[];
  raw: string;
};

export type RealSong = {
  title: string;
  composer;
  style;
  key;
  transpose;
  music;
  compStyle;
  bpm: number;
  repeats: number;
};

export type RealSongList = {
  name?: string;
  songs: RealSong[];
};
