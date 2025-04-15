// Import Reservation class
import Reservation from './reservation.js';

class Transaction extends Reservation {
    constructor(price) {
        super(); // Calls the constructor of the parent class Reservation
        
        if (typeof price !== 'number' || price <= 0) {
            throw new Error("Price must be a positive number.");
        }

        // Default properties for the transaction
        this.validated = false;  // Whether the transaction is validated or not
        this.taxRate = 0.094;    // Tax rate of 9.4%
        this.price = price;      // Original price
        this.balance = this.price + (this.price * this.taxRate); // Calculate price including tax
        this.type = null;        // Type of transaction (e.g., "payment" or "refund")
        this.approved = false;   // Approval for refund
    }

    // Sets the validation status of the transaction
    setValidation(newValidation) {
        if (typeof newValidation !== 'boolean') {
            throw new Error("Validation status must be a boolean.");
        }
        this.validated = newValidation;
    }

    // Charges the customer the required balance (including tax)
    charge(paidAmount) {
        if (typeof paidAmount !== 'number' || paidAmount <= 0) {
            throw new Error("Paid amount must be a positive number.");
        }

        if (paidAmount >= this.balance) {
            const change = paidAmount - this.balance;  // Calculate change if overpaid
            this.balance = 0; // Set balance to zero after payment
            return `Payment successful. Change: $${change.toFixed(2)}. Thank you for your purchase.`;
        }
        
        const remainingAmount = this.balance - paidAmount;
        return `Insufficient funds. You need $${remainingAmount.toFixed(2)} more.`;
    }

    // Sets the transaction type (e.g., "payment" or "refund")
    setTransactionType(requestedType) {
        if (typeof requestedType !== 'string' || !requestedType.trim()) {
            throw new Error("Transaction type must be a valid string.");
        }
        this.type = requestedType.toLowerCase(); // Store transaction type in lowercase for consistency
    }

    // Processes a refund if requested and approved
    refund(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error("Refund amount must be a positive number.");
        }

        if (this.type === "refund" && this.approved) {
            return `Refund of $${amount.toFixed(2)} processed.`;
        }
        return "Your refund request has been denied.";
    }

    // Displays the details of the transaction
    displayTransactionInfo() {
        console.log("=== Transaction Details ===");
        console.log(`Price: $${this.price.toFixed(2)}`);
        console.log(`Tax Rate: ${(this.taxRate * 100)}%`);
        console.log(`Balance (with tax): $${this.balance.toFixed(2)}`);
        console.log(`Transaction Type: ${this.type || "Not set"}`);
        console.log(`Validated: ${this.validated ? "Yes" : "No"}`);
        console.log(`Refund Approved: ${this.approved ? "Yes" : "No"}`);
        console.log("===========================");
    }
}

export default Transaction;
