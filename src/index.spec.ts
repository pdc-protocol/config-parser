import * as fs from 'fs';

import { PDCPConfigFile } from './index';
import { PDCPConfig } from './types/pdcp-config';

describe('PDCPConfigFile', () => {
  let front;
  beforeEach(() => {
    front = new PDCPConfigFile();
  });

  describe('getProjectsNames', () => {
    it('should return the right data', () => {
      front.config = config;
      const res: Array<string> = front.getProjectsNames();
      expect(res).toEqual(['cool-site', 'site-du-lab']);
    });
    it('expect to throw when config is null', () => {
      front.config = null;
      expect(() => front.getProjectsNames()).toThrow();
    });
  });

  describe('parseFromFile', () => {
    it('expect to throw when yaml is not a PDCPConfigFile', async () => {
      await expect(() =>
        front.parseFromFile(
          '/home/abijuduval/config-parser/docker-compose.yml',
        ),
      ).rejects.toThrow();
    });
    it('expect to throw when readFile error', async () => {
      await expect(() =>
        front.parseFromFile(
          '/error/home/abijuduval/pdcp-server/src/configFront.yaml',
        ),
      ).rejects.toThrow();
    });
  });

  describe('parseFromString', () => {
    it('expect to resolve', async () => {
      await expect(() =>
        front.parseFromString(
          fs.promises.readFile(
            '/home/abijuduval/pdcp-server/src/configFront.yaml',
            'utf8',
          ),
        ),
      ).resolves;
    });
    it('expect to throw when there are no projects in the config', async () => {
      await expect(() =>
        front.parseFromString(
          fs.readFileSync(
            '/home/abijuduval/config-parser/src/docker-compose.yml',
            'utf8',
          ),
        ),
      ).rejects.toThrow(`config has no projects`);
    });
  });
});

const config: PDCPConfig = {
  // adapters: {
  //   database: {
  //     host: 'database-host',
  //     port: 80,
  //   },
  // },
  projects: {
    'cool-site': {
      data: {
        amis: {
          fetch: {
            api: 'meta-api.com',
          },
          purposes: ['growth'],
        },
        animaux: {
          fetch: {
            api: 'api.spa.fr',
          },
          provider: 'SPA FRANCE',
          purposes: ['advertising'],
        },
        'mot-de-passe-en-clair': {
          fetch: { adapter: 'database' },
          purposes: ['eateregg'],
        },
        nom: {
          fetch: {
            adapter: 'database',
          },
          purposes: ['personalization'],
        },
        prenom: {
          fetch: {
            adapter: 'database',
          },
          purposes: ['personalization'],
        },
        username: {
          fetch: {
            adapter: 'database',
          },
          purposes: ['personalization', 'identification'],
        },
      },
    },
    'site-du-lab': {
      data: {
        chelouterie: {
          fetch: {
            adapter: 'database',
          },
          purposes: ['bizarreries'],
        },
        nom: {
          fetch: {
            adapter: 'database',
          },
          purposes: ['personalization'],
        },
        prenom: {
          fetch: {
            adapter: 'database',
          },
          purposes: ['personalization'],
        },
      },
    },
  },
  // providers: {
  //   meta: null,
  // },
  // purposes: {
  //   advertising: {
  //     description: 'Advertising',
  //   },
  //   easteregg: {
  //     description: 'Get caught by some regulator',
  //   },
  //   growth: {
  //     description: "grow the user's community",
  //   },
  //   identification: {
  //     description: "identify user's interactions",
  //   },
  //   personalization: {
  //     description: 'personalize communications',
  //   },
  // },
};
