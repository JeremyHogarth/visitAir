// Initialize the page with Home section visible
document.addEventListener('DOMContentLoaded', function()  {
    document.querySelector('#home').style.display = 'block';
    initDatepickers();
});

//Initialize datepickers
function initDatepickers() {
    //Departure date (min today)
    $(function() {
        $('#departureDate').datepicker({
            minDate: 0,
            dateFormat: 'mm/dd/yy',
            onSelect: function(selectedDate) {
                // Set return date min date to departure date
                $('#returnDate').datepicker('option', 'minDate', selectedDate);
            }
        });

        // Return date
        $('#returnDate').datepicker({
            minDate: 0,
            dateFormat: 'mm/dd/yy'
        });
    });
}

document.getElementById('tripType').addEventListener('change', function() {
    const returnDateContainer = document.getElementById('returnDateContainer');
    if (this.value == 'round-trip') {
        returnDateContainer.style.display = 'block';
        document.getElementById('returnDate').required = true;
    } else {
        returnDateContainer.style.display = 'none';
        document.getElementById('returnDate').required = false;
    }
});



//Call initDatepickers when the reserve section is shown
document.querySelectorAll('nav am footer a.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);

        document.querySelectorAll('.content').forEach(content => {
            content.style.display = 'none';
        });

        document.getElementById(targetId).style.display = 'block';

        //Initialize datepickers if we're showing the reserve section
        if (targetId === 'reserve') {
        
        }
    });
});    


// Navigation between sections
document.querySelectorAll('nav a, footer a.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Remove #

        // Hide all content sections
        document.querySelectorAll('.content').forEach(content => {
            content.style.display = 'none';
        });

        // Show the target section
        document.getElementById(targetId).style.display = 'block';
    });
});

// Back button from privacy policy
    document.getElementById('backFromPrivacy')?.addEventListener('click', () => {
        document.getElementById('privacy').style.display = 'none';
        document.getElementById('home').style.display = 'block';
});

//Back button from terms & conditions
    document.getElementById('backFromTerms')?.addEventListener('click', () => {
        document.getElementById('terms').style.display = 'none';
        document.getElementById('home').style.display = 'block';
});


// Flight Search Form
document.getElementById('flightSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const departureCity = document.getElementById('departureCity').value.trim();
    const arrivalCity = document.getElementById('arrivalCity').value.trim();
    const flightType = document.getElementById('flightType').value;
    const passengers = parseInt(document.getElementById('passengers').value);
    const departureDate = document.getElementById('departureDate').value;
    const tripType = document.getElementById('tripType').value;
    const returnDate = tripType === 'round-trip' ? document.getElementById('returnDate').value : null;

    if (!departureCity || !arrivalCity) {
        alert('Please enter both departure and arrival cities.');
        return;
    }

    if (departureCity === arrivalCity) {
        alert('Departure and arrival cities cannot be the same.');
        return;
    }

    if (passengers < 1 || passengers > 10) {
        alert('Please enter a valid number of passengers (1-10).');
        return;
    }

    if (!departureDate) {
        alert('Please select a departure date.');
        return;
    }

    if (tripType === 'round-trip' && !returnDate) {
        alert('Please select a return date for round trips.');
        return;
    }

    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'block';

    // Simulate API call with 2-second delay
    setTimeout(() => {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('flightSearchForm').style.display = 'none';
        document.getElementById('flightOptions').style.display = 'block';
        document.getElementById('flightsList').innerHTML = '';

        // Mock flight data
        const flights = [
            { id: 1, time: '10:00 AM', duration: '2h 30m', layovers: 'None', priceRange: '$230 - $300', type: 'domestic' },
            { id: 2, time: '12:00 PM', duration: '3h 00m', layovers: '1 stop', priceRange: '$250 - $320', type: 'international' },
            { id: 3, time: '02:00 PM', duration: '2h 45m', layovers: 'None', priceRange: '$280 - $350', type: 'domestic' },
            { id: 4, time: '04:00 PM', duration: '3h 30m', layovers: '2 stops', priceRange: '$300 - $400', type: 'international' },
        ];

        const flightsList = document.getElementById('flightsList');

        flights.forEach(flight => {
            if (flightType === 'all' || flight.type === flightType) {
                const flightOption = document.createElement('div');
                flightOption.className = 'flight-option';
                flightOption.dataset.id = flight.id;
                flightOption.innerHTML = `
                    <p><strong>Time:</strong> ${flight.time}</p>
                    <p><strong>Duration:</strong> ${flight.duration}</p>
                    <p><strong>Layovers:</strong> ${flight.layovers}</p>
                    <p><strong>Price Range:</strong> ${flight.priceRange}</p>
                `;
                flightOption.addEventListener('click', () => {
                    document.getElementById('flightOptions').style.display = 'none';
                    document.getElementById('airplaneDisplay').style.display = 'block';
                    document.getElementById('seatsRemaining').textContent = passengers;
                    document.getElementById('selectedSeatsList').innerHTML = '';
                    generateSeatOverlay();
                });
                flightsList.appendChild(flightOption);
            }
        });
    }, 100);
});

