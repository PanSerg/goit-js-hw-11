import axios from 'axios';

export default async function fetchImages(value, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const key = '32820375-2ad81e3b731d859a46f31c661';
  const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  return await axios
    .get(`${BASE_URL}${filter}`)
    .then(response => response.data);
}
