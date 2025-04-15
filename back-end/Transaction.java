public class Transaction extends Reservation {
    private double price;
    private double balance;
    private final double taxRate = 0.094;
    private String type;
    private boolean validated;
    private boolean approved;

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

    public void setValidation(boolean newValidation) {
        this.validated = newValidation;
    }

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

    public void setTransactionType(String requestedType) {
        if (requestedType == null || requestedType.trim().isEmpty()) {
            throw new IllegalArgumentException("Transaction type must be a valid string.");
        }
        this.type = requestedType.toLowerCase();
    }

    public String refund(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Refund amount must be a positive number.");
        }

        if ("refund".equals(this.type) && this.approved) {
            return String.format("Refund of $%.2f processed.", amount);
        }
        return "Your refund request has been denied.";
    }

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
