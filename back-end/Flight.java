public class Flight {
    private String flightNum;
    private String departureCity;
    private String arrivalCity;
    private String departureTime;
    private double baseFare;

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
