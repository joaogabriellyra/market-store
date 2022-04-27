export async function getCategories() {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await result.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=$${query}`);
  const products = await result.json();
  return products;
}

// Nossas Funções
export async function getProductsDetails(productID) {
  const result = await fetch(`https://api.mercadolibre.com/items/${productID}`);
  const details = await result.json();
  return details;
}
