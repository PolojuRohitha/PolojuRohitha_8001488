let eventIdCounter = 0;

function Event(name, category, date, seats) {
    this.id = ++eventIdCounter;
    this.name = name;
    this.category = category;
    this.date = date;
    this.seats = seats;
    this.registrations = 0;
}

Event.prototype.checkAvailability = function() {
    if (this.seats > 0) {
        return {
            available: true,
            message: `Event is available. ${this.seats} seat(s) remaining.`
        };
    } else {
        return {
            available: false,
            message: "Event is fully booked."
        };
    }
};

Event.prototype.registerAttendee = function() {
    if (this.checkAvailability().available) {
        this.seats--;
        this.registrations++;
        return true;
    }
    return false;
};

Event.prototype.getEventDetails = function() {
    return {
        id: this.id,
        name: this.name,
        category: this.category,
        date: this.date,
        seatsAvailable: this.seats,
        totalRegistrations: this.registrations
    };
};

Event.prototype.displayProperties = function() {
    const details = this.getEventDetails();
    let html = `<div class="event-card">
        <h4>${this.name}</h4>`;
    
    const entries = Object.entries(details);
    entries.forEach(([key, value]) => {
        html += `<div class="property"><strong>${key}:</strong> ${value}</div>`;
    });
    
    const availability = this.checkAvailability();
    html += `<div class="property">
        <strong>Availability:</strong> 
        <span class="${availability.available ? 'available' : 'unavailable'}">
            ${availability.message}
        </span>
    </div>`;
    
    html += `</div>`;
    return html;
};

let events = [];

function createNewEvent() {
    const nameInput = document.getElementById("eventName");
    const categoryInput = document.getElementById("eventCategory");
    const dateInput = document.getElementById("eventDate");
    const seatsInput = document.getElementById("eventSeats");
    const messageDiv = document.getElementById("createMessage");
    
    try {
        const name = nameInput.value.trim();
        const category = categoryInput.value.trim();
        const date = dateInput.value;
        const seats = parseInt(seatsInput.value);
        
        if (!name) throw new Error("Event name is required");
        if (!category) throw new Error("Category is required");
        if (!date) throw new Error("Date is required");
        if (isNaN(seats) || seats < 0) throw new Error("Seats must be a non-negative number");
        
        const newEvent = new Event(name, category, date, seats);
        events.push(newEvent);
        
        messageDiv.className = "message success";
        messageDiv.textContent = `Event "${name}" created successfully with ID: ${newEvent.id}`;
        
        nameInput.value = "";
        categoryInput.value = "";
        dateInput.value = "";
        seatsInput.value = "";
        
        displayAllEvents();
        updateAvailabilityDisplay();
        
    } catch (error) {
        messageDiv.className = "message error";
        messageDiv.textContent = `Error: ${error.message}`;
    }
}

function updateAvailabilityDisplay() {
    const container = document.getElementById("availabilityDisplay");
    
    if (events.length === 0) {
        container.innerHTML = "<p>No events created yet</p>";
        return;
    }
    
    let html = "";
    events.forEach(event => {
        const availability = event.checkAvailability();
        html += `
            <div class="event-card">
                <h4>${event.name}</h4>
                <p><strong>Category:</strong> ${event.category}</p>
                <p><strong>Date:</strong> ${event.date}</p>
                <p class="${availability.available ? 'available' : 'unavailable'}">
                    ${availability.message}
                </p>
                <button onclick="registerForEvent('${event.id}')" 
                    ${!availability.available ? 'disabled' : ''}>
                    Register
                </button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function registerForEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    
    if (event && event.registerAttendee()) {
        displayAllEvents();
        updateAvailabilityDisplay();
    }
}

function displayAllEvents() {
    const container = document.getElementById("eventsList");
    
    if (events.length === 0) {
        container.innerHTML = "<p>No events to display</p>";
        return;
    }
    
    let html = "";
    events.forEach(event => {
        html += event.displayProperties();
    });
    
    container.innerHTML = html;
}

const event1 = new Event("Summer Music Festival", "Music", "2026-07-15", 100);
const event2 = new Event("Tech Conference", "Technology", "2026-08-20", 50);
const event3 = new Event("Food Expo", "Food", "2026-06-10", 75);

events.push(event1, event2, event3);

event1.registerAttendee();
event1.registerAttendee();
event2.registerAttendee();

displayAllEvents();
updateAvailabilityDisplay();
