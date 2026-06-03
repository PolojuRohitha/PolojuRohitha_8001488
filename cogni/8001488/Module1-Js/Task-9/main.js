const mockEvents = [
    {
        id: 1,
        name: "Jazz Night Live",
        category: "Music",
        date: "2026-06-15",
        seats: 50,
        location: "Downtown Theater"
    },
    {
        id: 2,
        name: "City Marathon 2026",
        category: "Sports",
        date: "2026-07-10",
        seats: 100,
        location: "Central Park"
    },
    {
        id: 3,
        name: "Summer Concert Series",
        category: "Music",
        date: "2026-08-20",
        seats: 200,
        location: "Amphitheater"
    },
    {
        id: 4,
        name: "International Food Festival",
        category: "Food",
        date: "2026-06-25",
        seats: 75,
        location: "Food Court"
    },
    {
        id: 5,
        name: "Contemporary Art Exhibition",
        category: "Art",
        date: "2026-09-05",
        seats: 60,
        location: "Art Gallery"
    },
    {
        id: 6,
        name: "Tech Conference 2026",
        category: "Tech",
        date: "2026-07-22",
        seats: 150,
        location: "Convention Center"
    }
];

function mockApiCall() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.1;
            
            if (success) {
                resolve(mockEvents);
            } else {
                reject(new Error("Failed to fetch events from API"));
            }
        }, 2000);
    });
}

function showMessage(text, type) {
    const messageDiv = document.querySelector("#messageContainer");
    messageDiv.textContent = text;
    messageDiv.className = `message show ${type}`;
    
    setTimeout(() => {
        messageDiv.classList.remove("show");
    }, 3000);
}

function showLoadingSpinner(show) {
    const spinner = document.querySelector("#loadingSpinner");
    if (show) {
        spinner.classList.add("show");
    } else {
        spinner.classList.remove("show");
    }
}

function renderEvents(events) {
    const container = document.querySelector("#eventsContainer");
    const countSpan = document.querySelector("#eventCount");
    
    if (!events || events.length === 0) {
        container.innerHTML = '<div class="empty-state">No events found</div>';
        countSpan.textContent = "0";
        return;
    }
    
    countSpan.textContent = events.length;
    container.innerHTML = "";
    
    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.className = "event-card";
        
        const eventDate = new Date(event.date).toLocaleDateString();
        
        eventCard.innerHTML = `
            <div class="event-header">
                <div class="event-title">${event.name}</div>
                <div class="event-category">${event.category}</div>
            </div>
            <div class="event-body">
                <div class="event-detail">
                    <span class="event-detail-label">Date:</span>
                    <span>${eventDate}</span>
                </div>
                <div class="event-detail">
                    <span class="event-detail-label">Location:</span>
                    <span>${event.location}</span>
                </div>
                <div class="event-detail">
                    <span class="event-detail-label">Available Seats:</span>
                    <span>${event.seats}</span>
                </div>
                <div class="event-detail">
                    <span class="event-detail-label">ID:</span>
                    <span>${event.id}</span>
                </div>
            </div>
        `;
        
        container.appendChild(eventCard);
    });
}

function fetchEventsPromise() {
    showLoadingSpinner(true);
    showMessage("Fetching events using .then()/.catch()...", "info");
    
    mockApiCall()
        .then(events => {
            showLoadingSpinner(false);
            renderEvents(events);
            showMessage(`✓ Successfully fetched ${events.length} events using Promises!`, "success");
        })
        .catch(error => {
            showLoadingSpinner(false);
            showMessage(`✗ Error: ${error.message}`, "error");
            document.querySelector("#eventsContainer").innerHTML = 
                '<div class="empty-state">Failed to fetch events. Please try again.</div>';
        });
}

async function fetchEventsAsync() {
    showLoadingSpinner(true);
    showMessage("Fetching events using async/await...", "info");
    
    try {
        const events = await mockApiCall();
        showLoadingSpinner(false);
        renderEvents(events);
        showMessage(`✓ Successfully fetched ${events.length} events using Async/Await!`, "success");
    } catch (error) {
        showLoadingSpinner(false);
        showMessage(`✗ Error: ${error.message}`, "error");
        document.querySelector("#eventsContainer").innerHTML = 
            '<div class="empty-state">Failed to fetch events. Please try again.</div>';
    }
}

showMessage("Mock API ready. Click a button to fetch events.", "info");
