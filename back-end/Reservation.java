/**
 * The Reservation class manages the creation and management of a flight reservation.
 * <br>
 * It handles associating a customer, flight, and payment method, as well as setting 
 * and displaying the reservation status.
 * <br>
 * Date: 4/17/2025
 * <br>
 * @author Esteban Plata
 */
public class Reservation {

    private String paymentType;
    private Flight flight;
    private Customer customer;
    private boolean booked;

    /**
     * Default constructor that initializes a Reservation object with default values.
     * The payment method, flight, and customer are set to null, and the reservation is marked as not booked.
     */
    public Reservation() {
        this.paymentType = null;
        this.flight = null;
        this.customer = null;
        this.booked = false;
    }

    /**
     * Sets the payment method for the reservation.
     * This method ensures that a valid payment method is provided (non-null and non-empty).
     * 
     * @param paymentMethod The payment method to be used for the reservation (e.g., "Credit Card", "Cash").
     * @throws IllegalArgumentException if the provided payment method is null or empty.
     */
    public void setPayment(String paymentMethod) {
        if (paymentMethod == null || paymentMethod.trim().isEmpty()) {
            throw new IllegalArgumentException("Payment method is required.");
        }
        this.paymentType = paymentMethod;
    }

    /**
     * Sets the booking status of the reservation.
     * This method marks the reservation as either booked or not based on the provided status.
     * 
     * @param status A boolean indicating whether the reservation is booked (true) or not (false).
     */
    public void setBooked(boolean status) {
        this.booked = status;
    }

    /**
     * Sets the customer making the reservation.
     * This method ensures that the provided customer object is not null.
     * 
     * @param customer The customer making the reservation.
     * @throws IllegalArgumentException if the provided customer is null.
     */
    public void setPassenger(Customer customer) {
        if (customer == null) {
            throw new IllegalArgumentException("Passenger must be provided.");
        }
        this.customer = customer;
    }

    /**
     * Sets the flight associated with the reservation.
     * This method ensures that the provided flight object is not null.
     * 
     * @param flight The flight to be associated with the reservation.
     * @throws IllegalArgumentException if the provided flight is null.
     */
    public void setFlight(Flight flight) {
        if (flight == null) {
            throw new IllegalArgumentException("Flight must be provided.");
        }
        this.flight = flight;
    }

    /**
     * Creates a reservation by associating the customer, flight, and payment method.
     * This method also sets the reservation status to booked.
     * 
     * @param customer      The customer making the reservation.
     * @param flight        The flight for the reservation.
     * @param paymentMethod The payment method to be used for the reservation.
     */
    public void makeReservation(Customer customer, Flight flight, String paymentMethod) {
        setPassenger(customer);
        setFlight(flight);
        setPayment(paymentMethod);
        setBooked(true);
        System.out.println("Reservation successfully created.");
    }

    /**
     * Displays the details of the reservation, including the booking status, payment method,
     * customer name, and flight information.
     */
    public void displayReservationInfo() {
        System.out.println("=== Reservation Info ===");
        System.out.println("Booked: " + booked);
        System.out.println("Payment Type: " + (paymentType != null ? paymentType : "Not set"));
        System.out.println("Customer: " + (customer != null ? customer.getName() : "Unknown"));
        System.out.println("Flight: " + (flight != null ? flight.getFlightNum() : "Unknown"));
        System.out.println("========================");
    }

    /**
     * Main method for testing the Reservation class functionality.
     * It creates a customer, a flight, and a reservation, then makes a reservation
     * and displays the reservation information.
     */
    public static void main(String[] args) {
        Customer customer = new Customer("Jamie Reyes", "jamie@example.com", "", false);
        Flight flight = new Flight("UA789", "San Francisco", "Seattle", "2:45 PM", 195.00);
        Reservation reservation = new Reservation();

        reservation.makeReservation(customer, flight, "Credit Card");
        reservation.displayReservationInfo();
    }
}
