// Import relevant classes
import Flight from './flight.js';
import Customer from './Customer.js';

class Reservation {
    // Default constructor upon activating the system
    constructor() {
        this.paymentType = null; // Method of Payment not set upon start
        this.flight = null; // Flight for reservation not set upon start
        this.Customer = null; // Customer booking not set upon start
        this.booked = false; // Reservation not booked upon start
    }

    // Sets the type of payment method
    setPayment(paymentMethod) {
        if (!paymentMethod) {
            throw new Error("Payment method is required.");
        }
        this.paymentType = paymentMethod;
    }

    // Updates the status of the reservation
    setBooked(status) {
        if (typeof status !== 'boolean') {
            throw new Error("Status must be a boolean value.");
        }
        this.booked = status;
    }

    // Sets who made the reservation
    setPassenger(passenger) {
        if (!(passenger instanceof Customer)) {
            throw new Error("Passenger must be an instance of the Customer class.");
        }
        this.Customer = passenger;
    }

    // Sets which flight the reservation was for
    setFlight(bookedFlight) {
        if (!(bookedFlight instanceof Flight)) {
            throw new Error("Flight must be an instance of the Flight class.");
        }
        this.flight = bookedFlight;
    }

    // Displays the reservation info
    displayReservationInfo() {
        console.log("=== Reservation Info ===");
        console.log(`Booked: ${this.booked}`);
        console.log(`Payment Type: ${this.paymentType || "Not set"}`);
        console.log(`Customer: ${this.Customer?.name || "Unknown"}`);
        console.log(`Flight: ${this.flight?.flightNum || "Unknown"}`);
        console.log("========================");
    }

    // Method used to make the reservation and update reservation info
    makeReservation(passenger, bookedFlight, paymentMethod) {
        try {
            this.setPassenger(passenger);
            this.setFlight(bookedFlight);
            this.setPayment(paymentMethod);
            this.setBooked(true);
            console.log("Reservation successfully created.");
        } catch (error) {
            console.error("Error making reservation:", error.message);
        }
    }
}

export default Reservation;
