import axios from 'axios';

const BASE_URL = 'https://api.mercadolibre.com';
const AUTHOR = {
  name: 'Jamir',
  lastname: 'Patiño',
};

const formatItems = (element) => ({
  id: element.id,
  title: element.title,
  price: {
    currency: element.currency_id,
    amount: element.price,
    decimals: 2,
  },
  picture: element.thumbnail,
  condition: element.address.state_name,
  free_shipping: element.shipping.free_shipping,
});

const formatItem = (element) => ({
      id: element.id,
      title: element.title,
      price: {
          currency: element.currency_id,
          amount: element.price,
          decimals: 2,
      },
      picture: element.pictures[0].secure_url,
      condition: element.condition,
      free_shipping: element.shipping.free_shipping,
      sold_quantity: element.sold_quantity
});

export const getItems = async (query) => {
  const response = await axios.get(`${BASE_URL}/sites/MLA/search?q=${query}`);
  const items = response.data.results.slice(0, 4).map(formatItems);
  const categories = response.data.filters.length > 0 
    ? response.data.filters.map(cat => cat.values[0].name)
    : ['Inicio', 'Productos'];

  return {
    author: AUTHOR,
    categories,
    items,
  };
};

export const getItem = async (id) => {
  const descriptionData = await axios.get(`${BASE_URL}/items/${id}/description`);
  const response = await axios.get(`${BASE_URL}/items/${id}`);
  
  const item = {
    ...formatItem(response.data),
    description: descriptionData.data.plain_text
  };

  return {
    author: AUTHOR,
    item,
  };
};