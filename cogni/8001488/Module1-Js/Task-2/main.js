const eventName = "Dance Competition";
const eventDate = "June 15, 2024";
let a = 50;
function displayEventInfo() {
    const eventInfo = `
    === Event Details ===
    Event Name: ${eventName}
    Event Date: ${eventDate}
    Available Seats: ${a}
    `;
    console.log(eventInfo);
    document.body.innerHTML += `<pre>${eventInfo}</pre>`;
}
function registerParticipant() {
    if (a > 0) {
        a--;  
        const registrationMsg = `✓ Registration Successful! Seats remaining: ${a}`;
        console.log(registrationMsg);
        document.body.innerHTML += `<p style="color: green;">${registrationMsg}</p>`;
    } else {
        const errorMsg = `✗ Event is fully booked! No seats available.`;
        console.log(errorMsg);
        document.body.innerHTML += `<p style="color: red;">${errorMsg}</p>`;
    }
    updateDisplay();
}
function cancelRegistration() {
    a++; 
    const cancellationMsg = `✓ Registration Cancelled! Seats available: ${a}`;
    console.log(cancellationMsg);
    document.body.innerHTML += `<p style="color: blue;">${cancellationMsg}</p>`;
    updateDisplay();
}
function updateDisplay() {
    displayEventInfo();
}
displayEventInfo();
document.body.innerHTML += `
<button onclick="registerParticipant()" style="padding: 10px 20px; margin: 10px; cursor: pointer;">Register for Event</button>
<button onclick="cancelRegistration()" style="padding: 10px 20px; margin: 10px; cursor: pointer;">Cancel Registration</button>
`;
