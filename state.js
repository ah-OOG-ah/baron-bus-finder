// Holds the application's state during runtime

// Defaults to true; location remains out-of-date until it gets an update
//var outOfDate = true;

// Default location is in front of Vianney
var busLocation = {
    lat: 40.374162,
    long: -80.619249
};

export function updateBusLoc(date, lat, long) {

    busLocation.lat = lat;
    busLocation.long = long;
}

export function getBusLoc() {
    return busLocation;
}