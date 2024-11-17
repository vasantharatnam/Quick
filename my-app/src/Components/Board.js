import React from "react";
import Card from "./Card";
import {getSVGForText} from './Helper.js';

const Board = ({ tickets, users, grouping, ordering, onGroupingChange, onOrderingChange }) => {
  // Mapping of integers to names
  const numberToName = {
    0: "No Priority",
    1: "Urgent",
    2: "High",
    3: "Medium",
    4: "Low"
  };

  // Function to get user name by ID
  const getUserNameById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "User not found";
  };

  // Group tickets based on criteria
  const groupTickets = (tickets, grouping) => {
    const groups = {};
    tickets.forEach((ticket) => {
      const key =
        grouping === "status"
          ? ticket.status
          : grouping === "user"
          ? getUserNameById(ticket.userId)
          : numberToName[ticket.priority];
      if (!groups[key]) groups[key] = [];
      groups[key].push(ticket);
    });
    if (grouping === "status") {
        if (grouping === "status") {
            if (!groups["Cancelled"]) groups["Cancelled"] = [];
            if (!groups["Done"]) groups["Done"] = [];
          }
    }
    return groups;
  };

  
  const sortedTickets = (group) => {
    return [...group].sort((a, b) => {
      if (ordering === "priority") return b.priority - a.priority;
      if (ordering === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  };

  const groupedTickets = groupTickets(tickets, grouping);

  return (
    <div className="board">
      {Object.keys(groupedTickets).map((key) => (
        <div className="column" key={key}>
          <div className="column-header">
            <div className="column-title">
              <div className="icon">{getSVGForText(key)}</div>
              <h2 className="header-title">
                {key} <span className="ticket-count">({groupedTickets[key].length})</span>
              </h2>
            </div>
            <div className="header-controls">
            <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75 4C8.75 3.58579 8.41421 3.25 8 3.25C7.58579 3.25 7.25 3.58579 7.25 4V7.25H4C3.58579 7.25 3.25 7.58579 3.25 8C3.25 8.41421 3.58579 8.75 4 8.75H7.25V12C7.25 12.4142 7.58579 12.75 8 12.75C8.41421 12.75 8.75 12.4142 8.75 12V8.75H12C12.4142 8.75 12.75 8.41421 12.75 8C12.75 7.58579 12.4142 7.25 12 7.25H8.75V4Z" fill="#5C5C5E"/>
                </svg>
            </span>
            <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6.5C3.39782 6.5 3.77936 6.65804 4.06066 6.93934C4.34196 7.22064 4.5 7.60218 4.5 8C4.5 8.39782 4.34196 8.77936 4.06066 9.06066C3.77936 9.34196 3.39782 9.5 3 9.5C2.60218 9.5 2.22064 9.34196 1.93934 9.06066C1.65804 8.77936 1.5 8.39782 1.5 8C1.5 7.60218 1.65804 7.22064 1.93934 6.93934C2.22064 6.65804 2.60218 6.5 3 6.5ZM8 6.5C8.39782 6.5 8.77936 6.65804 9.06066 6.93934C9.34196 7.22064 9.5 7.60218 9.5 8C9.5 8.39782 9.34196 8.77936 9.06066 9.06066C8.77936 9.34196 8.39782 9.5 8 9.5C7.60218 9.5 7.22064 9.34196 6.93934 9.06066C6.65804 8.77936 6.5 8.39782 6.5 8C6.5 7.60218 6.65804 7.22064 6.93934 6.93934C7.22064 6.65804 7.60218 6.5 8 6.5ZM13 6.5C13.3978 6.5 13.7794 6.65804 14.0607 6.93934C14.342 7.22064 14.5 7.60218 14.5 8C14.5 8.39782 14.342 8.77936 14.0607 9.06066C13.7794 9.34196 13.3978 9.5 13 9.5C12.6022 9.5 12.2206 9.34196 11.9393 9.06066C11.658 8.77936 11.5 8.39782 11.5 8C11.5 7.60218 11.658 7.22064 11.9393 6.93934C12.2206 6.65804 12.6022 6.5 13 6.5Z" fill="#5C5C5E"/>
                </svg>
            </span>
            </div>
          </div>
          <div className="tickets">
            {sortedTickets(groupedTickets[key]).map((ticket) => (
              <Card key={ticket.id} ticket={ticket} users={users} keyi={getSVGForText(key)} />
            ))}
          </div>
        </div>
      ))}
      <style jsx>{`
        .board {
          display: flex;
          gap: 16px;
          padding: 16px;
          overflow-x: auto;
          background-color: #f8f9fa;
        }

        .column {
          flex: 1;
          min-width: 340px; /* Added: Sets a minimum width for each column */
          max-width: 400px; /* Added: Ensures columns adjust to fill available space */
          background-color: #ffffff;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }

        .column-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .column-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-title {
          font-size: 16px;
          font-weight: bold;
          margin: 0;
        }

        .ticket-count {
          color: #6c757d;
          font-size: 14px;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .add-symbol,
        .more-symbol {
          font-size: 18px;
          cursor: pointer;
          color: #6c757d;
          transition: color 0.2s;
        }

        .add-symbol:hover,
        .more-symbol:hover {
          color: #0056b3;
        }

        .tickets {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      `}</style>
    </div>
  );
};

export default Board;

