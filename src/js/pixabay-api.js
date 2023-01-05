import axios from 'axios';

export class PixabayAPI{
#BASE_URL = 'https://pixabay.com/api/';
#API_KEY = '32598892-04f2af8dd617e3c39ac21f527';

constructor(){
    this.query = null;
    this.image_type ='photo';
    this.page = 1;
    this.per_page = 40;
}

fetchImages(){
    return axios.get(`${this.#BASE_URL}`,{
        params:{
            key: this.#API_KEY,
            q: this.query,
            page: this.page,
            per_page: this.per_page,
            image_type: this.image_type,
            orientation: 'horizontal',
            safesearch: true,
        }
    })
}
}