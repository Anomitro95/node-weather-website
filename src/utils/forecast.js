const request = require('request')

const forecast = (data,callback)=>{
    const weatherStackURL ='http://api.weatherstack.com/current?access_key=f7f073413aed8f0d3575db139c5defc2&query='+encodeURIComponent(data.latitude)+','+encodeURIComponent(data.longitude)
    request({url : weatherStackURL, json : true}, (error, response) =>{
        if(error){
            callback("unable to connect to weather api", undefined)
        }else if(response.body.error){
            callback("unable to find location", undefined)
        }else {
            callback(undefined, {
                temperature : response.body.current.temperature,
                feelslike : response.body.current.feelslike,
                //response : response.body.current
            } )
        }
        

})
}
module.exports = forecast