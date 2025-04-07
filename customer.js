const Flight = require('./flight.js'); // allows customer to import flight

class Customer {
    constructor(inputName, inputEmail, inputPassword) {
        this.name = inputName;
        this.email = inputEmail;
        this.password = inputPassword;
        this.uid = Math.floor(Math.random() * 10000) + 1;
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
        console.log(this.name + " | UID: " + this.uid + " | " + this.email);
    }
}

// allows other classes to use customer class
module.exports = Customer;

// display example customer info
const customer1 = new Customer("John Doe", "john@example.com", "securePass123");
customer1.displayInfo();
