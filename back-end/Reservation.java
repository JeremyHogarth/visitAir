public class Reservation {
    private String paymentType;
    private Flight flight;
    private Customer customer;
    private boolean booked;

    public Reservation() {
        this.paymentType = null;
        this.flight = null;
        this.customer = null;
        this.booked = false;
    }

    public void setPayment(String paymentMethod) {
        if (paymentMethod == null || paymentMethod.trim().isEmpty()) {
            throw new IllegalArgumentException("Payment method is required.");
        }
        this.paymentType = paymentMethod;
    }

    public void setBooked(boolean status) {
        this.booked = status;
    }

    public void setPassenger(Customer customer) {
        if (customer == null) {
            throw new IllegalArgumentException("Passenger must be provided.");
        }
        this.customer = customer;
    }

    public void setFlight(Flight flight) {
        if (flight == null) {
            throw new IllegalArgumentException("Flight must be provided.");
        }
        this.flight = flight;
    }

    public void makeReservation(Customer customer, Flight flight, String paymentMethod) {
        setPassenger(customer);
        setFlight(flight);
        setPayment(paymentMethod);
        setBooked(true);
        System.out.println("Reservation successfully created.");
    }

    public void displayReservationInfo() {
        System.out.println("=== Reservation Info ===");
        System.out.println("Booked: " + booked);
        System.out.println("Payment Type: " + (paymentType != null ? paymentType : "Not set"));
        System.out.println("Customer: " + (customer != null ? customer.getName() : "Unknown"));
        System.out.println("Flight: " + (flight != null ? flight.getFlightNum() : "Unknown"));
        System.out.println("========================");
    }

    public static void main(String[] args) {
        Customer customer = new Customer("Jamie Reyes", "jamie@example.com", "", false);
        Flight flight = new Flight("UA789", "San Francisco", "Seattle", "2:45 PM", 195.00);
        Reservation reservation = new Reservation();

        reservation.makeReservation(customer, flight, "Credit Card");
        reservation.displayReservationInfo();
    }
}
