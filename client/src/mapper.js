export const mapCategories = (categories) => {
  return categories.map((item) => {
    return {
      id: item.id,
      label: item.name,
    };
  });
};

export const mapBreeds = (breeds) => {
  return breeds.map((item) => {
    return {
      id: item.id,
      name: item.name,
      wikipedia_url: item.wikipedia_url,
      temperament: item.temperament,
    };
  });
};
