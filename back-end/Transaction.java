/**
 * Extending the Reservation class, this class handles the transactions between customer and VisitAir, including payments and refunds
 * <br>
 * Date: 4/17/2025 (last modified)
 * <br>
 * @author Esteban Plata
 */
public class Transaction extends Reservation {
    private double price;
    private double balance;
    private final double taxRate = 0.094;
    private String type;
    private boolean validated;
    private boolean approved;

    /**
     * Constructor to make a transaction, using the constructor in Reservation.
     * This constructor also gives new fields, being price, the balance of a user, whether the transaction was validated and approved (both booleans) and type of transaction this was
     * @param price the price the user is about to pay
     * @throws IllegalArgumentException if the price to be payed isn't positive
     */
    public Transaction(double price) {
        super(); // Call to Reservation constructor
        if (price <= 0) {
            throw new IllegalArgumentException("Price must be a positive number.");
        }
        this.price = price;
        this.balance = price + (price * taxRate);
        this.validated = false;
        this.approved = false;
        this.type = null;
    }

    /**
     * Setter method to validate a transaction
     * @param newValidation a boolean to determine whether the transaction was validated or not
     */
    public void setValidation(boolean newValidation) {
        this.validated = newValidation;
    }

    /**
     * Takes away money from the user once a transaction is made
     * @param paidAmount the amount of money to charge the user
     * @return a string either telling the user that the payment was successful alond with change, or that they don't have enough money along with how much more they need
     * @throws IllegalArgumentException if the amount to be paid is negative
     */
    public String charge(double paidAmount) {
        if (paidAmount <= 0) {
            throw new IllegalArgumentException("Paid amount must be a positive number.");
        }

        if (paidAmount >= this.balance) {
            double change = paidAmount - this.balance;
            this.balance = 0;
            return String.format("Payment successful. Change: $%.2f. Thank you for your purchase.", change);
        }

        double remaining = this.balance - paidAmount;
        return String.format("Insufficient funds. You need $%.2f more.", remaining);
    }

    /**
     * Sets the type of transaction (which interaction between Visitair and user)
     * @param requestedType the type of transaction to occur
     * @throws IllegalArgumentException if the entered type of transaction isn't something VisitAir does
     */
    public void setTransactionType(String requestedType) {
        if (requestedType == null || requestedType.trim().isEmpty()) {
            throw new IllegalArgumentException("Transaction type must be a valid string.");
        }
        this.type = requestedType.toLowerCase();
    }

    /**
     * Refunds a customer for an amount they already payed after cancellation
     * @param amount the amount the customer payed/is being payed back
     * @throws IllegalArgumentException when amount to be refunded isn't a positive number
     * @return a string stating how much has been refunded and the amount if this.approved==true, or a statement that the refund has been denied if not
     */
    public String refund(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Refund amount must be a positive number.");
        }

        if ("refund".equals(this.type) && this.approved) {
            return String.format("Refund of $%.2f processed.", amount);
        }
        return "Your refund request has been denied.";
    }
    
    /**
     * Prints out all of the details regarding the transaction and the balance the customer has after the transaction
     */
    public void displayTransactionInfo() {
        System.out.println("=== Transaction Details ===");
        System.out.println(String.format("Price: $%.2f", this.price));
        System.out.println(String.format("Tax Rate: %.2f%%", this.taxRate * 100));
        System.out.println(String.format("Balance (with tax): $%.2f", this.balance));
        System.out.println("Transaction Type: " + (this.type != null ? this.type : "Not set"));
        System.out.println("Validated: " + (this.validated ? "Yes" : "No"));
        System.out.println("Refund Approved: " + (this.approved ? "Yes" : "No"));
        System.out.println("===========================");
    }

    // In-class tester
    public static void main(String[] args) {
        try {
            Transaction tx = new Transaction(200.0);
            tx.setTransactionType("payment");
            tx.setValidation(true);
            tx.displayTransactionInfo();

            String chargeResult = tx.charge(250.0);
            System.out.println(chargeResult);

            tx.setTransactionType("refund");
            tx.approved = true;
            String refundResult = tx.refund(100.0);
            System.out.println(refundResult);

        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
