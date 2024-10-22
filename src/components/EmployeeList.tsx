import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Employee } from './Employee';

interface EmployeeListProps {
  employees: Employee[];
  onDeleteEmployee: (id: number) => void;
}

type SortConfig = {
  key: keyof Employee;
  direction: 'ascending' | 'descending';
} | null;

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onDeleteEmployee }) => {
  // State to manage search, filter, and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  // Function to handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle filter change
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterDepartment(e.target.value);
  };

  // Function to handle column sorting
  const handleSort = (key: keyof Employee) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to employees
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortConfig !== null) {
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  // Filtered employees based on search and department filter
  const filteredEmployees = sortedEmployees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm);
    const matchesDepartment = filterDepartment ? employee.department === filterDepartment : true;
    return matchesSearch && matchesDepartment;
  });

  // Get unique departments for filter dropdown (without using Set)
  const uniqueDepartments = employees
    .map((employee) => employee.department)
    .filter((dept, index, self) => self.indexOf(dept) === index);

  // Render a sort arrow based on the current sort direction
  const renderSortArrow = (columnKey: keyof Employee) => {
    if (sortConfig?.key === columnKey) {
      return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
    }
    return ''; // No arrow if not sorting by this column
  };

  return (
    <div>
      <h2>Employee List</h2>

      {/* Search and Filter section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by Name, Email, or Phone"
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />

        <select value={filterDepartment} onChange={handleFilter} style={{ padding: '10px', fontSize: '16px' }}>
          <option value="">All Departments</option>
          {uniqueDepartments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#00AA55', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
            New
          </button>
        </Link>
      </div>

      {/* Employee table */}
      <table className="employee-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name {renderSortArrow('name')}</th>
            <th onClick={() => handleSort('email')}>Email {renderSortArrow('email')}</th>
            <th onClick={() => handleSort('phone')}>Phone {renderSortArrow('phone')}</th>
            <th onClick={() => handleSort('department')}>Department {renderSortArrow('department')}</th>
            <th onClick={() => handleSort('designation')}>Designation {renderSortArrow('designation')}</th>
            <th onClick={() => handleSort('salary')}>Salary {renderSortArrow('salary')}</th>
            <th onClick={() => handleSort('dateOfJoining')}>DateOfJoining {renderSortArrow('dateOfJoining')}</th>
            <th onClick={() => handleSort('location')}>Location {renderSortArrow('location')}</th>
            <th onClick={() => handleSort('manager')}>Manager {renderSortArrow('manager')}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
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
                  <button style={{ marginRight: '10px' }}>
                    <Link to={`/edit/${employee.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                      Edit
                    </Link>
                  </button>
                  <button
                    style={{ backgroundColor: '#AA2222', color: '#fff' }}
                    onClick={() => onDeleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} style={{ textAlign: 'center' }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
