import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

import {
  RealSongList,
  createCRC,
  iRealReader,
  real2midi,
} from '@real2csc/lib-real2csc';

type CRCFile = {
  name: string;
  content: Buffer;
};

@Injectable({
  providedIn: 'root',
})
export class IrealService {
  contents!: string;
  songBook!: RealSongList;
  crcFiles!: CRCFile[];
  load(contents: string) {
    this.crcFiles = [];
    this.contents = contents;
    this.songBook = iRealReader(contents);
    for (const song of this.songBook.songs) {
      console.log(song.title);
      try {
        const midiJSON = real2midi(song);
        const buf = createCRC(midiJSON);
        this.crcFiles.push({ name: song.title, content: buf });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async saveFiles() {
    // Request access to a directory
    const handle = await (window as any).showDirectoryPicker();

    for (const file of this.crcFiles) {
      // Create files in the directory
      const fileName = file.name + '.csc';
      const fileHandle = await handle.getFileHandle(fileName, {
        create: true,
      });
      const writable = await fileHandle.createWritable();
      await writable.write(file.content);
      await writable.close();
    }
  }
}
