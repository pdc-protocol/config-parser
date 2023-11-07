import fs from 'fs';
import { parseDocument } from 'yaml';

import type { PDCPConfig } from './types/pdcp-config';

export class PDCPConfigFile {
  config: null | PDCPConfig = null;

  constructor() { }

  getProjectsNames(): Array<string> {
    if (this.config === null) {
      throw Error('Error: config is null');
    }
    return Object.keys(this.config.projects);
  }

  // isPDCPConfig(obj: any | PDCPConfig): obj is PDCPConfig {
  //   return;
  // }
  //YAML to JSON string ou fichier
  async parseFromFile(configFilePath: string) {
    await fs.promises
      .readFile(configFilePath, 'utf8')
      .then((data) => this.parseFromString(data))
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  async parseFromString(configString) {
    const doc = parseDocument(configString);
    // console.log('doc');
    this.config = doc.toJS(); //any a la place de PDCP / 'class validator' ?
    if (this.config && !('projects' in this.config)) {
      throw new Error(`config has no projects`);
    }
  }
}

// export class PDCPConfigString {
//   config: null | PDCPConfig = null;

//   constructor(public configString: string) { }

//   getProjectsNames(): Array<string> {
//     if (this.config === null) {
//       throw Error('Error: config is null');
//     }
//     return Object.keys(this.config.projects);
//   }

//   // isPDCPConfig(obj: any | PDCPConfig): obj is PDCPConfig {
//   //   return;
//   // }
//   //YAML to JSON string ou fichier
//   async parse() {
//     await fs.promises
//       .readFile(this.configString, 'utf8')
//       .then((data) => {
//         const doc = parseDocument(data);
//         this.config = doc.toJS(); //any a la place de PDCP / 'class validator' ?
//         if (this.config && !('projects' in this.config)) {
//           throw new Error(`file: ${this.configString} has no projects`);
//         }
//       })
//       .catch((err) => {
//         throw new Error(err.message);
//       });
//   }
// }
