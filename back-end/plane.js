// Plane class for managing plane details and seat bookings
class Plane {
    // Constructor for Plane class. Assumes all information is passed through
    constructor(model, registrationNumber, totalSeats) {
        if (!model || !registrationNumber || !totalSeats) {
            throw new Error("All fields (model, registrationNumber, totalSeats) must be provided.");
        }

        if (totalSeats <= 0) {
            throw new Error("Total seats must be a positive number.");
        }

        this.model = model;                          // Plane model
        this.registrationNumber = registrationNumber; // Registration number
        this.totalSeats = totalSeats;                // Total number of seats
        this.occupiedSeats = 0;                      // Initially no seats are occupied
    }

    // Books a seat if available, otherwise returns false
    bookSeat() {
        if (this.occupiedSeats < this.totalSeats) {
            this.occupiedSeats++;
            return true;
        } else {
            console.log("No available seats.");
            return false;
        }
    }

    // Returns the number of available seats
    availableSeats() {
        return this.totalSeats - this.occupiedSeats;
    }

    // Displays the current plane info
    displayPlaneInfo() {
        console.log("---- Plane Info ----");
        console.log(`Model: ${this.model}`);
        console.log(`Registration Number: ${this.registrationNumber}`);
        console.log(`Total Seats: ${this.totalSeats}`);
        console.log(`Occupied Seats: ${this.occupiedSeats}`);
        console.log(`Available Seats: ${this.availableSeats()}`);
        console.log("---------------------");
    }
}

export default Plane;
