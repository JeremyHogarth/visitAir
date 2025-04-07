class Plane {
    constructor(model, registrationNumber, totalSeats) {
        this.model = model;                         
        this.registrationNumber = registrationNumber;
        this.totalSeats = totalSeats;               
        this.occupiedSeats = 0;                     
    }

    bookSeat() {
        if (this.occupiedSeats < this.totalSeats) {
            this.occupiedSeats++;
            return true;
        } else {
            console.log("No available seats.");
            return false;
        }
    }

    availableSeats() {
        return this.totalSeats - this.occupiedSeats;
    }

    displayPlaneInfo() {
        console.log("Plane Info:");
        console.log(`Model: ${this.model}`);
        console.log(`Registration Number: ${this.registrationNumber}`);
        console.log(`Total Seats: ${this.totalSeats}`);
        console.log(`Occupied Seats: ${this.occupiedSeats}`);
        console.log(`Available Seats: ${this.availableSeats()}`);
    }
}


export default Plane;
import Flight from './flight.js';
import Customer from './customer.js';