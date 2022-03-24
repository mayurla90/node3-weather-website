const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utill/geocode')

const app = express();

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
  res.render('index', {
    title: 'weather',
    name: 'mayur'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'this is help text',
    name: 'jay'
  })
})


app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about page',
    name: 'mayur'
  })
})
app.get('/weather', (req, res) => {

  if(!req.query.address){
   return res.send({
     error: 'must give address'
   })
  }

    geocode(req.query.address, (error, {latitude ,loc}={}) => {
      if(error){
        return   res.send({
          error: error
        });
      }      
      res.send({
        latitude:latitude,
        loc:loc,
        address:req.query.address
      })
  });  
})

app.get('/products', (req, res) => {

  if (!req.query.search) {
    return res.send({
      error: 'you must provide a serch term'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'about page',
    name: 'mayur', errormsg: 'help artical not found'
  })
})
app.get('*', (req, res) => {
  res.render('404', {
    title: 'about page',
    name: 'mayur', errormsg: 'page not found'
  })
})
app.listen(3000, () => {
  console.log('server is started on port 3000')
})