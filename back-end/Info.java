import java.util.ArrayList;
import java.util.Scanner;
/**
 * Stores customer info.
 * <p>
 * Stores all of the customer's info that include seat numbers, flight info, customer account info, etc.
 * Date: 4/18/25
 * @author Sean Cano
 */
public class Info {
    private String confirmationNumber;
    private Customer customer;
    private Flight flight;
    private Seat seat;
    private static Reservation reservation;

    // Static list to store all Info objects
    private static ArrayList<Info> infoList = new ArrayList<>();

    public Info(String confirmationNumber, Customer customer, Flight flight, Seat seat) {
        this.confirmationNumber = confirmationNumber;
        this.customer = customer;
        this.flight = flight;
        this.seat = seat;

        // Add this Info instance to the list
        infoList.add(this);
    }

    public static Info findByConfirmationNumber(String confNumber) {
        for (Info info : infoList) {
            if (reservation.getConfrimationNumber().equalsIgnoreCase(confNumber)) {
                return info;
            }
        }
        return null; // Not found
    }

    public void displayInfo() {
        System.out.println("Confirmation Number: " + confirmationNumber);
        System.out.println("Customer: " + customer.getName());
        System.out.println("Email: " + customer.getEmail());
        System.out.println("Flight: " + flight.getFlightNum());
        System.out.println("Departure: " + flight.getDepartureCity() + ", at " + flight.getDepartureTime());
        System.out.println("Destination: " + flight.getArrivalCity());
        System.out.println("Seat: " + seat.getSeatNumber());
    }

    //in class testing
    public static void main(String[] args) {
        // Sample data
        Customer customer1 = new Customer("Alice", "alice@example.com", "1234", true);
        Flight flight1 = new Flight("AA123", "Los Angeles", "New York", "10:00 AM", 51.23);
        Seat seat1 = new Seat("12A", "Economy");
        new Info("CONF001", customer1, flight1, seat1);

        Customer customer2 = new Customer("Bob", "bob@example.com", "4321", true);
        Flight flight2 = new Flight("DL456", "New York", "Chicago", "4:00 PM", 51.23);
        Seat seat2 = new Seat("14C", "First");
        new Info("CONF002", customer2, flight2, seat2);

        // Get confirmation number from user
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter confirmation number: ");
        String input = scanner.nextLine();

        Info info = Info.findByConfirmationNumber(input);
        if (info != null) {
            info.displayInfo();
        } else {
            System.out.println("No customer found with confirmation number: " + input);
        }

        scanner.close();
    }
}
