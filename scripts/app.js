const formSearch = document.querySelector('form');
const detailsSrc = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUi = (data) => {

    console.log(data);
    const cityDets = data.cityDets;
    const weather = data.weather;


    detailsSrc.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    `;

    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
icon.setAttribute('src', iconSrc);
    
    
};


const updateCity = async (city) => {
    
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather}

}


formSearch.addEventListener('submit', e => {
    e.preventDefault();

    const city = formSearch.city.value.trim();
    formSearch.reset();

    updateCity(city)
        .then(data => updateUi(data))
        .catch(err => console.log(err));

})