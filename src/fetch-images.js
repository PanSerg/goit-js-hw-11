import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const key = '32820375-2ad81e3b731d859a46f31c661';

export default async function fetchImages(value, page) {
  try {
    const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
    const users = await response.json()
      .get(`${BASE_URL}${filter}`)
    console.log(users);
    return axios;
  } catch (error) {
    throw new Error()
  }
}

// export default async function fetchImages(value, page) {
// const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
// return await axios
//   .get(`${BASE_URL}${filter}`)
//   .then(response => response.data);
// }
