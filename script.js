'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const renderCountry = function (data, className = '') {
  const languages = Object.values(data.languages)[0];
  const currencies = Object.values(data.currencies)[0].name;
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}"/>
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${languages}</p>
            <p class="country__row"><span>💰</span>${currencies}</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
///////////////////////////////////////
//Task yourself :
// 1. Show the neighbors of the selected country and call up its data when we click on any of them. Note: try to write object oriented programming while doing this.
//2. Show the countries that officially use the languages we have chosen as mother tongues.

/*
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    const neighbours = data?.borders;
    if (!neighbours) return;
    neighbours.forEach(neighbour => {
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
      request2.send();
      request2.addEventListener('load', function () {
        const [data2] = JSON.parse(this.responseText);
        renderCountry(data2, 'neighbour');
      });
    });
  });
};

//getCountryAndNeighbour('Turkey');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);

      const neighbours = data[0].borders;

      if (!neighbours) throw new Error('no neighbour found!');
      neighbours.forEach(neighbour =>
        getJSON(
          `https://restcountries.com/v3.1/alpha/${neighbour}`,
          `2: Country not found`
        )
          .then(dataN => {
            renderCountry(dataN[0], 'neighbour');
          })
          .catch(err => alert(err + ' Bak'))
      );
    })
    .catch(err => {
      renderError(`Something went wrong ${err.message}♨♨♨`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('Germany');
});
///////////////////*/
/* Coding Challenge #1*/

/*
whereAmI(52.508, 13.381);

/////////// Example for working logic
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);

Promise.resolve('Resolved Promise').then(res => console.log(res));
console.log('test End');

////////

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening ...');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You Win!');
    } else {
      reject('You lost your money');
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res));

// Promisifying setTimeout

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(res => {
    console.log(`1 second`);
    return wait(1);
  })
  .then(() => {
    console.log(`2 second`);
    return wait(1);
  })
  .then(() => {
    console.log(`3 second`);
    return wait(1);
  });

  const getPosition = function () {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=949716826320982866157x93746`
      );
    })
    .then(response => {
      if (!response.ok) throw new Error('Rejected Promise Error 404');
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      fetch(`https://restcountries.com/v3.1/name/${data.country}`)
        .then(response => {
          if (!response.ok)
            throw new Error(`Rejected Promise: ${response.status}`);
          return response.json();
        })
        .then(data => {
          if (!data) throw new Error(`Data undefined or null`);
          renderCountry(data[0]);
        });
    })
    .catch(err => console.error(`You have a ${err}`))
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);
/////*/

////// Challenge 2
/*
const images = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      images.appendChild(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject('Image not found');
    });
  });
};
const waiting = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(res => {
    currentImg = res;
    return waiting(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(res => {
    currentImg = res;
    return waiting(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(res => {
    currentImg = res;
    return waiting(2);
  })
  .then(() => (currentImg.style.display = 'none'))
  .catch(err => console.error('You have a Error:', err));

///////////////////////////*/
/*
const getPosition = function () {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

const whereAmI = async function () {
  try {
    //Geolocation
    const geoLocation = await getPosition();
    const { latitude: lat, longitude: lng } = geoLocation.coords;

    //Reverse geocoding
    const res = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=949716826320982866157x93746`
    );
    if (!res.ok) throw new Error(`Problem getting location data: ${res.ok}`);
    const data = await res.json();

    //Country data
    const resGeo = await fetch(
      `https://restcountries.com/v3.1/name/${data.country}`
    );
    if (!resGeo.ok)
      throw new Error(`Problem getting country data: ${resGeo.ok}`);
    const dataGeo = await resGeo.json();
    renderCountry(dataGeo[0]);
    return `You are in ${data.city}, ${data.country}`;
  } catch (err) {
    console.error(`1: ${err}`);
    renderError(`Something went wrong ${err.message}`);

    throw err;
  }
};

//whereAmI()
//  .then(city => console.log(city))
//  .catch(err => console.log(`${err} 22`));
console.log('First');

(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.log(`3: ${err.message}`);
  } finally {
    console.log('3: Finishedddd');
  }
})();

////////////////////////////*/

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const get3Country = async function (c1, c2, c3) {
  try {
    //const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    //const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    //const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(value => value[0].capital));
  } catch (err) {
    console.log(`1: ${err.message}`);
  }
};

get3Country('turkey', 'greece', 'bulgaria');

(async function () {
  const data = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/germany`),
    getJSON(`https://restcountries.com/v3.1/name/turkey`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
  ]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};
//Promise.race([
//  getJSON(`https://restcountries.com/v3.1/name/germany`),
//  timeout(5),
//]).then(res => console.log(res[0]));

///Challenge#3
const images = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      images.appendChild(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject('Image not found');
    });
  });
};
const waiting = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    await waiting(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    await waiting(2);
    img.style.display = 'none';

    img = await createImage('img/img-3.jpg');
    await waiting(2);
    img.style.display = 'none';
  } catch (err) {}
};

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async imgPath => await createImage(imgPath));

    const imgsEl = await Promise.all(imgs);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.log(err);
  }
};

//loadNPause('img/img-1.jpg');
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
let currentImg;
