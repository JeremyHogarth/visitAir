/**
 * A class related to a flight; it includes the ability to create flights along with the data needed for an airplane flight, as well as the ability to retrieve and print that data to a user.
 * <br>
 * Date: 4/17/2025 (last modified)
 * <br>
 * @author:Esteban Plata
 */
public class Flight {
    private String flightNum;
    private String departureCity;
    private String arrivalCity;
    private String departureTime;
    private double baseFare;

    /**
     * Constructor for flights, creating fields for flight number, where the flight is leaving from and going to, when it is departing, and the cost
     * @param flightNum the number associated with a certain flight
     * @param departureCity the city the flight is leaving from
     * @param arrivalCity the city the flight is going to 
     * @param departureTime the time the flight is departing shown as a String
     * @param baseFare the initial cost of a basic seat
     * @throws IllegalArgumentException if the flight number or base fare isn't set
     */
    public Flight(String flightNum, String departureCity, String arrivalCity, String departureTime, double baseFare) {
        if (flightNum == null || flightNum.trim().isEmpty()) {
            throw new IllegalArgumentException("Flight number must not be empty.");
        }
        if (baseFare <= 0) {
            throw new IllegalArgumentException("Base fare must be a positive number.");
        }

        this.flightNum = flightNum;
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
        this.departureTime = departureTime;
        this.baseFare = baseFare;
    }

    public String getFlightNum() {
        return flightNum;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public String getArrivalCity() {
        return arrivalCity;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public double getBaseFare() {
        return baseFare;
    }

    /**
     * By using the parameters of a Flight (FlightNum, DepartureCity, ArrivalCity, DepartureTime, and BaseFare), this prints the data of those fields as well as header "=== Flight Info ==="
     */
    public void displayFlightInfo() {
        System.out.println("=== Flight Info ===");
        System.out.println("Flight #: " + flightNum);
        System.out.println("From: " + departureCity);
        System.out.println("To: " + arrivalCity);
        System.out.println("Departure Time: " + departureTime);
        System.out.println(String.format("Base Fare: $%.2f", baseFare));
        System.out.println("====================");
    }

    public static void main(String[] args) {
        Flight flight = new Flight("DL456", "Chicago", "Miami", "8:30 AM", 280.0);
        flight.displayFlightInfo();
    }
}
