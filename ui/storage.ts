/**
 * Hydra
 * Storage
 */

import * as fs from 'node:fs'

/** Interface for a key value store */
export interface KVStore {
  get(key: string): any
  set(key: string, value: any): void
}

/** Key Value stored backed by JSON file persistence. */
export class JSONStore implements KVStore {
  data: { [key: string]: any }
  path: string

  constructor(path: string) {
    this.path = path

    // load copy of data into memory
    if(fs.existsSync(this.path)) {
      this.data = JSON.parse(
        fs.readFileSync(this.path).toString()
      );
    } else {
      this.data = {};
    }
  }

  get(key: string): any {
    return this.data[key];
  }

  set(key: string, value: any): void {
    this.data[key] = value
    // persist data as json on disk
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}
