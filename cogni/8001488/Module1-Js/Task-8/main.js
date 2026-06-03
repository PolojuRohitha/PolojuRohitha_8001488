let allEvents = [];
let filteredEvents = [];
let currentCategory = "";
let currentSearchTerm = "";
let eventIdCounter = 0;

function addEvent(name, category, seats) {
    const event = {
        id: ++eventIdCounter,
        name: name,
        category: category,
        seats: seats,
        originalSeats: seats,
        registered: 0
    };
    allEvents.push(event);
    return event;
}

function handleSearchKeydown(event) {
    const searchTerm = event.target.value.toLowerCase();
    currentSearchTerm = searchTerm;
    applyFilters();
    
    showMessage(`Searching for "${searchTerm}"...`, "info");
}

function handleCategoryChange(event) {
    const category = event.target.value;
    currentCategory = category;
    applyFilters();
    
    const message = category ? `Filtered by: ${category}` : "Showing all categories";
    showMessage(message, "info");
}

function applyFilters() {
    filteredEvents = allEvents.filter(event => {
        const matchesCategory = !currentCategory || event.category === currentCategory;
        const matchesSearch = !currentSearchTerm || event.name.toLowerCase().includes(currentSearchTerm);
        return matchesCategory && matchesSearch;
    });
    
    renderEvents();
}

function renderEvents() {
    const container = document.querySelector("#eventsContainer");
    const countSpan = document.querySelector("#eventCount");
    
    countSpan.textContent = filteredEvents.length;
    
    if (filteredEvents.length === 0) {
        container.innerHTML = '<div class="empty-state">No events found. Try adjusting your filters.</div>';
        return;
    }
    
    container.innerHTML = "";
    
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        container.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const card = document.createElement("div");
    card.className = "event-card";
    card.id = `event-${event.id}`;
    
    const seatsAvailable = event.seats > 0;
    const seatsClass = seatsAvailable ? "seats-available" : "seats-unavailable";
    const seatsStatus = seatsAvailable ? `${event.seats} available` : "FULLY BOOKED";
    
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
                <span class="event-detail-label">Total Capacity:</span>
                <span class="event-detail-value">${event.originalSeats}</span>
            </div>
            <div class="event-detail">
                <span class="event-detail-label">Seats Status:</span>
                <span class="event-detail-value ${seatsClass}">${seatsStatus}</span>
            </div>
            <div class="event-detail">
                <span class="event-detail-label">Registered:</span>
                <span class="event-detail-value">${event.registered}</span>
            </div>
            <div class="event-actions">
                <button class="btn-register" onclick="handleRegisterClick(${event.id})" 
                    ${!seatsAvailable ? 'disabled' : ''}>
                    Register Now
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function handleRegisterClick(eventId) {
    const event = allEvents.find(e => e.id === eventId);
    
    if (!event) {
        showMessage("Event not found", "error");
        return;
    }
    
    if (event.seats <= 0) {
        showMessage(`Sorry! "${event.name}" is fully booked.`, "error");
        return;
    }
    
    event.seats--;
    event.registered++;
    
    showMessage(`You have successfully registered for "${event.name}"! ✓`, "success");
    
    renderEvents();
}

function showMessage(text, type) {
    const messageDiv = document.querySelector("#messageContainer");
    messageDiv.textContent = text;
    messageDiv.className = `message show ${type}`;
    
    setTimeout(() => {
        messageDiv.classList.remove("show");
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

const initialEvents = [
    { name: "Jazz Night Live", category: "Music", seats: 50 },
    { name: "City Marathon 2026", category: "Sports", seats: 100 },
    { name: "Summer Concert Series", category: "Music", seats: 200 },
    { name: "International Food Festival", category: "Food", seats: 75 },
    { name: "Contemporary Art Exhibition", category: "Art", seats: 60 },
    { name: "Tech Conference 2026", category: "Tech", seats: 120 },
    { name: "Rock Concert Extravaganza", category: "Music", seats: 150 },
    { name: "Basketball Tournament", category: "Sports", seats: 80 },
    { name: "Culinary Masterclass", category: "Food", seats: 40 },
    { name: "AI & Machine Learning Summit", category: "Tech", seats: 90 },
    { name: "Abstract Art Workshop", category: "Art", seats: 25 },
    { name: "Football Championship", category: "Sports", seats: 500 }
];

initialEvents.forEach(eventData => {
    addEvent(eventData.name, eventData.category, eventData.seats);
});

filteredEvents = [...allEvents];
renderEvents();
