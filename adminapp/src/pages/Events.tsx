import React, { useState, useEffect } from "react";

const Events: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    maxSeats: 0,
  });

  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setAlert(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setAlert({ type: "error", message: "No token found in local storage." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/admin/events", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events.");
      }

      const data = await response.json();
      setEvents(data);
    } catch (error: any) {
      setAlert({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (event: any) => {
    setLoading(true);
    setAlert(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setAlert({ type: "error", message: "No token found in local storage." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/add/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("Failed to add event.");
      }

      setAlert({ type: "success", message: "Event added successfully!" });
      fetchEvents();
    } catch (error: any) {
      setAlert({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id: string, updatedEvent: any) => {
    setLoading(true);
    setAlert(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setAlert({ type: "error", message: "No token found in local storage." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/update/events/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event.");
      }

      setAlert({ type: "success", message: "Event updated successfully!" });
      fetchEvents();
      setEditingEvent(null);
    } catch (error: any) {
      setAlert({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    setLoading(true);
    setAlert(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setAlert({ type: "error", message: "No token found in local storage." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/delete/events/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event.");
      }

      setAlert({ type: "success", message: "Event deleted successfully!" });
      fetchEvents();
    } catch (error: any) {
      setAlert({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingEvent((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(newEvent);
  };

  return (
    <div className="container mx-auto max-w-lg p-6 bg-slate-400 shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Manage Events
      </h1>

      {alert && (
        <div
          className={`mb-4 p-4 rounded text-center text-lg font-medium ${
            alert.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {alert.message}
        </div>
      )}

      {loading ? (
        <p className="text-center text-blue-500">Loading...</p>
      ) : (
        <div>
          {/* Add Event Form */}
          <form onSubmit={handleAddEventSubmit} className="mb-6">
            <input
              type="text"
              name="name"
              value={newEvent.name}
              onChange={handleInputChange}
              placeholder="Event Name"
              className="w-full p-2 mb-4 rounded"
            />
            <input
              type="text"
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              placeholder="Event Description"
              className="w-full p-2 mb-4 rounded"
            />
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              placeholder="Event Date"
              className="w-full p-2 mb-4 rounded"
            />
            <input
              type="number"
              name="maxSeats"
              value={newEvent.maxSeats}
              onChange={handleInputChange}
              placeholder="Max Seats"
              className="w-full p-2 mb-4 rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Add Event
            </button>
          </form>

          {/* Display Events */}
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event._id} className="p-4 border rounded-md shadow-sm">
                <h2 className="text-lg font-bold">{event.name}</h2>
                <p>{event.description}</p>
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
                <p>
                  <strong>Max Seats:</strong> {event.maxSeats} |{" "}
                  <strong>Booked:</strong> {event.bookedSeats}
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    onClick={() => setEditingEvent(event)}
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => deleteEvent(event._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Edit Event</h2>
            <input
              type="text"
              name="name"
              value={editingEvent.name}
              onChange={handleEditInputChange}
              placeholder="Event Name"
              className="w-full p-2 mb-4 rounded"
            />
            <input
              type="text"
              name="description"
              value={editingEvent.description}
              onChange={handleEditInputChange}
              placeholder="Event Description"
              className="w-full p-2 mb-4 rounded"
            />
            <input
              type="date"
              name="date"
              value={editingEvent.date}
              onChange={handleEditInputChange}
              placeholder="Event Date"
              className="w-full p-2 mb-4 rounded"
            />
            <input
              type="number"
              name="maxSeats"
              value={editingEvent.maxSeats}
              onChange={handleEditInputChange}
              placeholder="Max Seats"
              className="w-full p-2 mb-4 rounded"
            />
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() =>
                  updateEvent(editingEvent._id, {
                    name: editingEvent.name,
                    description: editingEvent.description,
                    date: editingEvent.date,
                    maxSeats: editingEvent.maxSeats,
                  })
                }
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={() => setEditingEvent(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
