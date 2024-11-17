import React, { useState, useEffect } from "react";
import Board from "./Components/Board";
import Navbar from "./Components/Navbar"; // Navbar component
import "./css/styles.css";

function App() {
  const [tickets, setTickets] = useState(() => {
    const storedTickets = localStorage.getItem("tickets");
    return storedTickets ? JSON.parse(storedTickets) : [];
  });

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [grouping, setGrouping] = useState(() => {
    return localStorage.getItem("grouping") || "status";
  });

  const [ordering, setOrdering] = useState(() => {
    return localStorage.getItem("ordering") || "priority";
  });

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        if (!tickets.length || !users.length) {
          const response = await fetch(
            "https://api.quicksell.co/v1/internal/frontend-assignment"
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setTickets(data.tickets);
          setUsers(data.users);

          // Store fetched data in localStorage
          localStorage.setItem("tickets", JSON.stringify(data.tickets));
          localStorage.setItem("users", JSON.stringify(data.users));
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [tickets, users]);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("ordering", ordering);
  }, [ordering]);

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const handleOrderingChange = (newOrdering) => {
    setOrdering(newOrdering);
  };

  return (
    <div className="App">
      <Navbar
        grouping={grouping}
        ordering={ordering}
        onGroupingChange={handleGroupingChange}
        onOrderingChange={handleOrderingChange}
      />
      <Board
        tickets={tickets}
        users={users}
        grouping={grouping}
        ordering={ordering}
        onGroupingChange={handleGroupingChange}
        onOrderingChange={handleOrderingChange}
      />
    </div>
  );
}

export default App;



