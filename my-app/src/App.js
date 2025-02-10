import React, { useState } from "react";
import "./App.css"; // External CSS file

const App = () => {
  const totalSeats = 20;
  const [availableSeats, setAvailableSeats] = useState(totalSeats);
  const [reservations, setReservations] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const phone = event.target.phone.value.trim();
    const guestCount = parseInt(event.target.guestCount.value);

    if (!name || !phone || guestCount <= 0) {
      alert("Please enter valid details!");
      return;
    }

    if (guestCount > availableSeats) {
      alert("Not enough seats available!");
      return;
    }

    const newReservation = {
      id: Date.now(),
      name,
      phone,
      guestCount,
      checkInTime: new Date().toLocaleTimeString(),
      checkOutTime: null,
    };

    setReservations([...reservations, newReservation]);
    setAvailableSeats(availableSeats - guestCount);
    event.target.reset();
  };

  const handleCheckout = (id) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, checkOutTime: new Date().toLocaleTimeString() } : res
      )
    );
  };

  const handleDelete = (id) => {
    const deletedReservation = reservations.find((res) => res.id === id);
    if (deletedReservation && !deletedReservation.checkOutTime) {
      setAvailableSeats(availableSeats + deletedReservation.guestCount);
    }
    setReservations(reservations.filter((res) => res.id !== id));
  };

  return (
    <div className="container">
      <h2>Restaurant Reservation System</h2>
      <p>Seats Left: <span className="seats-left">{availableSeats}</span></p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter Name" required />
        <input type="text" name="phone" placeholder="Enter Phone" required />
        <input type="number" name="guestCount" placeholder="Number of Guests" min="1" required />
        <button type="submit">Book Table</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Guests</th>
            <th>Check-in Time</th>
            <th>Checkout Time</th>
            <th>Checkout</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.name}</td>
              <td>{res.phone}</td>
              <td>{res.guestCount}</td>
              <td>{res.checkInTime}</td>
              <td>{res.checkOutTime || "-"}</td>
              <td>
                {!res.checkOutTime && (
                  <button onClick={() => handleCheckout(res.id)}>Checkout</button>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(res.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