let selectedSeats = [];
let totalPassengers = 1;

// Generate seat overlay on airplane image
function generateSeatOverlay() {
    const seatOverlay = document.getElementById('seatOverlay');
    seatOverlay.innerHTML = '';
    selectedSeats = [];
    totalPassengers = parseInt(document.getElementById('passengers').value);

    const seatPositions = [];

    //First Class (8 seats)
    for (let i =0; i <4; i++) {
        const top = 3 + i * 4 + '%';
        seatPositions.push(
            { top, left: '40%', class: 'first', price: '$500' },
            { top, left: '55%', class: 'first', price: '$500' }
        );
    }

    //Business Class (44 seats)
    const businessLeftPositions = ['35%', '40%', '55%', '60%'];
    for (let i =0; i < 11; i++) {
        const top = 21.5 + i * 2 + '%';
        businessLeftPositions.forEach(left => {
            seatPositions.push({ top, left, class: 'business', price: '$300' });
        });
    }

    //Economy Class
    const economyLeftPositions = ['34%', '38.5%', '43%', '52%', '56.5%', '61%']
    for (let i = 0; i < 24; i++) {
        const top = 47.5 + i * 2 + '%';
        economyLeftPositions.forEach(left => {
            seatPositions.push({ top, left, class: 'economy', price: '$150' });
        });
    }
     

    const takenSeats = [2, 5, 10, 15]; // Example taken seats

    seatPositions.forEach((pos, index) => {
        const seat = document.createElement('div');
        seat.className = `seat ${pos.class}`;
        seat.textContent = index + 1;
        seat.style.top = pos.top;
        seat.style.left = pos.left;
        seat.dataset.price = pos.price;
        seat.dataset.class = pos.class;

        if (takenSeats.includes(index + 1)) {
            seat.classList.add('taken');
        } else {
            seat.addEventListener('click', () => {
                if (selectedSeats.includes(index + 1)) {
                    // Deselect seat
                    seat.classList.remove('selected');
                    selectedSeats = selectedSeats.filter(s => s !== index + 1);
                    updateSelectedSeatsList();
                } else if (selectedSeats.length < totalPassengers) {
                    // Select seat
                    seat.classList.add('selected');
                    selectedSeats.push(index + 1);
                    updateSelectedSeatsList();
                } else {
                    alert(`You can only select ${totalPassengers} seat(s).`);
                }
                document.getElementById('seatsRemaining').textContent = totalPassengers - selectedSeats.length;
            });
            seat.addEventListener('mouseenter', () => {
                seat.setAttribute('title', `Seat ${index + 1} (${pos.class} class): ${seat.dataset.price}`);
            });
        }
        seatOverlay.appendChild(seat);
    });
}

function updateSelectedSeatsList() {
    const selectedSeatsList = document.getElementById('selectedSeatsList');
    selectedSeatsList.innerHTML = '<h4>Selected Seats:</h4>';
    
    if (selectedSeats.length === 0) {
        selectedSeatsList.innerHTML += '<p>No seats selected yet</p>';
        return;
    }
    
    const seatsContainer = document.createElement('div');
    seatsContainer.className = 'selected-seats-container';
    
    selectedSeats.forEach(seatNum => {
        const seatDiv = document.createElement('div');
        seatDiv.className = 'selected-seat-item';
        seatDiv.innerHTML = `
            <span>Seat ${seatNum}</span>
        `;
        seatsContainer.appendChild(seatDiv);
    });
    
    selectedSeatsList.appendChild(seatsContainer);
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-seat').forEach(button => {
        button.addEventListener('click', function() {
            const seatToRemove = parseInt(this.dataset.seat);
            selectedSeats = selectedSeats.filter(s => s !== seatToRemove);
            document.querySelector(`.seat[data-seat="${seatToRemove}"]`).classList.remove('selected');
            updateSelectedSeatsList();
            document.getElementById('seatsRemaining').textContent = totalPassengers - selectedSeats.length;
        });
    });
}

// Confirm seat selection
document.getElementById('confirmSeat').addEventListener('click', () => {
    if (selectedSeats.length === totalPassengers) {
        document.querySelectorAll('.content').forEach(content => {
            content.style.opacity = 0;
            setTimeout(() => (content.style.display = 'none'), 200);
        });
        
        setTimeout(() => {
            document.getElementById('transaction').style.display = 'block';
            document.getElementById('transaction').style.opacity = 1;
        }, 250);
    } else {
        alert(`Please select ${totalPassengers} seat(s). You've selected ${selectedSeats.length}.`);
    }
});

