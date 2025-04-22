import java.util.UUID;
/**
 * Stores customer info.
 * <p>
 * Stores all of the customer's info that include seat numbers, flight info, customer account info, etc.
 * Date:4/18/25
 * @author Sean Cano
 */
public class Info {
    public Info(String cusName, String cusEmail, String cusFlightNum, String cusDepartureCity, 
    String cusArrivalCity, String cusDepartureTime, String cusSeatNumber, String cusSeatClass) {
        cusName = getName();
        cusEmail = getEmail();
        cusFlightNum = getFlightNum();
        cusDepartureCity = getDepartureCity();
        cusArrivalCity = getArrivalCity();
        cusDepartureTime = getDepartureTime();
        cusSeatNumber = getSeatNumber();
        cusSeatClass = getSeatClass();
    }
}

/*public class main {
    public static void main(String[] args) {
        ArrayList<Info> cusInfo = new ArrayList<>();
        cusInfo.add(new Info());
    }
}
*/