
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
const userName = localStorage.getItem('userName');

if (!token) {
    alert("Please login to view profile");
    window.location.href = 'login.html';
}


document.getElementById('userInitial').innerText = userName ? userName.charAt(0).toUpperCase() : 'U';
document.getElementById('userFields').innerHTML = `
            <h3 style="font-size: 22px; margin-bottom: 5px;">${userName || 'Valued Client'}</h3>
            <p style="color: #6b7280;">Member ID: ${userId}</p>
        `;

async function getMyBookings() {
    try {
        const response = await fetch(`http://localhost:5000/api/bookings/user/${userId}`, {
            headers: { 'x-auth-token': token }
        });

        const bookings = await response.json();
        const list = document.getElementById('bookingList');
        list.innerHTML = '';

        bookings.forEach(b => {
            const start = new Date(b.startDate).toLocaleDateString();
            const end = new Date(b.endDate).toLocaleDateString();
            const carInfo = b.car ? `<strong>${b.car.make}</strong> ${b.car.model}` : 'Vehicle Removed';

            list.innerHTML += `
                <tr>
                    <td>${carInfo}</td>
                    <td>${start} - ${end}</td>
                    <td><strong>$${b.totalPrice}</strong></td>
                    <td><span class="status-badge status-confirmed">${b.status || 'Confirmed'}</span></td>
                    <td>
                        <button class="cancel-btn" onclick="cancelBooking('${b._id}')">Cancel</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error(err);
    }
}


async function cancelBooking(bookingId) {
    if (confirm("Are you sure you want to cancel this booking?")) {
        try {
            const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });

            if (res.ok) {
                alert("Booking cancelled successfully.");
                getMyBookings(); // List refresh karein
            } else {
                alert("Could not cancel booking.");
            }
        } catch (err) {
            alert("Error connecting to server.");
        }
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}

getMyBookings();
