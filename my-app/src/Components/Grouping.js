import React from "react";

const Grouping = ({ onGroupingChange, onOrderingChange, grouping, ordering }) => {
  return (
    <div className="grouping-container">
      <div className="grouping-row">
        <label className="grouping-label">Grouping</label>
        <select
          className="grouping-select"
          value={grouping}
          onChange={(e) => onGroupingChange(e.target.value)}
          >
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="grouping-row">
        <label className="grouping-label">Ordering</label>
        <select
          className="grouping-select"
          value={ordering}
          onChange={(e) => onOrderingChange(e.target.value)}
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>

      <style jsx>{`
        .grouping-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          background: #ffffff;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }

        .grouping-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .grouping-label {
          font-size: 14px;
          color: #555555;
          font-weight: 500;
        }

        .grouping-select {
          font-size: 14px;
          padding: 0.3rem 0.5rem;
          border: 1px solid #cccccc;
          border-radius: 4px;
          background-color: #f9f9f9;
          outline: none;
          transition: border-color 0.2s ease-in-out;
        }

        .grouping-select:focus {
          border-color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default Grouping;



