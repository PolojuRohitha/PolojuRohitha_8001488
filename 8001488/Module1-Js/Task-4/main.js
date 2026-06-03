let eventIdCounter = 0;
let events = [];
let users = [];

const categoryRegistrations = createCategoryTracker();

function createCategoryTracker() {
    const registrations = {};
    
    return {
        addRegistration: function(category, userName) {
            if (!registrations[category]) {
                registrations[category] = [];
            }
            registrations[category].push(userName);
        },
        getTotalRegistrations: function(category) {
            return registrations[category] ? registrations[category].length : 0;
        },
        getRegistrations: function(category) {
            return registrations[category] || [];
        },
        getAllStats: function() {
            return registrations;
        }
    };
}

function addEvent(name, category, seats) {
    const event = {
        id: ++eventIdCounter,
        name: name,
        category: category,
        seats: seats,
        registeredUsers: []
    };
    events.push(event);
    return event;
}

function registerUser(userName, eventId) {
    if (!userName || userName.trim() === "") {
        throw new Error("User name cannot be empty");
    }
    
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
        throw new Error("Event not found");
    }
    
    if (event.seats <= 0) {
        throw new Error("No seats available for this event");
    }
    
    if (event.registeredUsers.includes(userName)) {
        throw new Error("User already registered for this event");
    }
    
    event.registeredUsers.push(userName);
    event.seats--;
    
    const user = {
        name: userName,
        eventId: eventId,
        eventName: event.name,
        category: event.category
    };
    users.push(user);
    
    categoryRegistrations.addRegistration(event.category, userName);
    
    return user;
}

function filterEventsByCategory(category, callback) {
    const filteredEvents = events.filter(event => 
        event.category.toLowerCase() === category.toLowerCase()
    );
    
    return callback(filteredEvents);
}

function handleAddEvent() {
    const nameInput = document.getElementById("eventName");
    const categoryInput = document.getElementById("eventCategory");
    const seatsInput = document.getElementById("eventSeats");
    const messageDiv = document.getElementById("addMessage");
    
    try {
        const name = nameInput.value.trim();
        const category = categoryInput.value.trim();
        const seats = parseInt(seatsInput.value);
        
        if (!name) throw new Error("Event name is required");
        if (!category) throw new Error("Category is required");
        if (isNaN(seats) || seats <= 0) throw new Error("Seats must be a positive number");
        
        const newEvent = addEvent(name, category, seats);
        
        messageDiv.className = "message success";
        messageDiv.textContent = `Event "${name}" added successfully with ID: ${newEvent.id}`;
        
        nameInput.value = "";
        categoryInput.value = "";
        seatsInput.value = "";
        
        displayAllEvents();
        
    } catch (error) {
        messageDiv.className = "message error";
        messageDiv.textContent = `Error: ${error.message}`;
    }
}

function handleRegisterUser() {
    const nameInput = document.getElementById("userName");
    const eventIdInput = document.getElementById("registerEventId");
    const messageDiv = document.getElementById("registerMessage");
    
    try {
        const userName = nameInput.value.trim();
        const eventId = parseInt(eventIdInput.value);
        
        if (!userName) throw new Error("User name is required");
        if (isNaN(eventId)) throw new Error("Valid event ID is required");
        
        const user = registerUser(userName, eventId);
        
        messageDiv.className = "message success";
        messageDiv.textContent = `${userName} registered successfully for "${user.eventName}"!`;
        
        nameInput.value = "";
        eventIdInput.value = "";
        
        displayAllEvents();
        
    } catch (error) {
        messageDiv.className = "message error";
        messageDiv.textContent = `Error: ${error.message}`;
    }
}

function handleFilterEvents() {
    const categoryInput = document.getElementById("filterCategory");
    const resultsDiv = document.getElementById("filterResults");
    
    try {
        const category = categoryInput.value.trim();
        
        if (!category) throw new Error("Please enter a category");
        
        const results = filterEventsByCategory(category, (filtered) => {
            if (filtered.length === 0) {
                return `No events found in category "${category}"`;
            }
            
            let html = `<h4>Events in "${category}" category:</h4>`;
            filtered.forEach(event => {
                html += `
                    <div class="event">
                        <strong>${event.name}</strong><br>
                        ID: ${event.id}<br>
                        Available Seats: ${event.seats}<br>
                        Registered: ${event.registeredUsers.length}
                    </div>
                `;
            });
            return html;
        });
        
        resultsDiv.innerHTML = results;
        
    } catch (error) {
        resultsDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

function displayCategoryStats() {
    const statsDiv = document.getElementById("statsContainer");
    const stats = categoryRegistrations.getAllStats();
    
    if (Object.keys(stats).length === 0) {
        statsDiv.innerHTML = "<p>No registration data available</p>";
        return;
    }
    
    let html = "<h4>Registrations by Category:</h4>";
    
    Object.keys(stats).forEach(category => {
        const total = categoryRegistrations.getTotalRegistrations(category);
        const registeredUsers = categoryRegistrations.getRegistrations(category);
        
        html += `
            <div class="category-stats">
                <strong>${category}</strong><br>
                Total Registrations: ${total}<br>
                Registered Users: ${registeredUsers.join(", ")}
            </div>
        `;
    });
    
    statsDiv.innerHTML = html;
}

function displayAllEvents() {
    const container = document.getElementById("allEvents");
    
    if (events.length === 0) {
        container.innerHTML = "<p>No events available</p>";
        return;
    }
    
    let html = "";
    events.forEach(event => {
        html += `
            <div class="event">
                <strong>ID: ${event.id} - ${event.name}</strong><br>
                Category: ${event.category}<br>
                Available Seats: ${event.seats}<br>
                Registered Users: ${event.registeredUsers.length > 0 ? event.registeredUsers.join(", ") : "None"}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

addEvent("Football Tournament", "Sports", 30);
addEvent("Jazz Concert", "Music", 25);
addEvent("Food Festival", "Food", 50);
addEvent("Basketball Game", "Sports", 40);
addEvent("Art Exhibition", "Art", 20);

displayAllEvents();
