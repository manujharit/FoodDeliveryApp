const mergeData = (oldData, newData) => {
  const set = new Set(oldData.map((data) => data.id));

  const uniqueData = newData.filter((data) => {
    if (!set.has(data.id)) return data;
  });

  return [...oldData, ...uniqueData];
};

const getResItemQuantity = (resItems, info) => {
  if (resItems) {
    const quantity = resItems[info.id]?.quantity;
    if (quantity) {
      return quantity;
    }
  }
  return 0;
};

const parseParamsAndReturnPath = (urlString, title) => {
  const parsedUrl = new URL(urlString);
  const params = new URLSearchParams(parsedUrl.search);
  const result = {};

  for (const [key, value] of params) {
    result[key] = value;
  }

  const { tags, collection_id, type } = result;

  const newParams = new URLSearchParams();
  if (tags) newParams.append('tags', tags);
  if (collection_id) newParams.append('collection_id', collection_id);
  if (type) newParams.append('type', type);
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
  newParams.append('title', capitalizedTitle);

  return `/whatsonmind?${newParams.toString()}`;
};

export { mergeData, getResItemQuantity, parseParamsAndReturnPath };
