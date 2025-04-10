// ES Module style import (optional based on your setup)
 import Seat from './seat.js';
 import Customer from './customer.js';
 import Plane from './plane.js';

class Flight {
    constructor({
        flightNum,
        airline,
        destination,
        departure,
        timeOfDepart,
        timeOfArriv,
        price = 0
    }) {
        this.flightNum = flightNum;
        this.airline = airline;
        this.destination = destination;
        this.departure = departure;
        this.timeOfDepart = timeOfDepart;
        this.timeOfArriv = timeOfArriv;
        this.price = price;
    }

    setPrice(newPrice) {
        this.price = newPrice;
    }

    displayTimes() {
        console.log(`Estimated Departure Time: ${this.timeOfDepart}`);
        console.log(`Estimated Arrival Time: ${this.timeOfArriv}`);
    }

    displayFlightNum() {
        console.log(`Flight No.: ${this.flightNum}`);
    }

    displayLocations() {
        console.log(`Departing From: ${this.departure}`);
        console.log(`Arriving At: ${this.destination}`);
    }

    displayFlightInfo() {
        console.log(`--- Flight Information ---`);
        this.displayFlightNum();
        this.displayLocations();
        this.displayTimes();
        console.log(`Airline: ${this.airline}`);
        console.log(`Price: $${this.price}`);
        console.log(`--------------------------`);
    }
}

module.exports = Flight;
