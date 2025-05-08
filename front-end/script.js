const API_BASE_URL = 'http://localhost:8080';
const modalTitle = document.getElementById('modalTitle');
if (!modalTitle) {
  console.error('Modal title element not found!');
}
// Initialize the page with Home section visible and datepickers ready
// ---------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
  initDatepickers();

// ---------------------------------------------------------------
// Helper: centralised section switching (handles display + opacity)
// ---------------------------------------------------------------
function showSection(id) {
  document.querySelectorAll('.content').forEach(content => {
    content.style.display = 'none';
    content.style.opacity = 0;
  });

  const target = document.getElementById(id);
  if (target) {
    target.style.display = 'block';
    // allow small delay so that CSS transition (if any) can apply
    requestAnimationFrame(() => (target.style.opacity = 1));
  }
}

// ---------------------------------------------------------------
// Datepicker initialisation (jQuery UI)
// ---------------------------------------------------------------
function initDatepickers() {
  // Departure date (min today)
  $('#departureDate').datepicker({
    minDate: 0,
    dateFormat: 'mm/dd/yy',
    onSelect: selectedDate => {
      // Set return date min
      $('#returnDate').datepicker('option', 'minDate', selectedDate);
    }
  });

  // Return date
  $('#returnDate').datepicker({
    minDate: 0,
    dateFormat: 'mm/dd/yy'
  });
}

// ---------------------------------------------------------------
// One‑way / Round‑trip toggle
// ---------------------------------------------------------------
document.getElementById('tripType').addEventListener('change', function () {
  const returnDateContainer = document.getElementById('returnDateContainer');
  const returnDateInput      = document.getElementById('returnDate');

  if (this.value === 'round-trip') {
    returnDateContainer.style.display = 'block';
    returnDateInput.required = true;
  } else {
    returnDateContainer.style.display = 'none';
    returnDateInput.required = false;
  }
});

// ---------------------------------------------------------------
// Global navigation (top nav + footer links)
// ---------------------------------------------------------------
// NOTE: we rely on showSection so opacity is reset when moving away
// from Transaction / Confirmation pages.
// ---------------------------------------------------------------
document.querySelectorAll('nav a, footer a.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1); // strip '#'
    showSection(targetId);
  });
});

// ---------------------------------------------------------------
// Back buttons (privacy / terms)
// ---------------------------------------------------------------
// Safe‑navigation with optional chaining (in case element not rendered)

document.getElementById('backFromPrivacy')?.addEventListener('click', () => {
  showSection('home');
});

document.getElementById('backFromTerms')?.addEventListener('click', () => {
  showSection('home');
});

// ---------------------------------------------------------------
// FLIGHT SEARCH  →  SEAT SELECTION
// ---------------------------------------------------------------

