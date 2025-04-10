import Flight from './flight.js';
import Customer from './customer.js';
// import Cart from './cart.js'; | cart class to be made

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

    setBooked(status) {
        this.booked = status;
    }

    setPassenger(passenger) {
        this.customer = passenger;
    }

    setFlight(bookedFlight) {
        this.flight = bookedFlight;
    }

    displayReservationInfo() {
        console.log("=== Reservation Info ===");
        console.log(`Booked: ${this.booked}`);
        console.log(`Payment Type: ${this.paymentType || "Not set"}`);
        console.log(`Customer: ${this.customer?.name || "Unknown"}`);
        console.log(`Flight: ${this.flight?.flightNum || "Unknown"}`);
        console.log("========================");
    }

    makeReservation(passenger, bookedFlight, paymentMethod) {
        this.setPassenger(passenger);
        this.setFlight(bookedFlight);
        this.setPayment(paymentMethod);
        this.setBooked(true);
    }
}

export default Reservation;
