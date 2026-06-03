const eventsArray = [];
let registrations = {};
let eventIdCounter = 0;

function addEvent(name, category, seats) {
    const event = {
        id: ++eventIdCounter,
        name: name,
        category: category,
        seats: seats,
        originalSeats: seats
    };
    eventsArray.push(event);
    return event;
}

function handleAddEvent() {
    const nameInput = querySelector("#eventName");
    const categoryInput = querySelector("#eventCategory");
    const seatsInput = querySelector("#eventSeats");
    const messageDiv = querySelector("#messageContainer");
    
    try {
        const name = nameInput.value.trim();
        const category = categoryInput.value;
        const seats = parseInt(seatsInput.value);
        
        if (!name) throw new Error("Event name is required");
        if (!category) throw new Error("Category is required");
        if (isNaN(seats) || seats < 0) throw new Error("Seats must be a non-negative number");
        
        addEvent(name, category, seats);
        
        showMessage(`Event "${name}" added successfully!`, "success", messageDiv);
        
        nameInput.value = "";
        categoryInput.value = "";
        seatsInput.value = "";
        
        renderEvents();
        
    } catch (error) {
        showMessage(`Error: ${error.message}`, "error", messageDiv);
    }
}

function renderEvents() {
    const container = querySelector("#eventsContainer");
    const countSpan = querySelector("#eventCount");
    
    countSpan.textContent = eventsArray.length;
    
    if (eventsArray.length === 0) {
        container.innerHTML = '<div class="empty-state">No events yet. Add one to get started!</div>';
        return;
    }
    
    container.innerHTML = "";
    
    eventsArray.forEach(event => {
        const eventCard = createEventCard(event);
        container.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const card = createElement("div");
    card.className = "event-card";
    card.id = `event-${event.id}`;
    
    const seatsAvailable = event.seats > 0;
    const seatsClass = seatsAvailable ? "seats-available" : "seats-unavailable";
    
    card.innerHTML = `
        <div class="event-header">
            <div class="event-title">${escapeHtml(event.name)}</div>
            <div class="event-category">${event.category}</div>
        </div>
        <div class="event-body">
            <div class="event-detail">
                <span class="event-detail-label">Category:</span>
                <span class="event-detail-value">${event.category}</span>
            </div>
            <div class="event-detail">
                <span class="event-detail-label">Total Seats:</span>
                <span class="event-detail-value">${event.originalSeats}</span>
            </div>
            <div class="event-detail">
                <span class="event-detail-label">Available:</span>
                <span class="event-detail-value ${seatsClass}">${event.seats}</span>
            </div>
            <div class="event-detail">
                <span class="event-detail-label">Registered:</span>
                <span class="event-detail-value">${event.originalSeats - event.seats}</span>
            </div>
            <div class="event-actions">
                <button class="btn-register" onclick="registerAttendee(${event.id})" 
                    ${!seatsAvailable ? 'disabled' : ''}>
                    Register
                </button>
                <button class="btn-cancel" onclick="cancelRegistration(${event.id})" 
                    ${event.originalSeats - event.seats === 0 ? 'disabled' : ''}>
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function registerAttendee(eventId) {
    const event = eventsArray.find(e => e.id === eventId);
    const messageDiv = querySelector("#messageContainer");
    
    try {
        if (!event) throw new Error("Event not found");
        if (event.seats <= 0) throw new Error("No seats available");
        
        event.seats--;
        
        showMessage(`Successfully registered for "${event.name}"!`, "success", messageDiv);
        
        updateEventCard(eventId);
        
    } catch (error) {
        showMessage(`Error: ${error.message}`, "error", messageDiv);
    }
}

function cancelRegistration(eventId) {
    const event = eventsArray.find(e => e.id === eventId);
    const messageDiv = querySelector("#messageContainer");
    
    try {
        if (!event) throw new Error("Event not found");
        if (event.seats >= event.originalSeats) throw new Error("No registrations to cancel");
        
        event.seats++;
        
        showMessage(`Registration cancelled for "${event.name}"!`, "success", messageDiv);
        
        updateEventCard(eventId);
        
    } catch (error) {
        showMessage(`Error: ${error.message}`, "error", messageDiv);
    }
}

function updateEventCard(eventId) {
    const event = eventsArray.find(e => e.id === eventId);
    const card = querySelector(`#event-${eventId}`);
    
    if (card) {
        const newCard = createEventCard(event);
        card.replaceWith(newCard);
    }
}

function showMessage(text, type, container) {
    container.textContent = text;
    container.className = `message show ${type}`;
    
    setTimeout(() => {
        container.classList.remove("show");
    }, 3000);
}

function querySelector(selector) {
    return document.querySelector(selector);
}

function createElement(tagName) {
    return document.createElement(tagName);
}

function escapeHtml(text) {
    const div = createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

const initialEvents = [
    { name: "Jazz Night", category: "Music", seats: 50 },
    { name: "Marathon", category: "Sports", seats: 100 },
    { name: "Concert", category: "Music", seats: 200 },
    { name: "Food Tasting", category: "Food", seats: 75 },
    { name: "Art Exhibition", category: "Art", seats: 60 },
    { name: "Tech Conference", category: "Tech", seats: 120 }
];

initialEvents.forEach(eventData => {
    addEvent(eventData.name, eventData.category, eventData.seats);
});

renderEvents();
