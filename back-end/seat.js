//importing relevant classes
import Flight from './flight.js';
import Customer from './customer.js';
import Plane from './plane.js';
 class Seat {

    //passes through seat number and type of seat
    constructor(seatNumber, seatClass) {
        
        // Error thrown if seat number or type is not passed
        if (!seatNumber || !seatClass) {
            throw new Error("Seat number and seat class are required.");
        }

        this.seatNumber = seatNumber;       
        this.seatClass = seatClass;         
        this.isBooked = false;              
        this.passenger = null;              
    }

    // Allows seat to be booked if its available 
    book(passenger) {
        if (this.isBooked) {
            console.log(`Seat ${this.seatNumber} is already booked.`);
            return false;
        }

        this.isBooked = true;
        this.passenger = passenger;
        return true;
    }

    //Cancel the booking if reservation is canceled
    cancelBooking() {
        this.isBooked = false;
        this.passenger = null;
    }

    // testing purposes
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
