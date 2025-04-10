import Reservation from './reservation.js';

class Transaction extends Reservation {
    constructor(price) {
        super(); // Calls the constructor of the parent class Reservation
        this.validated = false;
        this.taxRate = 0.094; // Tax rate of 9.4%
        this.price = price || 0; // Default price if not provided
        this.balance = this.price + (this.price * this.taxRate); // Calculate total price with tax
        this.type = null; // Transaction type (e.g., "payment", "refund")
        this.approved = false; // Approval for refund
    }

    setValidation(newValidation) {
        this.validated = newValidation; // Set the validation status
    }

    charge(paidAmount) {
        if (paidAmount >= this.balance) {
            this.balance = 0; // Set balance to zero after payment
            return "Payment successful. Change: $" + (paidAmount - this.balance).toFixed(2) + ". Thank you for your purchase.";
        }
        return "Insufficient funds. You need $" + (this.balance - paidAmount).toFixed(2) + " more.";
    }

    setTransactionType(requestedType) {
        this.type = requestedType.toLowerCase(); // Set the type of transaction
    }

    refund(amount) {
        if (this.type === "refund" && this.approved) {
            return "Refund of $" + amount.toFixed(2) + " processed.";
        }
        return "Your refund request has been denied.";
    }


displayTransactionInfo() {
   console.log("=== Transaction Details ===");
   console.log("Price: $" + this.price.toFixed(2));
   console.log("Tax Rate: " + (this.taxRate * 100) + "%");
   console.log("Balance (with tax): $" + this.balance.toFixed(2));
   console.log("Transaction Type: " + (this.type || "Not set"));
   console.log("Validated: " + (this.validated ? "Yes" : "No"));
   console.log("Refund Approved: " + (this.approved ? "Yes" : "No"));
   console.log("===========================");

}
}
export default Transaction;
