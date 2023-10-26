export interface PDCPConfig {
  projects: ProjectsRecord;
}
export type ProjectsRecord = Record<string, ProjectConfig>;
export type ProjectConfig = {
  data: PersonalDataRecord;
};
export type PersonalDataRecord = Record<string, PersonalDataConfig>;
export interface PersonalDataConfig {
  fetch: { adapter: string } | { api: string };
  provider?: string;
  purposes: Array<string>;
}

/************************************************
export type AdaptersConfigMap = Record<string, AdapterConfig>;
export type DataCategoryMap = Record<string, never>;
export type DataCategoriesMap = Record<string, Record<string, DataCategoryMap>>;
export interface NestedDataCategoriesConfigMap<T>
  extends Array<
    DataCategoriesConfigMap<T> | NestedDataCategoriesConfigMap<T>
  > { }
export type AdapterConfig = {
  data:
  | DataCategoriesConfigMap<DataCategoryConfigMap>
  | NestedDataCategoriesConfigMap<DataCategoryConfigMap>;
};
// TODO
// On vient d'ajouter ce type, on doit peut-être renommer deux trois trucs, quoique
***************************************************/
