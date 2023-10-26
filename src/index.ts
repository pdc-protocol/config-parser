import fs from 'fs';
import { parseDocument } from 'yaml';

import { PDCPConfig } from './types/pdcp-config';

export class PDCPConfigFile {
  config: null | PDCPConfig = null;

  constructor(public configFilePath: string) { }

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
  async parse() {
    await fs.promises
      .readFile(this.configFilePath, 'utf8')
      .then((data) => {
        const doc = parseDocument(data);
        this.config = doc.toJS(); //any a la place de PDCP / 'class validator' ?
        if (this.config && !('projects' in this.config)) {
          throw new Error(`file: ${this.configFilePath} has no projects`);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
