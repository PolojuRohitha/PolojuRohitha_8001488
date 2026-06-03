const events = [
    {
        id: 1,
        name: "Food Festival",
        date: "2026-06-15",
        seats: 20
    },
    {
        id: 2,
        name: "Musical Concert",
        date: "2026-05-10",
        seats: 0
    },
    {
        id: 3,
        name: "Dancing Competition",
        date: "2026-07-20",
        seats: 15
    },
    {
        id: 4,
        name: "Charity Run",
        date: "2026-05-01",
        seats: 25
    },
    {
        id: 5,
        name: "Fashion Show",
        date: "2026-08-10",
        seats: 30
    }
];

const currentDate = new Date("2026-05-29");

function isValidEvent(event) {
    const eventDate = new Date(event.date);
    if (eventDate < currentDate) {
        return false;
    }
    if (event.seats <= 0) {
        return false;
    }
    return true;
}

function displayEvents() {
    const container = document.getElementById("events-container");
    container.innerHTML = "<h3>Available Events:</h3>";
    
    events.forEach((event) => {
        const isValid = isValidEvent(event);
        const eventDiv = document.createElement("div");
        eventDiv.className = `event ${isValid ? 'valid' : 'invalid'}`;
        
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString();
        
        if (isValid) {
            eventDiv.innerHTML = `
                <h4>${event.name}</h4>
                <p>Date: ${formattedDate}</p>
                <p>Available Seats: ${event.seats}</p>
                <button onclick="registerEvent(${event.id})">Register</button>
            `;
        } else {
            let reason = "";
            if (new Date(event.date) < currentDate) {
                reason = "(Past Event)";
            } else if (event.seats <= 0) {
                reason = "(Fully Booked)";
            }
            eventDiv.innerHTML = `
                <h4>${event.name}</h4>
                <p>Date: ${formattedDate}</p>
                <p>Available Seats: ${event.seats}</p>
                <p style="color: red;">Event Unavailable ${reason}</p>
            `;
        }
        
        container.appendChild(eventDiv);
    });
}

function registerEvent(eventId) {
    const messageDiv = document.getElementById("message");
    
    try {
        if (!eventId || typeof eventId !== "number") {
            throw new Error("Invalid event ID provided");
        }
        
        const event = events.find(e => e.id === eventId);
        
        if (!event) {
            throw new Error("Event not found");
        }
        
        if (new Date(event.date) < currentDate) {
            throw new Error("Cannot register for past events");
        }
        
        if (event.seats <= 0) {
            throw new Error("No seats available for this event");
        }
        
        event.seats--;
        messageDiv.innerHTML = `<p class="success">✓ Successfully registered for "${event.name}"! Seats left: ${event.seats}</p>`;
        
        displayEvents();
        
        setTimeout(() => {
            messageDiv.innerHTML = "";
        }, 3000);
        
    } catch (error) {
        messageDiv.innerHTML = `<p class="error">✗ Registration Error: ${error.message}</p>`;
        setTimeout(() => {
            messageDiv.innerHTML = "";
        }, 3000);
    }
}

displayEvents();