document.getElementById('flightSearchForm').addEventListener('submit', e => {
  e.preventDefault();

  const departureCity = document.getElementById('departureCity').value.trim();
  const arrivalCity   = document.getElementById('arrivalCity').value.trim();
  const flightType    = document.getElementById('flightType').value;
  const passengers    = parseInt(document.getElementById('passengers').value, 10);
  const departureDate = document.getElementById('departureDate').value;
  const tripType      = document.getElementById('tripType').value;
  const returnDate    = tripType === 'round-trip' ? document.getElementById('returnDate').value : null;

  // Basic validation -------------------------------------------------
  if (!departureCity || !arrivalCity) {
    return alert('Please enter both departure and arrival cities.');
  }
  if (departureCity === arrivalCity) {
    return alert('Departure and arrival cities cannot be the same.');
  }
  if (passengers < 1 || passengers > 10) {
    return alert('Please enter between 1–10 passengers.');
  }
  if (!departureDate) {
    return alert('Please select a departure date.');
  }
  if (tripType === 'round-trip' && !returnDate) {
    return alert('Please select a return date for round trips.');
  }

  // Show loading spinner -------------------------------------------
  document.getElementById('loadingSpinner').style.display = 'block';

  setTimeout(() => {
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('flightSearchForm').style.display = 'none';
    document.getElementById('flightOptions').style.display = 'block';
    document.getElementById('flightsList').innerHTML = '';

    // Mock flight data ---------------------------------------------
    const flights = [
      { id: 1, time: '10:00 AM', duration: '2h 30m', layovers: 'None', priceRange: '$230 – $300', type: 'domestic' },
      { id: 2, time: '12:00 PM', duration: '3h 00m', layovers: '1 stop', priceRange: '$250 – $320', type: 'international' },
      { id: 3, time: '02:00 PM', duration: '2h 45m', layovers: 'None', priceRange: '$280 – $350', type: 'domestic' },
      { id: 4, time: '04:00 PM', duration: '3h 30m', layovers: '2 stops', priceRange: '$300 – $400', type: 'international' }
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
          <p><strong>Price Range:</strong> ${flight.priceRange}</p>`;

        flightOption.addEventListener('click', () => {
          // Hide the flight options and show the airplane display
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

// ---------------------------------------------------------------
// SEAT SELECTION LOGIC (unchanged except calls to showSection)
// ---------------------------------------------------------------
let selectedSeats   = [];
let totalPassengers = 1;

// Mock flight data for admin editing
let adminFlights = [
  { id: 1, time: '10:00 AM', duration: '2h 30m', layovers: 'None', priceRange: '$230 – $300', type: 'domestic' },
  { id: 2, time: '12:00 PM', duration: '3h 00m', layovers: '1 stop', priceRange: '$250 – $320', type: 'international' }
];

// Render flights in Admin Portal
function renderAdminFlights() {
  const flightListAdmin = document.getElementById('flightListAdmin');
  flightListAdmin.innerHTML = '';

  adminFlights.forEach(flight => {
      const flightDiv = document.createElement('div');
      flightDiv.className = 'admin-flight-item';
      flightDiv.innerHTML = `
          <p><strong>ID:</strong> ${flight.id}</p>
          <p><strong>Time:</strong> <input type="text" value="${flight.time}" data-field="time" /></p>
          <p><strong>Duration:</strong> <input type="text" value="${flight.duration}" data-field="duration" /></p>
          <p><strong>Type:</strong> 
              <select data-field="type">
                  <option ${flight.type === 'domestic' ? 'selected' : ''}>domestic</option>
                  <option ${flight.type === 'international' ? 'selected' : ''}>international</option>
              </select>
          </p>
          <button class="save-flight-btn" data-id="${flight.id}">Save</button>
          <button class="delete-flight-btn" data-id="${flight.id}">Delete</button>
      `;
      flightListAdmin.appendChild(flightDiv);
  });
}




function generateSeatOverlay () {
  const seatOverlay = document.getElementById('seatOverlay');
  seatOverlay.innerHTML = '';
  selectedSeats   = [];
  totalPassengers = parseInt(document.getElementById('passengers').value, 10);

  const seatPositions = [];

  // First class (8)
  for (let i = 0; i < 4; i++) {
    const top = 3 + i * 4 + '%';
    seatPositions.push(
      { top, left: '40%', class: 'first', price: '$500' },
      { top, left: '55%', class: 'first', price: '$500' }
    );
  }

  // Business (44)
  const businessLeft = ['35%', '40%', '55%', '60%'];
  for (let i = 0; i < 11; i++) {
    const top = 21.5 + i * 2 + '%';
    businessLeft.forEach(left => seatPositions.push({ top, left, class: 'business', price: '$300' }));
  }

  // Economy (144)
  const economyLeft = ['34%', '38.5%', '43%', '52%', '56.5%', '61%'];
  for (let i = 0; i < 24; i++) {
    const top = 47.5 + i * 2 + '%';
    economyLeft.forEach(left => seatPositions.push({ top, left, class: 'economy', price: '$150' }));
  }

  const takenSeats = [2, 5, 10, 15]; // Example taken seats

  seatPositions.forEach((pos, index) => {
    const seat = document.createElement('div');
    seat.className      = `seat ${pos.class}`;
    seat.textContent    = index + 1;
    seat.style.top      = pos.top;
    seat.style.left     = pos.left;
    seat.dataset.price  = pos.price;
    seat.dataset.class  = pos.class;

    if (takenSeats.includes(index + 1)) {
      seat.classList.add('taken');
    } else {
      seat.addEventListener('click', () => {
        if (selectedSeats.includes(index + 1)) {
          seat.classList.remove('selected');
          selectedSeats = selectedSeats.filter(s => s !== index + 1);
        } else if (selectedSeats.length < totalPassengers) {
          seat.classList.add('selected');
          selectedSeats.push(index + 1);
        } else {
          return alert(`You can only select ${totalPassengers} seat(s).`);
        }
        document.getElementById('seatsRemaining').textContent = totalPassengers - selectedSeats.length;
        updateSelectedSeatsList();
      });
      seat.addEventListener('mouseenter', () => {
        seat.title = `Seat ${index + 1} (${pos.class} class): ${pos.price}`;
      });
    }
    seatOverlay.appendChild(seat);
  });
}

function updateSelectedSeatsList () {
  const list = document.getElementById('selectedSeatsList');
  list.innerHTML = '<h4>Selected Seats:</h4>';

  if (selectedSeats.length === 0) {
    list.innerHTML += '<p>No seats selected yet</p>';
    return;
  }

  const container = document.createElement('div');
  container.className = 'selected-seats-container';
  selectedSeats.forEach(seatNum => {
    const seatDiv = document.createElement('div');
    seatDiv.className = 'selected-seat-item';
    seatDiv.innerHTML = `<span>Seat ${seatNum}</span>`;
    container.appendChild(seatDiv);
  });
  list.appendChild(container);
}

// Confirm seats → Transaction page
// ---------------------------------------------------------------
document.getElementById('confirmSeat').addEventListener('click', () => {
  if (selectedSeats.length !== totalPassengers) {
    return alert(`Please select ${totalPassengers} seat(s). You've selected ${selectedSeats.length}.`);
  }
  showSection('transaction');
});

// Back to flights list from seat map
// ---------------------------------------------------------------
document.getElementById('backToFlights').addEventListener('click', () => {
  document.getElementById('flightOptions').style.display = 'block';
  document.getElementById('airplaneDisplay').style.display = 'none';
  // Clear selected seats visually & reset list
  selectedSeats = [];
});

//Admin flight handlers
// ---------------------------------------------------------------
// Handle flight updates/deletions
document.addEventListener('click', e => {
  if (e.target.classList.contains('save-flight-btn')) {
      const flightId = parseInt(e.target.dataset.id);
      const flightItem = e.target.closest('.admin-flight-item');
      const inputs = flightItem.querySelectorAll('input, select');

      const updatedFlight = { id: flightId };
      inputs.forEach(input => {
          updatedFlight[input.dataset.field] = input.value;
      });

      adminFlights = adminFlights.map(f => f.id === flightId ? updatedFlight : f);
      alert('Flight updated!');
  }

  if (e.target.classList.contains('delete-flight-btn')) {
      const flightId = parseInt(e.target.dataset.id);
      adminFlights = adminFlights.filter(f => f.id !== flightId);
      renderAdminFlights();
      alert('Flight deleted!');
  }
});

// Add new flight
document.getElementById('addFlightBtn').addEventListener('click', () => {
  const newId = adminFlights.length + 1;
  adminFlights.push({
      id: newId,
      time: '00:00 AM',
      duration: '0h 00m',
      layovers: 'None',
      priceRange: '$0',
      type: 'domestic'
  });
  renderAdminFlights();
});


document.getElementById('addFlightBtn').addEventListener('click', () => {
  const newId = adminFlights.length + 1;
  adminFlights.push({
      id: newId,
      time: '00:00 AM',
      duration: '0h 00m',
      layovers: 'None',
      priceRange: '$0',
      type: 'domestic'
  });
  renderAdminFlights();
});

document.getElementById('backFromAdmin').addEventListener('click', () => {
  showSection('home');
});


document.getElementById('seatPricingForm').addEventListener('submit', e => {
  e.preventDefault();
  const firstClassPrice = document.getElementById('firstClassPrice').value;
  const businessClassPrice = document.getElementById('businessClassPrice').value;
  const economyClassPrice = document.getElementById('economyClassPrice').value;

  alert(`Prices updated:
      First Class: $${firstClassPrice}
      Business Class: $${businessClassPrice}
      Economy Class: $${economyClassPrice}`);
});





document.getElementById('seatPricingForm').addEventListener('submit', e => {
  e.preventDefault();
  const firstClassPrice = document.getElementById('firstClassPrice').value;
  const businessClassPrice = document.getElementById('businessClassPrice').value;
  const economyClassPrice = document.getElementById('economyClassPrice').value;

  // Update prices globally (you can store these in localStorage or a backend)
  alert(`Prices updated:
      First Class: $${firstClassPrice}
      Business Class: $${businessClassPrice}
      Economy Class: $${economyClassPrice}`);
});


// ---------------------------------------------------------------
// TRANSACTION FORM  →  BOOKING CONFIRMATION
// ---------------------------------------------------------------

document.getElementById('transactionForm').addEventListener('submit', e => {
  e.preventDefault();

  const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
  const expiryDate = document.getElementById('expiryDate').value;
  const cvv        = document.getElementById('cvv').value;

  if (!/^\d{16}$/.test(cardNumber)) {
    return alert('Please enter a valid 16‑digit card number');
  }
  if (!/^\d{3,4}$/.test(cvv)) {
    return alert('Please enter a valid CVV (3 or 4 digits)');
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
    return alert('Please enter expiry as MM/YY');
  }

  const confirmationNumber = Math.floor(Math.random() * 1_000_000);

  // Populate confirmation details ------------------------------
  document.getElementById('confirmationDetails').innerHTML = `
    <p><strong>Name:</strong> ${document.getElementById('name').value}</p>
    <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
    <p><strong>Departure City:</strong> ${document.getElementById('departureCity').value}</p>
    <p><strong>Arrival City:</strong> ${document.getElementById('arrivalCity').value}</p>
    <p><strong>Number of Passengers:</strong> ${totalPassengers}</p>
    <p><strong>Seat Numbers:</strong> ${selectedSeats.join(', ')}</p>
    <p><strong>Confirmation Number:</strong> ${confirmationNumber}</p>`;

  showSection('confirmation');
});

// Start new booking (reset forms + go back to reserve)
// ---------------------------------------------------------------
document.getElementById('newBooking').addEventListener('click', () => {
  document.getElementById('flightSearchForm').reset();
  document.getElementById('transactionForm').reset();
  showSection('reserve');
  // Reset flight‑search UI parts
  document.getElementById('flightSearchForm').style.display = 'block';
  document.getElementById('flightOptions').style.display     = 'none';
  document.getElementById('airplaneDisplay').style.display  = 'none';
});

// ---------------------------------------------------------------
// TRACK FLIGHT & SUPPORT FORMS (no major change)
// ---------------------------------------------------------------
document.getElementById('trackFlightForm').addEventListener('submit', e => {
  e.preventDefault();
  const tn = document.getElementById('trackingNumber').value.trim();
  if (!tn) return alert('Please enter a confirmation number');
  document.getElementById('trackingResult').innerHTML = `
    <p>Flight with confirmation number ${tn} is on time.</p>
    <p>Estimated departure: 10:00 AM</p>
    <p>Estimated arrival: 12:30 PM</p>`;
});

document.getElementById('supportForm').addEventListener('submit', e => {
  e.preventDefault();
  const name    = document.getElementById('supportName').value.trim();
  const email   = document.getElementById('supportEmail').value.trim();
  const message = document.getElementById('supportMessage').value.trim();
  if (!name || !email || !message) return alert('Please fill in all fields');
  alert('Your message has been submitted. We will get back to you shortly.');
  document.getElementById('supportForm').reset();
});

// ---------------------------------------------------------------
// LOGIN / SIGN‑UP MODAL (unchanged)
// ---------------------------------------------------------------
const loginBtn   = document.getElementById('loginBtn');
const signupBtn  = document.getElementById('signupBtn');
const authModal  = document.getElementById('authModal');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const authForm   = document.getElementById('authForm');

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    authModal.style.display = 'none';
    authForm.reset();
  }
});

