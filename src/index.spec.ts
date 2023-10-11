import { getCategoriesFromConfig } from '.';
import { DataCategoriesMap, PDCPConfig } from './types/pdcp-config';

describe('getCategoriesFromConfig', () => {
  it('should return the right data', () => {
    const res = getCategoriesFromConfig({
      adapters: {
        postgres: {
          data: { first_name: { column: 'first_name' } },
        },
      },
    });
    expect(res).toEqual({
      first_name: {},
    });
  });

  it.each<{ input: PDCPConfig; output: DataCategoriesMap }>([
    {
      input: {
        adapters: {
          postgres: {
            data: {
              first_name: { column: 'first_name' },
              last_name: { column: 'last_name' },
            },
          },
        },
      },
      output: {
        first_name: {},
        last_name: {},
      },
    },
    {
      input: {
        adapters: {
          filesystem: {
            data: { profile_picture: { path: '/pathketuveux' } },
          },
          postgres: {
            data: {
              first_name: { column: 'first_name' },
              last_name: { column: 'last_name' },
            },
          },
        },
      },
      output: {
        first_name: {},
        last_name: {},
        profile_picture: {},
      },
    },
    {
      input: {
        adapters: {
          postgres: {
            data: [
              {
                first_name: { column: 'first_name' },
                last_name: { column: 'last_name' },
              },
              {
                profile_picture_path: { column: 'profile_picture_path' },
              },
            ],
          },
        },
      },
      output: {
        first_name: {},
        last_name: {},
        profile_picture_path: {},
      },
    },
    {
      input: {
        adapters: {
          postgres: {
            data: [
              [
                [
                  {
                    first_name: { column: 'first_name' },
                  },
                  {
                    last_name: { column: 'last_name' },
                  },
                ],
                {
                  profile_picture_path: { column: 'profile_picture_path' },
                },
              ],
            ],
          },
        },
      },
      output: {
        first_name: {},
        last_name: {},
        profile_picture_path: {},
      },
    },
    // {
    //   input: {
    //     adapters: {
    //       postgres: {
    //         data: [
    //           {
    //             $extends: 'user',
    //             first_name: { column: 'first_name' },
    //             last_name: { column: 'last_name' },
    //           },
    //           {
    //             profile_picture_path: { column: 'profile_picture_path' },
    //           },
    //         ],
    //       },
    //     },
    //   },
    //   output: {
    //     first_name: {},
    //     last_name: {},
    //     profile_picture_path: {},
    //   },
    // },
  ])('should return the right data ($input, $output)', ({ input, output }) => {
    console.log('-------------START--------------------');
    const res = getCategoriesFromConfig(input);
    console.log('-------------END--------------------');

    expect(res).toEqual(output);
  });

  describe('when there is a duplicate key', () => {
    it('should throw an error', () => {
      expect(() =>
        getCategoriesFromConfig({
          adapters: {
            mysql: {
              data: { first_name: { column: 'first_name' } },
            },
            postgres: {
              data: {
                first_name: { column: 'first_name' },
                last_name: { column: 'last_name' },
              },
            },
          },
        }),
      ).toThrow();
    });
  });
  describe('when there is a duplicate key', () => {
    it('should throw an error', () => {
      expect(() =>
        getCategoriesFromConfig({
          adapters: {
            mysql: {
              data: { first_name: { column: 'first_name' } },
            },
            postgres: {
              data: [
                {
                  first_name: { column: 'first_name' },
                  last_name: { column: 'last_name' },
                },
                {
                  profile_picture_path: { column: 'profile_picture_path' },
                },
              ],
            },
          },
        }),
      ).toThrow();
    });
  });
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
});

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
