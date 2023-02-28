const express = require('express');
const bodyParser = require('body-parser');

const cors = require("cors")


const app = express();
const port = 5000;

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let employees = [];

// Endpoint for creating a new employee
app.post('/employee', (req, res) => {
  const { name, age, department, salary } = req.body;
  const newEmployee = { name, age, department, salary };
  employees.push(newEmployee);
  res.send('Employee created!');
});

// Endpoint for retrieving all employees
app.get('/employee', (req, res) => {
  res.json(employees);
});

// Endpoint for retrieving a specific employee by name
app.get('/employee/:name', (req, res) => {
  const { name } = req.params;
  const employee = employees.find((emp) => emp.name === name);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send('Employee not found');
  }
});

// Endpoint for updating an employee's information
app.put('/employee/:name', (req, res) => {
  const { name } = req.params;
  const employeeIndex = employees.findIndex((emp) => emp.name === name);
  if (employeeIndex >= 0) {
    employees[employeeIndex] = { ...employees[employeeIndex], ...req.body };
    res.send('Employee information updated!');
  } else {
    res.status(404).send('Employee not found');
  }
});

// Endpoint for deleting an employee
app.delete('/employee/:name', (req, res) => {
  const { name } = req.params;
  const employeeIndex = employees.findIndex((emp) => emp.name === name);
  if (employeeIndex >= 0) {
    employees.splice(employeeIndex, 1);
    res.send('Employee deleted!');
  } else {
    res.status(404).send('Employee not found');
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
