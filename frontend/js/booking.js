
const carId = new URLSearchParams(window.location.search).get('carId');
let pricePerDay = 0;


const today = new Date().toISOString().split('T')[0];
document.getElementById('startDate').setAttribute('min', today);
document.getElementById('endDate').setAttribute('min', today);

async function loadCar() {
    try {
        const res = await fetch(`http://localhost:5000/api/cars/${carId}`);
        const car = await res.json();
        pricePerDay = car.pricePerDay;
        document.getElementById('carSummary').innerHTML = `
                    <img src="${car.image}" style="width:100%; border-radius:10px; margin-bottom:15px; object-fit: cover; height: 200px;">
                    <h3 style="font-size: 24px;">${car.make} ${car.model}</h3>
                    <p style="color: #6b7280; margin: 10px 0;">Category: ${car.category || 'Luxury'}</p>
                    <div style="font-size: 22px; color: var(--navy); font-weight: 800;">$${car.pricePerDay} <span style="font-size: 14px; font-weight: normal;">/ day</span></div>
                `;
    } catch (err) {
        document.getElementById('carSummary').innerText = "Error loading car.";
    }
}


function calculatePrice() {
    const startStr = document.getElementById('startDate').value;
    const endStr = document.getElementById('endDate').value;

    if (startStr && endStr) {
        const start = new Date(startStr);
        const end = new Date(endStr);

        if (end > start) {
            const diffTime = Math.abs(end - start);
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            document.getElementById('price').innerHTML = `Total: $${days * pricePerDay} <br><small>(${days} Days Selected)</small>`;
        } else {
            document.getElementById('price').innerText = `End date must be after start date`;
        }
    }
}

document.getElementById('startDate').onchange = calculatePrice;
document.getElementById('endDate').onchange = calculatePrice;


document.getElementById('bookingForm').addEventListener('submit', async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Please login first to confirm your booking.");
        window.location.href = 'login.html';
        return;
    }

    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.disabled = true;
    confirmBtn.innerText = "Processing...";

    const bookingData = {
        car: carId,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        pickupLocation: document.getElementById('pickupLocation').value
    };

    try {
        const res = await fetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
            body: JSON.stringify(bookingData)
        });

        const result = await res.json();
        if (res.ok) {
            alert("Reservation Confirmed! Enjoy your ride.");
            window.location.href = "profile.html";
        } else {
            alert(result.msg || "Booking failed. Dates might be unavailable.");
            confirmBtn.disabled = false;
            confirmBtn.innerText = "Confirm My Ride";
        }
    } catch (err) {
        alert("Server error. Please try again.");
        confirmBtn.disabled = false;
        confirmBtn.innerText = "Confirm My Ride";
    }
});

loadCar();
