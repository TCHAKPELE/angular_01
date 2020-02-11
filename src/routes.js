import { Router } from 'express';
import axios from 'axios';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Express Babel' });
});

/**
 * GET /list
 *
 * This is a sample route demonstrating
 * a simple approach to error handling and testing
 * the global error handler. You most certainly want to
 * create different/better error handlers depending on
 * your use case.
 */
routes.get('/list', (req, res, next) => {
  const { title } = req.query;

  if (title == null || title === '') {
    // You probably want to set the response HTTP status to 400 Bad Request
    // or 422 Unprocessable Entity instead of the default 500 of
    // the global error handler (e.g check out https://github.com/kbariotis/throw.js).
    // This is just for demo purposes.
    next(new Error('The "title" parameter is required'));
    return;
  }

  res.render('index', { title });
});


async function api_localisation(url) {

  const { data } = await axios.get(url);



  var [{ geometry }] = data.features
  
  console.log(geometry);

  return geometry;
}

async function api_punk(url) {

  const { data } = await axios.get(url);



  var [{ name }] = data;

  var [{ description }] = data;

  const beer={ nom: name, description: description };

  console.log(beer);

  return beer;
}

async function api_tacos(url) {

  const { data } = await axios.get(url);



  var { recipe } = data.mixin;


  console.log(recipe);

  return recipe;
}

async function api_joke(url) {

  const { data } = await axios.get(url);




  const joke = { question: data.setup, answer: data.delivery };

  console.log(joke);

  return joke;
}

async function api_fact(url) {

  const { data } = await axios.get(url);


  return data;
}



routes.get('/hi', (req, res, next) => {


  const url_localisation = 'https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&limit=1';
  const url_beer = 'https://api.punkapi.com/v2/beers/1';
    const url_tacos = 'http://taco-randomizer.herokuapp.com/random/';
  const url_fact = 'https://alexwohlbruck.github.io/cat-facts/docs/endpoints/facts.html';
  const url_joke = 'https://sv443.net/jokeapi/v2/joke/Any?idRange=0-55';


  const request1 = api_localisation(url_localisation);
  const request2 = api_punk(url_beer);
  const request3 = api_tacos(url_tacos);
  const request4 = api_fact(url_fact);
  const request5 = api_joke(url_joke);


  Promise.all([request1, request2, request3, request4, request5]).then(function (values) {
    console.log(values);
    const result = values;
    res.send('index', { result });
  });

  

  
});

export default routes;
