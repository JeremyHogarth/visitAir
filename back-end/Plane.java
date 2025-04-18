/**
 * Relates to the plane itself and its qualities that a flight is taking place on. Can handle information about the booking and display the current state of the plane
 * <br>
 * Date:
 * <br>
 * Author: X
 */
public class Plane {
    private String model;
    private String flightNumber;
    private int totalSeats;
    private int occupiedSeats;

    // Constructor
    /**
     * Constructor for planes, creating fields for the plane's model, flight number, and amount of seats on the plane
     * @param model what kind of plane this is
     * @param flightNumber the flight number corresponding to this plane's flights
     * @param totalSeats the amount of seats on a plane, as an int
     * @throws IllegalArgumentException if there is no set model number, no set flight number, or if there are 0/negative seats in the plane
     */
    public Plane(String model, String flightNumber, int totalSeats) {
        if (model == null || flightNumber == null || totalSeats <= 0) {
            throw new IllegalArgumentException("Model, registration number, and a positive seat count must be provided.");
        }

        this.model = model;
        this.flightNumber = flightNumber;
        this.totalSeats = totalSeats;
        this.occupiedSeats = 0;
    }

    /**
     * Attempts to book a seat and decrease the amount of seats left on the plane
     * @return true if a seat was booked, leading to occupied seats increasing, false if there are no seats unbooked on the plane
     */
    public boolean bookSeat() {
        if (occupiedSeats < totalSeats) {
            occupiedSeats++;
            return true;
        } else {
            System.out.println("No available seats.");
            return false;
        }
    }

    /**
     * gets available seats
     * @return number of available seats
     */
    public int availableSeats() {
        return totalSeats - occupiedSeats;
    }

    /**
     * Prints out all of the information about a plane when requested
     */
    public void displayPlaneInfo() {
        System.out.println("---- Plane Info ----");
        System.out.println("Model: " + model);
        System.out.println("Registration Number: " + flightNumber);
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
