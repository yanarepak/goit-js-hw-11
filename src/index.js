import { PixabayAPI } from "./js/pixabay-api";
import oneCardPhoto from "./templates/oneCardPhoto.hbs";
import Notiflix from "notiflix";
import "simplelightbox/dist/simple-lightbox.min.css";
import simpleLightbox from "simplelightbox";

const searchFormEl = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.gallery');
const searchBtnEl = document.querySelector('.search-btn')
const loadMoreBtnEl = document.querySelector('.load-more-btn');

const pixabayApi = new PixabayAPI();

const onSearchForm = async event => {
    event.preventDefault();
    
    pixabayApi.query = event.currentTarget.elements.searchQuery.value.trim();
    console.log(pixabayApi.query)

    galleryListEl.innerHTML = ""

    try {
        const {data} = await pixabayApi.fetchImages()
        console.log(data)
        if(data.hits.length === 0){
            return error
        }

        // if (searchQuery === ""){
        // Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
        // return; 
        // }

        galleryListEl.insertAdjacentHTML('beforeend', oneCardPhoto(data.hits));
        loadMoreBtnEl.classList.remove('is-hidden');
        simpleLightbox = new simpleLightbox('.gallery a');
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

    } catch (error) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.") 
    }   
}

// const onLoadMoreImg = async () => {
//     try {
//         const {data} = await pixabayApi.fetchImages();
//         console.log(data)

//         if(pixabayApi.page === data.totalHits){
//             loadMoreBtnEl.classList.add('is - hidden');
//             // return error
//         }
//         pixabayApi.page ++;
//         galleryListEl.insertAdjacentElement('beforeend', oneCardPhoto(data.hits));
//         simpleLightbox = new SimpleLightbox('.gallery a').refresh();

//     }catch(error) {
//         Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
//     }
// }

searchFormEl.addEventListener('submit', onSearchForm);
loadMoreBtnEl.addEventListener('click', onLoadMoreImg);