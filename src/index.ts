import {
  DataCategoriesConfigMap,
  DataCategoriesMap,
  NestedDataCategoriesConfigMap,
  PDCPConfig,
} from './types/pdcp-config';

export function getCategoriesFromConfig(doc: PDCPConfig): DataCategoriesMap {
  const adapters = doc.adapters;
  let categories: DataCategoriesMap = {};
  for (const [, adapter] of Object.entries(adapters)) {
    const data = adapter.data;
    if (Array.isArray(data)) {
      console.log('if array root');
      categories = {
        ...categories,
        ...getCategoriesFromDataArray(data, categories),
      };
    } else {
      categories = {
        ...categories,
        ...getCategoriesFromDataConfig(data, categories),
      };
    }
  }
  return categories;
}

export function getCategoriesFromDataArray<T>(
  data: NestedDataCategoriesConfigMap<T>,
  currentCategories: DataCategoriesMap,
): DataCategoriesMap {
  let categories = {};
  data.forEach((element) => {
    if (Array.isArray(element)) {
      console.log('if array');
      categories = {
        ...categories,
        ...getCategoriesFromDataArray(element, currentCategories),
      };
    } else {
      categories = {
        ...categories,
        ...getCategoriesFromDataConfig(element, currentCategories),
      };
    }
  });
  return categories;
}

export function getCategoriesFromDataConfig<T>(
  data: DataCategoriesConfigMap<T>,
  currentCategories: DataCategoriesMap,
): DataCategoriesMap {
  console.log('getCategoriesFromDataConfig');
  const categories: DataCategoriesMap = {};
  for (const category in data) {
    if (currentCategories[category] !== undefined) {
      throw new Error('Category ' + category + ' already defined');
    }
    categories[category] = {};
    console.log('categories', categories);
  }
  return categories;
}
