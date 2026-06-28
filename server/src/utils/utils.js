const findNodesByKeyAndValue = (node, key, value, results = []) => {
  if (node === null || typeof node !== 'object') {
    return results;
  }

  if (node[key] === value) {
    results.push(node);
  }

  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      findNodesByKeyAndValue(node[i], key, value, results);
    }
  } else {
    for (const k in node) {
      findNodesByKeyAndValue(node[k], key, value, results);
    }
  }
  return results;
};

const filterData = (data) => {
  const restaurantsData = {};
  const whatsOnYourMindNode = findNodesByKeyAndValue(
    data,
    'id',
    'whats_on_your_mind'
  )[0];
  const topBrandsNode = findNodesByKeyAndValue(
    data,
    'id',
    'top_brands_for_you'
  )[0];
  let gridListingNode = findNodesByKeyAndValue(
    data,
    'id',
    'restaurant_grid_listing'
  )[0];

  if (!gridListingNode) {
    gridListingNode = findNodesByKeyAndValue(
      data,
      'id',
      'restaurant_grid_listing_v2'
    )[0];
  }

  const nearMeNodes = findNodesByKeyAndValue(
    data,
    'id',
    'restaurant_near_me_links'
  );

  restaurantsData['whats_on_your_mind'] =
    whatsOnYourMindNode?.gridElements?.infoWithStyle?.info;
  restaurantsData['top_brands_for_you'] =
    topBrandsNode?.gridElements?.infoWithStyle?.restaurants?.map((c) => c.info);
  restaurantsData['restaurant_grid_listing'] =
    gridListingNode?.gridElements?.infoWithStyle?.restaurants?.map(
      (c) => c.info
    );
  restaurantsData['restaurant_near_me_links'] = nearMeNodes.map((node) => ({
    title: node.title,
    brands: node.brands,
  }));

  return restaurantsData;
};

const filterDataByTags = (data) => {
  const restaurantData = {};
  const sortWidgetNode = findNodesByKeyAndValue(
    data,
    '@type',
    'type.googleapis.com/swiggy.gandalf.widgets.v2.InlineViewFilterSortWidget'
  )[0];
  const mastheadNode = findNodesByKeyAndValue(
    data,
    'type',
    'COLLECTION_MASTHEAD_TYPE_IMAGE_WITH_TEXT'
  )[0];
  const restaurantNodes = findNodesByKeyAndValue(
    data,
    '@type',
    'type.googleapis.com/swiggy.presentation.food.v2.Restaurant'
  );

  restaurantData['count'] = sortWidgetNode?.restaurantCount;
  restaurantData['title'] = mastheadNode;
  restaurantData['restaurants'] = restaurantNodes
    .map((node) => node.info)
    .filter(Boolean);

  return restaurantData;
};

const filterUpdateData = (data) => {
  // Directly search for all Restaurant type nodes which holds the info
  const restaurantNodes = findNodesByKeyAndValue(
    data,
    '@type',
    'type.googleapis.com/swiggy.presentation.food.v2.Restaurant'
  );

  if (restaurantNodes.length > 0) {
    return restaurantNodes.map((node) => node.info).filter(Boolean);
  }

  // Fallback for different update formats (e.g. nested infos directly)
  let resData =
    data[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map(
      (d) => d.info
    );

  if (!resData) {
    resData = data.map((card) => card?.card?.card?.info).filter(Boolean);
  }

  return resData;
};

const filterMenuData = (data) => {
  const categories = findNodesByKeyAndValue(
    data,
    '@type',
    'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  );
  const menuData = categories.map((node) => ({
    title: node.title,
    itemCards: node.itemCards,
  }));

  return menuData;
};

export {
  filterData,
  filterUpdateData,
  filterMenuData,
  filterDataByTags,
  findNodesByKeyAndValue,
};
