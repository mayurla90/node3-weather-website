const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address +'.json?access_token=pk.eyJ1IjoibWF5dXJiIiwiYSI6ImNsMTIxZGhkaTBkcGwzaW5zbDl5ejA4NWEifQ.afPIwasT3DaV6tONpFwsGQ&limit=1';

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback("not connect to api", undefined)
        } else if (body.features.length === 0) {
            callback("unable to find locaton try another", undefined)
        } else {
            //const data = JSON.parse(response.body)             
            callback(undefined,{
                latitude: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode