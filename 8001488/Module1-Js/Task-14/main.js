const events = [
    { id: 1, name: 'Jazz Night', category: 'Music', seats: 40 },
    { id: 2, name: 'Community Run', category: 'Sports', seats: 60 },
    { id: 3, name: 'Food Fest', category: 'Food', seats: 25 },
    { id: 4, name: 'Art Class', category: 'Art', seats: 30 }
];

function renderEventCards() {
    const container = $('#eventsContainer');
    container.empty();

    events.forEach(event => {
        const card = $(
            `<div class="event-card" data-id="${event.id}">
                <h3>${event.name}</h3>
                <p><strong>Category:</strong> ${event.category}</p>
                <p><strong>Seats left:</strong> <span class="seat-count">${event.seats}</span></p>
            </div>`
        );
        card.hide();
        container.append(card);
        card.fadeIn(600);
    });
}

function populateEventSelect() {
    const select = $('#eventSelect');
    select.empty().append('<option value="">Select event to register</option>');
    events.forEach(({ id, name }) => {
        select.append(`<option value="${id}">${name}</option>`);
    });
}

$(document).ready(() => {
    populateEventSelect();
    renderEventCards();

    $('#registerBtn').click(() => {
        const selectedId = parseInt($('#eventSelect').val(), 10);
        const selectedEvent = events.find(event => event.id === selectedId);

        if (!selectedEvent) {
            alert('Please choose an event before registering.');
            return;
        }

        if (selectedEvent.seats <= 0) {
            alert('Sorry, this event is fully booked.');
            return;
        }

        selectedEvent.seats -= 1;
        const eventCard = $(`#eventsContainer .event-card[data-id='${selectedId}']`);
        eventCard.find('.seat-count').text(selectedEvent.seats);

        if (selectedEvent.seats === 0) {
            eventCard.fadeOut(800, () => eventCard.remove());
        }
    });

    $('#showCardsBtn').click(() => {
        $('#eventsContainer .event-card').fadeOut(300, () => {
            $('#eventsContainer').empty();
            renderEventCards();
        });
    });
});
