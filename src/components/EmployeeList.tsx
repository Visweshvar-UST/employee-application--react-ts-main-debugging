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
      <button style={{alignContent: 'right'}}><Link to={`/`} style={{ textDecoration: 'none',color: '#fff' }}>New</Link></button>
      <h2>Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Designation</th>
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
