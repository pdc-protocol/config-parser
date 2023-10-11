export interface PDCPConfig {
  adapters: AdaptersConfigMap;
}

// TODO
// On vient d'ajouter ce type, on doit peut-être renommer deux trois trucs, quoique

export interface NestedDataCategoriesConfigMap<T>
  extends Array<
    DataCategoriesConfigMap<T> | NestedDataCategoriesConfigMap<T>
  > { }

export type AdapterConfig = {
  data:
  | DataCategoriesConfigMap<DataCategoryConfigMap>
  | NestedDataCategoriesConfigMap<DataCategoryConfigMap>;
};

export type AdaptersConfigMap = Record<string, AdapterConfig>;
export type DataCategoriesConfigMap<T> = Record<string, T>;
export type DataCategoryConfigMap = Record<string, string>;
export type DataCategoryMap = Record<string, never>;
export type DataCategoriesMap = Record<string, Record<string, DataCategoryMap>>;
