const API_KEY = '33414632-91dc2c07012505ffb510f0739';

function fetchImg(name, page) {
  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&page=${page}&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Nothing is finding'));
  });
}
const api = {
  fetchImg,
};

export default api;
