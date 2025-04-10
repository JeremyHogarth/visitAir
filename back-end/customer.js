const Flight = require('./flight.js'); // allows customer to import flight

class Customer {
    constructor(name, email, password, hasAccount = false) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.hasAccount = hasAccount;
        this.uid = this.generateUID();
        this.typeCustomer = this.setCustomerType();
    }

    setAcc(status) {
        this.hasAccount = status;
        this.uid = this.generateUID();
        this.typeCustomer = this.setCustomerType();
    }

    generateUID() {
        return this.hasAccount ? Math.floor(Math.random() * 10000) + 1 : "Guest";
    }

    setCustomerType() {
        return this.hasAccount ? "User" : "Guest";
    }

    getUID() {
        return this.uid;
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    setPassword(newPassword) {
        this.password = newPassword;
    }

    displayInfo() {
        console.log(`${this.name} | UID: ${this.uid} | ${this.email}`);
    }
}

module.exports = Customer;

// Example usage
const customer1 = new Customer("John Doe", "john@example.com", "securePass123", true);
customer1.displayInfo();
