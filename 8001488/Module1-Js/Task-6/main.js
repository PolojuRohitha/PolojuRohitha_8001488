const eventsArray = [];
let eventIdCounter = 0;

function addNewEvent() {
    const nameInput = document.getElementById("eventName");
    const categoryInput = document.getElementById("eventCategory");
    const dateInput = document.getElementById("eventDate");
    const seatsInput = document.getElementById("eventSeats");
    const messageDiv = document.getElementById("addMessage");
    
    try {
        const name = nameInput.value.trim();
        const category = categoryInput.value;
        const date = dateInput.value;
        const seats = parseInt(seatsInput.value);
        
        if (!name) throw new Error("Event name is required");
        if (!category) throw new Error("Category is required");
        if (!date) throw new Error("Date is required");
        if (isNaN(seats) || seats < 0) throw new Error("Seats must be a non-negative number");
        
        const newEvent = {
            id: ++eventIdCounter,
            name: name,
            category: category,
            date: date,
            seats: seats
        };
        
        eventsArray.push(newEvent);
        
        messageDiv.className = "message success";
        messageDiv.innerHTML = `✓ Event "${name}" added successfully! Total events: <strong>${eventsArray.length}</strong>`;
        
        nameInput.value = "";
        categoryInput.value = "";
        dateInput.value = "";
        seatsInput.value = "";
        
        displayAllEvents();
        
    } catch (error) {
        messageDiv.className = "message error";
        messageDiv.textContent = `✗ Error: ${error.message}`;
    }
}

function filterMusicEvents() {
    const musicEvents = eventsArray.filter(event => event.category === "Music");
    displayEventCards(musicEvents, `Music Events (${musicEvents.length})`);
}

function displayAllEvents() {
    displayEventCards(eventsArray, `All Events (${eventsArray.length})`);
}

function displayEventCards(events, title) {
    const container = document.getElementById("cardsContainer");
    const filterMessage = document.getElementById("filterMessage");
    
    if (events.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#999;'>No events to display</p>";
        filterMessage.textContent = `Showing: ${title}`;
        return;
    }
    
    filterMessage.innerHTML = `<strong>${title}</strong>`;
    
    const formattedCards = events.map(event => {
        const categoryClass = event.category.toLowerCase() + "-card";
        const displayName = `${event.category} on ${event.name}`;
        const eventDate = new Date(event.date).toLocaleDateString();
        
        return `
            <div class="card ${categoryClass}">
                <div class="card-title">${displayName}</div>
                <div class="card-details">
                    <strong>Date:</strong> ${eventDate}<br>
                    <strong>Available Seats:</strong> ${event.seats}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = `<div class="cards-grid">${formattedCards.join("")}</div>`;
}

const initialEvents = [
    {
        id: "evt001",
        name: "Jazz Night",
        category: "Music",
        date: "2026-06-15",
        seats: 50
    },
    {
        id: "evt002",
        name: "Marathon",
        category: "Sports",
        date: "2026-07-10",
        seats: 100
    },
    {
        id: "evt003",
        name: "Concert",
        category: "Music",
        date: "2026-08-20",
        seats: 200
    },
    {
        id: "evt004",
        name: "Food Tasting",
        category: "Food",
        date: "2026-06-25",
        seats: 75
    },
    {
        id: "evt005",
        name: "Art Exhibition",
        category: "Art",
        date: "2026-09-05",
        seats: 60
    },
    {
        id: "evt006",
        name: "Rock Festival",
        category: "Music",
        date: "2026-07-22",
        seats: 500
    },
    {
        id: "evt007",
        name: "Coding Workshop",
        category: "Tech",
        date: "2026-06-30",
        seats: 30
    },
    {
        id: "evt008",
        name: "Basketball Tournament",
        category: "Sports",
        date: "2026-08-15",
        seats: 150
    }
];

initialEvents.forEach(event => {
    eventsArray.push(event);
});

displayAllEvents();
