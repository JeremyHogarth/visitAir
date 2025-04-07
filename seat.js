class Seat {
    constructor(seatNumber, seatClass) {
        if (!seatNumber || !seatClass) {
            throw new Error("Seat number and seat class are required.");
        }

        this.seatNumber = seatNumber;       
        this.seatClass = seatClass;         
        this.isBooked = false;              
        this.passenger = null;              
    }

    book(passenger) {
        if (this.isBooked) {
            console.log(`Seat ${this.seatNumber} is already booked.`);
            return false;
        }

        this.isBooked = true;
        this.passenger = passenger;
        return true;
    }

    cancelBooking() {
        this.isBooked = false;
        this.passenger = null;
    }

    displaySeatInfo() {
        console.log(`Seat Number: ${this.seatNumber}`);
        console.log(`Seat Class: ${this.seatClass}`);
        console.log(`Booked: ${this.isBooked}`);
        if (this.isBooked && this.passenger) {
            console.log(`Passenger: ${this.passenger.name}`);
        }
    }
}

export default Seat;
import Flight from './flight.js';
import Customer from './customer.js';
import Plane from './plane.js';