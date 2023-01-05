import { PixabayAPI } from './js/pixabay-api';
import oneCardPhoto from './templates/oneCardPhoto.hbs';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

const searchFormEl = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

let totalPages = 0;

const pixabayApi = new PixabayAPI();
let simpleLightbox = new SimpleLightbox('.gallery a')

const getPhotos = async function () {
  try {
    const { data } = await pixabayApi.fetchImages();
    // console.log(data)
    totalPages = data.totalHits / pixabayApi.per_page;

    if (data.hits.length === 0) {
        loadMoreBtnEl.classList.add('is-hidden');
        return error;
    }

    if (pixabayApi.page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      loadMoreBtnEl.classList.remove('is-hidden');
    }

    galleryListEl.insertAdjacentHTML('beforeend', oneCardPhoto(data.hits));
    simpleLightbox.refresh();
    if (pixabayApi.page >= totalPages) {
      loadMoreBtnEl.classList.add('is-hidden');
      return error;
    }

  } catch (error) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
};

const onSearchForm = async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements['searchQuery'].value.trim();
  console.log(searchQuery);
  pixabayApi.query = searchQuery;

  if (searchQuery === '') {
    return Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
  }

  try {
    galleryListEl.innerHTML = '';
    pixabayApi.page = 1;
    getPhotos();

    searchFormEl.reset();
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

const onLoadMoreImg = async () => {
  pixabayApi.page += 1;
  getPhotos();
};

searchFormEl.addEventListener('submit', onSearchForm);
loadMoreBtnEl.addEventListener('click', onLoadMoreImg);
