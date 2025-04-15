public class Plane {
    private String model;
    private String registrationNumber;
    private int totalSeats;
    private int occupiedSeats;

    // Constructor
    public Plane(String model, String registrationNumber, int totalSeats) {
        if (model == null || registrationNumber == null || totalSeats <= 0) {
            throw new IllegalArgumentException("Model, registration number, and a positive seat count must be provided.");
        }

        this.model = model;
        this.registrationNumber = registrationNumber;
        this.totalSeats = totalSeats;
        this.occupiedSeats = 0;
    }

    // Attempts to book a seat, returns true if successful
    public boolean bookSeat() {
        if (occupiedSeats < totalSeats) {
            occupiedSeats++;
            return true;
        } else {
            System.out.println("No available seats.");
            return false;
        }
    }

    // Returns number of available seats
    public int availableSeats() {
        return totalSeats - occupiedSeats;
    }

    // Displays plane information
    public void displayPlaneInfo() {
        System.out.println("---- Plane Info ----");
        System.out.println("Model: " + model);
        System.out.println("Registration Number: " + registrationNumber);
        System.out.println("Total Seats: " + totalSeats);
        System.out.println("Occupied Seats: " + occupiedSeats);
        System.out.println("Available Seats: " + availableSeats());
        System.out.println("---------------------");
    }

    // In-class tester
    public static void main(String[] args) {
        Plane plane = new Plane("Boeing 737", "N12345", 3);
        plane.displayPlaneInfo();

        // Try booking all available seats + 1 extra
        for (int i = 1; i <= 4; i++) {
            System.out.println("Booking seat " + i + ": " + (plane.bookSeat() ? "Success" : "Failed"));
        }

        plane.displayPlaneInfo();
    }
}