// Back to flights button
document.getElementById('backToFlights').addEventListener('click', () => {
    document.getElementById('airplaneDisplay').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('airplaneDisplay').style.display = 'none';
        document.getElementById('flightOptions').style.display = 'block';
        document.getElementById('flightOptions').style.opacity = 1;
        
        // Clear any existing selected seats
        document.querySelectorAll('.seat.selected').forEach(seat => {
            seat.classList.remove('selected');
        });
        selectedSeats = [];
    }, 200);
});

document.addEventListener('click', function(e) {
    if (e.target.closest('.flight-option')) {
        document.getElementById('flightOptions').style.display = 'none';
        document.getElementById('airplaneDisplay').style.display = 'block';
        
        // Always regenerate the seat overlay when a flight is selected
        generateSeatOverlay();
        
        // Smooth transition
        setTimeout(() => {
            document.getElementById('airplaneDisplay').style.opacity = 1;
        }, 10);
    }
});

// Transaction form submission
document.getElementById('transactionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate credit card
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    
    if (!/^\d{16}$/.test(cardNumber)) {
        alert('Please enter a valid 16-digit card number');
        return;
    }
    
    if (!/^\d{3,4}$/.test(cvv)) {
        alert('Please enter a valid CVV (3 or 4 digits)');
        return;
    }
    
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate)) {
        alert('Please enter a valid expiry date in MM/YY format');
        return;
    }

    const confirmationNumber = Math.floor(Math.random() * 1000000);
    
    // Hide all content sections
    document.querySelectorAll('.content').forEach(content => {
        content.style.opacity = 0;
        setTimeout(() => (content.style.display = 'none'), 200);
    });
    
    // Show confirmation section
    setTimeout(() => {
        const confirmation = document.getElementById('confirmation');
        confirmation.style.display = 'block';
        confirmation.style.opacity = 1;
        
        // Display confirmation details
        document.getElementById('confirmationDetails').innerHTML = `
            <p><strong>Name:</strong> ${document.getElementById('name').value}</p>
            <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
            <p><strong>Departure City:</strong> ${document.getElementById('departureCity').value}</p>
            <p><strong>Arrival City:</strong> ${document.getElementById('arrivalCity').value}</p>
            <p><strong>Number of Passengers:</strong> ${totalPassengers}</p>
            <p><strong>Seat Numbers:</strong> ${selectedSeats.join(', ')}</p>
            <p><strong>Confirmation Number:</strong> ${confirmationNumber}</p>
        `;
    }, 250);
});

// Start new booking
document.getElementById('newBooking').addEventListener('click', () => {
    // Reset forms
    document.getElementById('flightSearchForm').reset();
    document.getElementById('transactionForm').reset();
    
    // Hide all sections
    document.querySelectorAll('.content').forEach(content => {
        content.style.opacity = 0;
        setTimeout(() => (content.style.display = 'none'), 200);
    });
    
    // Show Reserve section again
    setTimeout(() => {
        const reserve = document.getElementById('reserve');
        document.getElementById('flightSearchForm').style.display = 'block';
        document.getElementById('flightOptions').style.display = 'none';
        document.getElementById('airplaneDisplay').style.display = 'none';
        reserve.style.display = 'block';
        reserve.style.opacity = 1;
    }, 250);
});

// Track Flight Form
document.getElementById('trackFlightForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const trackingNumber = document.getElementById('trackingNumber').value.trim();
    
    if (!trackingNumber) {
        alert('Please enter a confirmation number');
        return;
    }
    
    document.getElementById('trackingResult').innerHTML = `
        <p>Flight with confirmation number ${trackingNumber} is on time.</p>
        <p>Estimated departure: 10:00 AM</p>
        <p>Estimated arrival: 12:30 PM</p>
    `;
});

// Support Form
document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('supportName').value.trim();
    const email = document.getElementById('supportEmail').value.trim();
    const message = document.getElementById('supportMessage').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    alert('Your message has been submitted. We will get back to you shortly.');
    document.getElementById('supportForm').reset();
});

// Login/Signup Modal
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const authModal = document.getElementById('authModal');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const authForm = document.getElementById('authForm');

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        authModal.style.display = 'none';
        authForm.reset();
    }
});

// Login button
loginBtn.addEventListener('click', () => {
    modalTitle.textContent = 'Login';
    authModal.style.display = 'flex';
});

// Signup button
signupBtn.addEventListener('click', () => {
    modalTitle.textContent = 'Sign Up';
    authModal.style.display = 'flex';
});

// Close modal
closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
    authForm.reset();
});

// Auth form submission
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value.trim();
    const mode = modalTitle.textContent.toLowerCase();
    const endpoint = mode === 'sign up' ? 'signup' : 'login';

    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Authentication failed');

        alert(`${modalTitle.textContent} successful for ${email}`);
        authModal.style.display = 'none';
        authForm.reset();
    } catch (err) {
        alert(`Error: ${err.message}`);
    }
});