loginBtn.addEventListener('click', () => {
  modalTitle.textContent = 'Login';
  document.getElementById('nameFields').style.display = 'none';
  document.getElementById('authForm').querySelector('input[type="submit"]').value = 'Login';
  authModal.style.display = 'flex';
});

signupBtn.addEventListener('click', () => {
  modalTitle.textContent = 'Sign Up';
  document.getElementById('nameFields').style.display = 'block';
  document.getElementById('authForm').querySelector('input[type="submit"]').value = 'Sign Up';
  authModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  authModal.style.display = 'none';
  authForm.reset();
});

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const currentMode = document.getElementById('modalTitle').textContent.toLowerCase();
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value.trim();

  if (!email || !password) {
    return alert('Please enter both email and password');
  }

  // Prepare request data
  const requestData = { email, password };
  let endpoint = '/login';

  if (currentMode === 'sign up') {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    if (!firstName || !lastName) {
      return alert('Please enter your full name');
    }
    endpoint = '/signup';
    requestData.firstName = firstName;
    requestData.lastName = lastName;
  }

  try {
    const response = await fetch(`http://localhost:8080${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    // Success handling
    alert(`${currentMode === 'sign up' ? 'Sign up' : 'Login'} successful!`);
    authModal.style.display = 'none';
    authForm.reset();

    // Handle admin status
    if (currentMode === 'login' && data.user?.isAdmin) {
      if (!document.getElementById('adminPortalBtn')) {
        const adminBtn = document.createElement('button');
        adminBtn.id = 'adminPortalBtn';
        adminBtn.textContent = 'Admin Portal';
        adminBtn.style.marginLeft = '10px';
        adminBtn.style.backgroundColor = '#d9534f';
        document.querySelector('.auth-buttons').appendChild(adminBtn);

        adminBtn.addEventListener('click', () => {
          showSection('admin');
          renderAdminFlights();
        });
      }
    }

     // Store token for future requests
     if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    // ── NEW: Replace Login/Sign-Up with “Welcome, FirstName” & Logout ──
    const authDiv = document.querySelector('.auth-buttons');
    authDiv.innerHTML = '';  // clear out the two buttons

    // Welcome message
    const welcome = document.createElement('span');
    welcome.id = 'welcomeMsg';
    welcome.textContent = `Welcome, ${data.user.firstName}`;
    authDiv.appendChild(welcome);

    // Logout button
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logoutBtn';
    logoutBtn.textContent = 'Logout';
    logoutBtn.style.marginLeft = '10px';
    authDiv.appendChild(logoutBtn);

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('authToken');
      // optionally: window.location.href = '/'; 
      location.reload();
    });
    if (data.user.isAdmin) {
      const adminBtn = document.createElement('button');
      adminBtn.id = 'adminPortalBtn';
      adminBtn.textContent = 'Admin Portal';
      adminBtn.style.marginLeft = '10px';
      // hook it up to your admin view:
      adminBtn.addEventListener('click', () => {
        showSection('admin');
        renderAdminFlights();
      });
      authDiv.appendChild(adminBtn);
    }

  } catch (err) {
    alert(`Error: ${err.message}`);
  }
});
});