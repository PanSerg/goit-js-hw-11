import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const key = '32820375-2ad81e3b731d859a46f31c661';

export default async function fetchImages(value, page) {
  try {
    const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
    const response = await axios.get(filter);  
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

// export default async function fetchImages(value, page) {
// const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
// return await axios
//   .get(`${BASE_URL}${filter}`)
//   .then(response => response.data);
// }
