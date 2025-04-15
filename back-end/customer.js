class Customer {
    // Constructor to handle both guests and account-holding users
    constructor(name, email = null, password = null, hasAccount = false) {
        if (!name) {
            throw new Error("Name is required");
        }

        this.name = name;
        this.email = email;
        this.password = password;
        this.hasAccount = hasAccount;
        this.uid = this.generateUID(); // Generate unique user ID
        this.typeCustomer = this.setCustomerType(); // Set account or guest type
    }

    // Method to set the account status
    setAcc(status) {
        this.hasAccount = status;
        this.uid = this.generateUID(); // Re-generate UID if account status changes
        this.typeCustomer = this.setCustomerType(); // Re-set Customer type
    }

    // Generates UID if the Customer has an account, otherwise marks as "Guest"
    generateUID() {
        return this.hasAccount ? Math.floor(Math.random() * 10000) + 1 : "Guest";
    }

    // Sets the Customer type based on account status
    setCustomerType() {
        return this.hasAccount ? "User" : "Guest";
    }

    // Gets UID of the Customer
    getUID() {
        return this.uid;
    }

    // Gets the name of the Customer
    getName() {
        return this.name;
    }

    // Updates the name of the Customer
    setName(newName) {
        if (!newName) throw new Error("Name cannot be empty");
        this.name = newName;
    }

    // Updates the password of the account if the Customer is a user
    setPassword(newPassword) {
        if (this.hasAccount) {
            if (!newPassword) throw new Error("Password cannot be empty");
            this.password = newPassword;
        } else {
            throw new Error("Guests cannot have passwords");
        }
    }

    // Displays basic info about the Customer
    displayInfo() {
        console.log(`${this.name} | UID: ${this.uid} | ${this.email ? `Email: ${this.email}` : "Guest"}`);
    }
}

module.exports = Customer;

// Creating a Customer with an account
const Customer1 = new Customer("John Doe", "john@example.com", "securePass123", true);
Customer1.displayInfo(); // John Doe | UID: 1234 | Email: john@example.com

// Creating a Customer as a guest (no email or password needed)
const Customer2 = new Customer("Jane Doe");
Customer2.displayInfo(); // Jane Doe | UID: Guest | Guest
