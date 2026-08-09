const mergeData = (oldData, newData) => {
  const set = new Set(oldData.map((data) => data.id));

  const uniqueData = newData.filter((data) => {
    if (!set.has(data.id)) {
      return data;
    }
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
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
  const safeTags = tags || 'none';
  const safeType = type || 'none';
  const safeTitle = encodeURIComponent(capitalizedTitle);

  return `/whatsonmind/${collection_id}/${safeTags}/${safeType}/${safeTitle}`;
};

export { mergeData, getResItemQuantity, parseParamsAndReturnPath };
