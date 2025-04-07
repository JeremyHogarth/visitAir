import Flight from './flight.js';
import Customer from './customer.js';
//
module.export = Reservation;

class Reservation {
    constructor() {
        this.paymentType = null;
        this.flight = null;
        this.customer = null;
        this.booked = false;
    }

    setPayment(paymentMethod) {
        this.paymentType = paymentMethod;
    }

    isBooked() {
        return this.booked;
    }

    changeBooked(newBooked) {
        this.booked = newBooked;
    }

    setPassenger(passenger) {
        this.customer = passenger;
    }

    setFlight(bookedFlight) {
        this.flight = bookedFlight;
    }

    displayReservationInfo() {
        console.log("Reservation Info:");
        console.log(`Booked: ${this.booked}`);
        console.log(`Payment Type: ${this.paymentType}`);
        if (this.customer) {
            console.log(`Customer: ${this.customer.name || "Unknown"}`);
        }
        if (this.flight) {
            console.log(`Flight: ${this.flight.flightNumber || "Unknown"}`);
        }
    }

    makeReservation(passenger, bookedFlight, paymentMethod) {
        this.setPassenger(passenger);
        this.setFlight(bookedFlight);
        this.setPayment(paymentMethod);
        this.changeBooked(true);
    }
}

