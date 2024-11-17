import React from "react";
import "./Card.css"; 
import {getSVGForText2} from './Helper.js';

const numberToName = {
  0: "No Priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent"
};

const getRandomColor = () => {
  
  const colors = ["#b1debd", "#b1d0de", "#c5b1de", "#deb1d5", "#decdb1"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getInitials = (name) => {
  if (!name) return "N/A";
  const nameParts = name.split(" ");
  return nameParts.length > 1
    ? nameParts[0][0] + nameParts[1][0]
    : nameParts[0][0];
};

const Card = ({ ticket, users,keyi }) => {
  const user = users.find((u) => u.id === ticket.userId);
  const bgColor = getRandomColor();
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-logo">
          {!user?.avatar ? (
            <div
              className="initials-logo"
              style={{ backgroundColor: bgColor }}
            >
              {getInitials(user?.name || "Unassigned")}
              <span className="online-status"></span>
            </div>
          ) : (
            <div className="avatar-container">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="avatar"
              />
              <span className="online-status"></span>
            </div>
          )}
        </div>
      </div>
      <h3 className="card-title">{ticket.title}</h3>
     
      <div className="card-info">
     
        <p>Status: {ticket.status}</p>
      </div>
      <div className="card-footer">
        <span className="priority"> {getSVGForText2(numberToName[ticket.priority])} {ticket.priority}</span>
        <span className="feature-tag">Feature Request</span>
      </div>
    </div>
  );
};

export default Card;


