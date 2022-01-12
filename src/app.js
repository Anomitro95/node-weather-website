const path = require('path')
const express = require('express')
const hbs = require('hbs')
//const forecast = require('../../node-weather-app/utils/forecast')

const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views') // getting path directory of templates folder
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()
const port = process.env.PORT || 3000

//getting the forecast/gecode files

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//configuring hbs
app.set('view engine', 'hbs')
app.set('views', viewPath) //setting views to template folder path directory(index needs to be in view path)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title :'Weather App Home',       
        name :'Anomi'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        name :'Anomi',
        title : 'About Page'
    })
})

app.get('/help',(req, res)=>{
    res.render('help', {
        help :'Please write your queries to anomitro.mukherjee@trigyn.com',
        title :'Help Page',
        name : 'Anomi'
    })
})


app.get('/weather',(req, res)=>{
        if(!req.query.address){
            return res.send({
                error : "must provide a address as query"
            })
        }
       geocode(req.query.address,(error, geoData)=>{
            if(error){
                return res.send({
                    error : error
                })
            }
            forecast(geoData,(error, forecastData)=>{
                if(error){
                    return res.send({
                        error : error
                    })
                }

                res.send({
                    forecast : forecastData,
                    location : geoData.location,
                    address : req.query.address
                })
            })

       })
       
})

app.get('/products',(req, res)=>{
        if(!req.query.search){
         return res.send({
                error :"must provide search term"
            })
        }
        res.send({
            prodocts :[]
        })

})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title : '404',
        errorMessage : 'help article not found',
        name: 'Anomi'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title : '404',
        errorMessage : 'page not available for now',
        name: 'Anomi'
    })
})

app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})

