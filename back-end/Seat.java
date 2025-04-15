public class Seat {
    private String seatNumber;
    private String seatClass;
    private boolean isBooked;
    private Customer passenger;

    // Constructor
    public Seat(String seatNumber, String seatClass) {
        if (seatNumber == null || seatClass == null) {
            throw new IllegalArgumentException("Seat number and seat class are required.");
        }
        
        this.seatNumber = seatNumber;
        this.seatClass = seatClass;
        this.isBooked = false;
        this.passenger = null;
    }

    // Getter for seat number (used in Flight class for booking)
    public String getSeatNumber() {
        return this.seatNumber;
    }

    // Getter for seat booked status (used in Flight class to check availability)
    public boolean isBooked() {
        return this.isBooked;
    }

    // Allows seat to be booked if available
    public boolean book(Customer passenger) {
        if (isBooked) {
            System.out.println("Seat " + seatNumber + " is already booked.");
            return false;
        }

        this.isBooked = true;
        this.passenger = passenger;
        return true;
    }

    // Cancel the booking if reservation is canceled
    public void cancelBooking() {
        this.isBooked = false;
        this.passenger = null;
    }

    // Display seat info for testing purposes
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
