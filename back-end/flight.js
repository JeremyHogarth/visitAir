class Flight {
    constructor(setNum, setAirline, setDest, setDepart, setTOD, setTOA) {
        this.flightNum = setNum;
        this.Airline = setAirline;
        this.destination = setDest;
        this.departure = setDepart;
        this.timeOfDepart = setTOD;
        this.timeOfArriv = setTOA;
        this.price = 0; // Default price
    }

    setPrice(nPrice) {
        this.price = nPrice;
    }

    displayTimes() {
        console.log("Estimated Departure time: " + this.timeOfDepart);
        console.log("Estimated Arrival time: " + this.timeOfArriv);
    }

    displayFlightNum() {
        console.log("Flight No.: " + this.flightNum);
    }

    displayLocations() {
        console.log("Departing from: " + this.departure);
        console.log("Arriving at: " + this.destination);
    }

    displayFlightInfo() {
        this.displayFlightNum();
        this.displayLocations();
        this.displayTimes();
    }
}

// allows flight to be used by other classes
module.exports = Flight;

import Seat from './seat.js';
import Customer from './customer.js';
import Plane from './plane.js';