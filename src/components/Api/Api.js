import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '39450031-d75c446a5d1cfee0bf19f39b0';

export const getItemsApi = async (inputData, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${inputData}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
  return response.data;
};
