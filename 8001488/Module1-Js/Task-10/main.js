const eventList = [
    { id: 1, name: "Jazz Night", category: "Music", date: "2026-06-12", seats: 58 },
    { id: 2, name: "Food Truck Rally", category: "Food", date: "2026-06-20", seats: 88 },
    { id: 3, name: "Summer Soccer Cup", category: "Sports", date: "2026-07-05", seats: 120 },
    { id: 4, name: "Tech Innovators Meetup", category: "Tech", date: "2026-07-18", seats: 42 },
    { id: 5, name: "Art & Culture Fair", category: "Art", date: "2026-08-02", seats: 70 },
    { id: 6, name: "Rock Music Festival", category: "Music", date: "2026-08-15", seats: 200 }
];

const getEvents = (events = eventList) => [...events];

const renderEvents = (events = []) => {
    const container = document.querySelector("#eventsContainer");
    const countLabel = document.querySelector("#eventCount");
    countLabel.textContent = events.length;

    if (!events.length) {
        container.innerHTML = '<div class="card"><p class="card-content">No events match the filter.</p></div>';
        return;
    }

    container.innerHTML = events
        .map(event => {
            const { name, category, date, seats } = event;
            return `
                <div class="card">
                    <h3 class="card-title">${name}</h3>
                    <div class="card-content">
                        <span><strong>Category:</strong> ${category}</span>
                        <span><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</span>
                        <span><strong>Seats:</strong> ${seats}</span>
                    </div>
                </div>
            `;
        })
        .join("");
};

const filterEvents = (events = [], searchTerm = "", category = "") => {
    const clonedEvents = [...events];
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return clonedEvents.filter(event => {
        const { name, category: eventCategory } = event;
        const matchesCategory = !category || eventCategory === category;
        const matchesSearch = !normalizedSearch || name.toLowerCase().includes(normalizedSearch);
        return matchesCategory && matchesSearch;
    });
};

const displayFilteredEvents = (searchTerm = "", category = "") => {
    const searchValue = searchTerm || document.querySelector("#searchInput").value;
    const categoryValue = category || document.querySelector("#categoryInput").value;
    const filtered = filterEvents(getEvents(), searchValue, categoryValue);
    renderEvents(filtered);
};

const init = () => {
    const searchInput = document.querySelector("#searchInput");
    const categoryInput = document.querySelector("#categoryInput");

    searchInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            displayFilteredEvents();
        }
    });

    categoryInput.addEventListener("change", () => displayFilteredEvents());

    renderEvents(getEvents());
};

init();
