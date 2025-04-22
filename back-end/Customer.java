import java.util.UUID;
/**
 * Controls a customer's properties.
 * <p>
 * Sets a customer's name, email, password, and uid. The customer can also be a guest, in which case the they wouldn't have an account, and as such, none of those properties to be set except a name. This class also houses the getter methods for name, email, Uid, and whether an account is made or not.
 * <br>
 * Date: 4/17/2025 (last modified)
 * <br>
 * @author Esteban Plata
 */
public class Customer {
    private String name;
    private String email;
    private String password;
    private boolean hasAccount;
    private String uid;
    private String typeCustomer;

    /**
     * Constructor for customers, creating fields for their name, email, password, and whether they already have an account or not
     * @param name The customer's name
     * @param email The customer's email
     * @param password The customer's password
     * @param hasAccount boolean of whether the customer already has an account or not
     * @throws IllegalArgumentException if user didn't enter a name
     */
    public Customer() {
    }
    //^^Empty Constructor
    public Customer(String name, String email, String password, boolean hasAccount) {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }

        this.name = name;
        this.email = email;
        this.password = password;
        this.hasAccount = hasAccount;
        this.uid = generateUID();
        this.typeCustomer = setCustomerType();
    }

    /**
     * Overloaded constructor for guest users, setting the guest's email, password, and hasAccount to null instead of requiring those parameters
     * @param name The customer's name
     */
    public Customer(String name) {
        this(name, null, null, false);
    }

    // Set account status
    /**
     * sets whether a user has an account or not, and generates a UID if this status changes
     * @param status boolean of whether there is an account or not for the user
     */
    public void setAcc(boolean status) {
        this.hasAccount = status;
        this.uid = generateUID(); // Re-generate UID if status changes
        this.typeCustomer = setCustomerType();
    }

    /**
     * Generates a UID for the user if they have an account
     * @return a String of a random UUID to serve as the user's UID, or String "Guest" if they don't have an account
     */
    private String generateUID() {
        return hasAccount ? UUID.randomUUID().toString() : "Guest";
    }

    /**
     * Set customer type as either a user if they have already made an account or a guest if not
     * @return the type of customer this is (a user or guest)
     */
    private String setCustomerType() {
        return hasAccount ? "User" : "Guest";
    }

    // Getters
    public String getUID() {
        return uid;
    }

    public String getName() {
        return name;
    }

    public String getTypeCustomer() {
        return typeCustomer;
    }

    public String getEmail() {
        return email;
    }

    /**
     * Setter method to set a new user's name
     * @param newName the name of the new user
     */
    public void setName(String newName) {
        if (newName == null || newName.isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        this.name = newName;
    }

    /**
     * Setter method to set a new user's password
     * @param newPassword the password of the new user
     */
    public void setPassword(String newPassword) {
        if (!hasAccount) {
            throw new UnsupportedOperationException("Guests cannot have passwords");
        }
        if (newPassword == null || newPassword.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        this.password = newPassword;
    }

    /**
     * prints the name of a user, as well as the uid and email if they have an account or "Guest" if they don't
     */
    public void displayInfo() {
        System.out.println(name + " | UID: " + uid + " | " + (email != null ? "Email: " + email : "Guest"));
    }

    // Main method to test
    public static void main(String[] args) {
        // Account-holding Customer
        Customer Customer1 = new Customer("John Doe", "john@example.com", "securePass123", true);
        Customer1.displayInfo();

        // Guest Customer
        Customer Customer2 = new Customer("Jane Doe");
        Customer2.displayInfo();
    }
}
