import axios from 'axios'

export class PixabayAPI{
#BASE_URL = 'https://pixabay.com/api/';
#API_KEY = '32598892-04f2af8dd617e3c39ac21f527';

query = null;

fetchImages(){
    return axios.get(`${this.#BASE_URL}`,{
        params:{
            key: this.#API_KEY,
            g: this.query,
            page: 1,
            per_page: 40,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }
    })
}
}
