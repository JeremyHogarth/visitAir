const Seat = require('./seat.js'); // Import Seat class
const Customer = require('./Customer.js'); // Import Customer class
const Plane = require('./plane.js'); // Import Plane class (though not used yet)

// Flight class for managing flight details and booking
class Flight {
    constructor(flightNum, airline, departure, destination, timeOfDepart, timeOfArriv, price) {
        if (!flightNum || !airline || !departure || !destination || !timeOfDepart || !timeOfArriv) {
            throw new Error("Missing required flight details: flightNum, airline, departure, destination, timeOfDepart, timeOfArriv");
        }
        
        this.flightNum = flightNum;
        this.airline = airline;
        this.departure = departure;
        this.destination = destination;
        this.timeOfDepart = timeOfDepart;
        this.timeOfArriv = timeOfArriv;
        this.price = price || 0;

        this.seats = []; // Seat objects
        this.passengers = []; // Customer objects
    }

    // Add a seat to the flight
    addSeat(seat) {
        if (!(seat instanceof Seat)) {
            throw new Error("Invalid seat object.");
        }
        this.seats.push(seat);
    }

    // Book a seat for a Customer
    bookSeat(seatNumber, Customer) {
        if (!(Customer instanceof Customer)) {
            throw new Error("Invalid Customer object.");
        }
        const seat = this.seats.find(s => s.seatNumber === seatNumber && !s.isBooked);
        if (!seat) {
            throw new Error("Seat is either already booked or doesn't exist.");
        }
        seat.book(Customer);
        this.passengers.push(Customer);
        return true;
    }

    // Update methods below

    updateAirline(newAirline) {
        if (!newAirline) {
            throw new Error("Airline name cannot be empty.");
        }
        this.airline = newAirline;
    }

    updateDeparture(newDeparture) {
        if (!newDeparture) {
            throw new Error("Departure location cannot be empty.");
        }
        this.departure = newDeparture;
    }

    updateDestination(newDestination) {
        if (!newDestination) {
            throw new Error("Destination cannot be empty.");
        }
        this.destination = newDestination;
    }

    updateDepartureTime(newTime) {
        if (!newTime) {
            throw new Error("Departure time cannot be empty.");
        }
        this.timeOfDepart = newTime;
    }

    updateArrivalTime(newTime) {
        if (!newTime) {
            throw new Error("Arrival time cannot be empty.");
        }
        this.timeOfArriv = newTime;
    }

    updatePrice(newPrice) {
        if (newPrice < 0) {
            throw new Error("Price cannot be negative.");
        }
        this.price = newPrice;
    }

    updateFlightNumber(newFlightNum) {
        if (!newFlightNum) {
            throw new Error("Flight number cannot be empty.");
        }
        this.flightNum = newFlightNum;
    }

    // Display flight information
    displayFlightInfo() {
        console.log("---- Flight Info ----");
        console.log("Flight Number: " + this.flightNum);
        console.log("Airline: " + this.airline);
        console.log("From: " + this.departure);
        console.log("To: " + this.destination);
        console.log("Departure Time: " + this.timeOfDepart);
        console.log("Arrival Time: " + this.timeOfArriv);
        console.log("Price: $" + this.price);
        console.log("Seats Available: " + this.seats.length);
        console.log("---------------------");
    }

    // Show list of passengers
    showPassengers() {
        if (this.passengers.length === 0) {
            console.log("No passengers booked for this flight.");
            return;
        }
        console.log("Passengers on flight " + this.flightNum + ":");
        this.passengers.forEach(p => {
            console.log("- " + p.name);
        });
    }
}

module.exports = Flight;
