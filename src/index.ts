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
    this.config = doc.toJS(); //any a la place de PDCP / 'class validator' ?
    if (this.config && !('projects' in this.config)) {
      throw new Error(`config has no projects`);
    }
  }
}
