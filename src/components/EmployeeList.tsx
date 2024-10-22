// src/components/EmployeeList.tsx
import React from 'react';

import { Link } from 'react-router-dom';
import { Employee } from './Employee';

interface EmployeeListProps {
  employees: Employee[];
  onDeleteEmployee: (id: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onDeleteEmployee }) => {
  return (
    <div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Link to={`/`} style={{ textDecoration: 'none' }}>
    <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
      New
    </button>
  </Link>
</div>

      <h2>Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>DateOfJoining</th>
            <th>Location</th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>{employee.salary}</td>
              <td>{employee.dateOfJoining}</td>
              <td>{employee.location}</td>
              <td>{employee.manager}</td>
              <td>
                <button>
                <Link to={`/edit/${employee.id}`} style={{ textDecoration: 'none',color: '#fff' }}>Edit</Link>
                </button>
                <button onClick={() => onDeleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
