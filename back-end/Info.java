import java.util.ArrayList;
/**
 * Stores customer info.
 * <p>
 * Stores all of the customer's info that include seat numbers, flight info, customer account info, etc.
 * Date: 4/18/25
 * @author Sean Cano
 */
public class Info {
    static int intFlightNum;
    public Info() {
        Customer customerInfo = new Customer();
        Seat seatInfo = new Seat();
        Flight flightInfo = new Flight();
        String cusName = customerInfo.getName();
        String cusEmail = customerInfo.getEmail();
        String cusFlightNum = flightInfo.getFlightNum();
        String cusDepartureCity = flightInfo.getDepartureCity();
        String cusArrivalCity = flightInfo.getArrivalCity();
        String cusDepartureTime = flightInfo.getDepartureTime();
        String cusSeatNumber = seatInfo.getSeatNumber();
        String cusSeatClass = seatInfo.getSeatClass();
        intFlightNum = Integer.parseInt(cusFlightNum);
    }
    public Info(String cusName, String cusEmail, String cusFlightNum, String cusDepartureCity, 
    String cusArrivalCity, String cusDepartureTime, String cusSeatNumber, String cusSeatClass) {
    }



    /*in class testing */
    public static void main(String[] args) {
        ArrayList<Info> cusInfo = new ArrayList<>();
        cusInfo.add(intFlightNum, new Info());
    }
}
