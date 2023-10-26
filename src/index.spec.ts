import { PDCPConfigFile } from './index';
import { PDCPConfig } from './types/pdcp-config';

describe('getProjectsNames', () => {
  it('should return the right data', () => {
    const front = new PDCPConfigFile(
      '/home/abijuduval/pdcp-server/src/configFront.yaml',
    );
    front.config = config;
    const res: Array<string> = front.getProjectsNames();
    expect(res).toEqual(['cool-site', 'site-du-lab']);
  });
});
describe('getProjectsNames', () => {
  it('expect to throw when config is null', () => {
    const front = new PDCPConfigFile(
      '/home/abijuduval/pdcp-server/src/configFront.yaml',
    );
    front.config = null;
    expect(() => front.getProjectsNames()).toThrow();
  });
});
describe('parse', () => {
  it('expect to throw when readFile error', async () => {
    const front = new PDCPConfigFile(
      '/error/home/abijuduval/pdcp-server/src/configFront.yaml',
    );
    await expect(() => front.parse()).rejects.toThrow();
  });
});
describe('parse', () => {
  it('expect to throw when yaml is not a PDCPConfigFile', async () => {
    const front = new PDCPConfigFile(
      '/home/abijuduval/config-parser/docker-compose.yml',
    );
    // await front.parse();
    await expect(() => front.parse()).rejects.toThrow();
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

/***************************************************************************/
// describe('getDataFromProjects', () => {
//   it('should return the right data', () => {
//     const parser = new PDCPParser(
//       '/home/abijuduval/pdcp-server/src/configFront.yaml',
//     );
//     parser.doc = {
//   {
//       projects:
//       {
//         "cool-site":
//         {
//           data:
//           {
//             prenom: {
//               fetch:
//               adapter: {database}
//               purposes: {[personalization]}
//             }
//             nom: {
//               fetch:
//               adapter: database
//               purposes: [personalization]
//             },
//           },
//         },
//       },
//     },
//   }
//     const res = parser.getProjectNamesFromConfig();
//   expect(res).toThrow();
// });
// });

// it.each<{ input: PDCPConfig; output: DataCategoriesMap }>([
//   {
//     input: {
//       adapters: {
//         postgres: {
//           data: {
//             first_name: { column: 'first_name' },
//             last_name: { column: 'last_name' },
//           },
//         },
//       },
//     },
//     output: {
//       first_name: {},
//       last_name: {},
//     },
//   },
//   {
//     input: {
//       adapters: {
//         filesystem: {
//           data: { profile_picture: { path: '/pathketuveux' } },
//         },
//         postgres: {
//           data: {
//             first_name: { column: 'first_name' },
//             last_name: { column: 'last_name' },
//           },
//         },
//       },
//     },
//     output: {
//       first_name: {},
//       last_name: {},
//       profile_picture: {},
//     },
//   },
//   {
//     input: {
//       adapters: {
//         postgres: {
//           data: [
//             {
//               first_name: { column: 'first_name' },
//               last_name: { column: 'last_name' },
//             },
//             {
//               profile_picture_path: { column: 'profile_picture_path' },
//             },
//           ],
//         },
//       },
//     },
//     output: {
//       first_name: {},
//       last_name: {},
//       profile_picture_path: {},
//     },
//   },
//   {
//     input: {
//       adapters: {
//         postgres: {
//           data: [
//             [
//               [
//                 {
//                   first_name: { column: 'first_name' },
//                 },
//                 {
//                   last_name: { column: 'last_name' },
//                 },
//               ],
//               {
//                 profile_picture_path: { column: 'profile_picture_path' },
//               },
//             ],
//           ],
//         },
//       },
//     },
//     output: {
//       first_name: {},
//       last_name: {},
//       profile_picture_path: {},
//     },
//   },
//   // {
//   //   input: {
//   //     adapters: {
//   //       postgres: {
//   //         data: [
//   //           {
//   //             $extends: 'user',
//   //             first_name: { column: 'first_name' },
//   //             last_name: { column: 'last_name' },
//   //           },
//   //           {
//   //             profile_picture_path: { column: 'profile_picture_path' },
//   //           },
//   //         ],
//   //       },
//   //     },
//   //   },
//   //   output: {
//   //     first_name: {},
//   //     last_name: {},
//   //     profile_picture_path: {},
//   //   },
//   // },
// ])('should return the right data ($input, $output)', ({ input, output }) => {
//   const res = getCategoriesFromConfig(input);
//   expect(res).toEqual(output);
// });

// describe('when there is a duplicate key', () => {
//   it('should throw an error', () => {
//     expect(() =>
//       getCategoriesFromConfig({
//         adapters: {
//           mysql: {
//             data: { first_name: { column: 'first_name' } },
//           },
//           postgres: {
//             data: {
//               first_name: { column: 'first_name' },
//               last_name: { column: 'last_name' },
//             },
//           },
//         },
//       }),
//     ).toThrow();
//   });
// });
// describe('when there is a duplicate key', () => {
//   it('should throw an error', () => {
//     expect(() =>
//       getCategoriesFromConfig({
//         adapters: {
//           mysql: {
//             data: { first_name: { column: 'first_name' } },
//           },
//           postgres: {
//             data: [
//               {
//                 first_name: { column: 'first_name' },
//                 last_name: { column: 'last_name' },
//               },
//               {
//                 profile_picture_path: { column: 'profile_picture_path' },
//               },
//             ],
//           },
//         },
//       }),
//     ).toThrow();
//   });
// });
// describe('when there is a duplicate key', () => {
//   it('should throw an error', () => {
//     expect(() =>
//       getCategoriesFromConfig({
//         adapters: {
//           mysql: {
//             data: { full_name: { column: 'full_name' } },
//           },
//           postgres: {
//             data: [
//               {
//                 first_name: { column: 'first_name' },
//                 last_name: { column: 'last_name' },
//               },
//               {
//                 first_name: {},
//                 profile_picture_path: { column: 'profile_picture_path' },
//               },
//             ],
//           },
//         },
//       }),
//     ).toThrow();
//   });
// });
// });

//         expect(() =>
//           getCategoriesFromConfig({
//             adapters: {
//               mysql: {
//                 data: { first_name: { column: 'first_name' } },
//               },
//               postgres: {
//                 data: {
//                   first_name: { column: 'first_name' },
//                   last_name: { column: 'last_name' },
//                 },
//               },
//             },
//           }),
//         ).toThrow();
//       })();

//       (() => {
//         expect(() =>
//           service.getCategoriesFromConfig({
//             adapters: {
//               postgres: {
//                 data: [
//                   {
//                     first_name: { column: 'first_name' },
//                     last_name: { column: 'last_name' },
//                   },
//                   {
//                     profile_picture_path: { column: 'profile_picture_path' },
//                   },
//                 ],
//               },
//             },
//           }),
//         ).toThrow();
//       })();
//     });
//   });
// });
