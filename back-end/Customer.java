import java.util.UUID;

public class Customer {
    private String name;
    private String email;
    private String password;
    private boolean hasAccount;
    private String uid;
    private String typeCustomer;

    // Constructor
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

    // Overloaded constructor for guest users
    public Customer(String name) {
        this(name, null, null, false);
    }

    // Set account status
    public void setAcc(boolean status) {
        this.hasAccount = status;
        this.uid = generateUID(); // Re-generate UID if status changes
        this.typeCustomer = setCustomerType();
    }

    // Generate UID
    private String generateUID() {
        return hasAccount ? UUID.randomUUID().toString() : "Guest";
    }

    // Set Customer type
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

    // Set name
    public void setName(String newName) {
        if (newName == null || newName.isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        this.name = newName;
    }

    // Set password
    public void setPassword(String newPassword) {
        if (!hasAccount) {
            throw new UnsupportedOperationException("Guests cannot have passwords");
        }
        if (newPassword == null || newPassword.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        this.password = newPassword;
    }

    // Display info
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
