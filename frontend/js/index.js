
const token = localStorage.getItem('token');
const userName = localStorage.getItem('userName');
const role = localStorage.getItem('role');
const userInfo = document.getElementById('userInfo');
const logoutBtn = document.getElementById('logoutBtn');
const adminBtn = document.getElementById('adminBtn');


if (token) {
    userInfo.innerHTML = `Hi, <strong>${userName}</strong> | <a href="profile.html">My Bookings</a>`;
    logoutBtn.style.display = 'inline-block';
    if (role === 'admin') adminBtn.style.display = 'inline-block';
}

logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});


async function fetchCars() {
    try {
        const response = await fetch('http://localhost:5000/api/cars');
        const cars = await response.json();
        const carContainer = document.getElementById('carList');
        carContainer.innerHTML = '';

        cars.forEach(car => {
            carContainer.innerHTML += `
                        <div class="car-card">
                            <img src="${car.image}" class="car-image" alt="${car.make}">
                            <div class="car-content">
                                <span class="car-category">${car.category || 'Luxury'}</span>
                                <h3>${car.make} ${car.model}</h3>
                                <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">
                                    Premium performance, unmatched comfort. Starting at $${car.pricePerDay}
                                </p>
                                <div class="car-price">$${car.pricePerDay} <small style="font-size: 12px; color: #6b7280;">/ day</small></div>
                                <button class="book-btn" onclick="bookCar('${car._id}')">Book Now</button>
                            </div>
                        </div>
                    `;
        });
    } catch (error) {
        document.getElementById('carList').innerHTML = '<p>Failed to load cars.</p>';
    }
}

function bookCar(carId) {
    if (!token) {
        alert("Please login to book!");
        window.location.href = 'login.html';
    } else {
        window.location.href = `booking.html?carId=${carId}`;
    }
}

fetchCars();
