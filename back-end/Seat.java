/**
 * Controls the seats on the plane.
 * <p>
 * Will book seats for customers, but only if the seat is available. This requires checking the status of a seat, setting the status of the seat to "booked" for use in other classes, and pairing a customer with a seat (unless the customer later cancels and frees up the seat).
 * Date: 4/17/2025 (last modified)
 * @author: Esteban Plata
 */

public class Seat {
    private String seatNumber;
    private String seatClass;
    private boolean isBooked;
    private Customer passenger;

    /**
     * Constructor for seats, creating fields for the seat number and class, whether it is booked or not, and the passenger assigned to it
     * @param seatNumber the number assigned to the seat
     * @param seatClass the class assigned to the seat (Economy, Business, or First Class)
     */
    public Seat(String seatNumber, String seatClass) {
        if (seatNumber == null || seatClass == null) {
            throw new IllegalArgumentException("Seat number and seat class are required.");
        }
        
        this.seatNumber = seatNumber;
        this.seatClass = seatClass;
        this.isBooked = false;
        this.passenger = null;
    }

    /**
     * Getter for seat number that is used in Flight class for booking 
     * @return the seat number to be booked
     */
    public String getSeatNumber() {
        return this.seatNumber;
    }

    /**
     * Getter for seat booked status to be used in Flight class to check availability
     * @return the status of the seat (whether it is booked or not)
     */
    public boolean isBooked() {
        return this.isBooked;
    }

    /**
     * Checks if seat can be booked, then cancels booking if unavailable or books for customer if available 
     * @param passenger the Customer to be checked and given the seat to
     * @return false if the seat is already taken, true if the booking was successful
     */
    public boolean book(Customer passenger) {
        if (isBooked) {
            System.out.println("Seat " + seatNumber + " is already booked.");
            return false;
        }

        this.isBooked = true;
        this.passenger = passenger;
        return true;
    }

    /**
     * Cancels booking if customer cancels, frees up seat for another customer
     */
    public void cancelBooking() {
        this.isBooked = false;
        this.passenger = null;
    }

    /**
     * Displays seat info for testing 
     */
    public void displaySeatInfo() {
        System.out.println("Seat Number: " + this.seatNumber);
        System.out.println("Seat Class: " + this.seatClass);
        System.out.println("Booked: " + this.isBooked);
        if (this.isBooked && this.passenger != null) {
            System.out.println("Passenger: " + this.passenger.getName());
        }
    }

    public static void main(String[] args) {
        // Test Seat Booking
        Seat seat1 = new Seat("12A", "Economy");
        Customer customer1 = new Customer("John Doe", "john@example.com", "password123", true);
        
        seat1.displaySeatInfo();
        seat1.book(customer1);
        seat1.displaySeatInfo();  // Should show the seat as booked with John Doe
        seat1.cancelBooking();    // Should cancel booking
        seat1.displaySeatInfo();  // Should show seat as not booked
    }
}
