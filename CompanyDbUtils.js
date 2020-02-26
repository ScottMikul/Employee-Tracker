// ## Minimum Requirements
// * The command-line application should allow users to:
//   * Add departments, roles, employees
//   * View departments, roles, employees
//   * Update employee roles

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "company"
});

function addDepartment(department) {
  connection.connect(function(err) {
    if (err) throw err;
    connection.query(
      `insert into department (name) values ("${department.name}")`,
      function(err) {
        if (err) {
          console.log(err);
        }
        console.log("added department successfully");
        connection.end();
      }
    );
  });
}
//test addDepartment({name:"testDept"})
function addRole(role) {
  connection.connect(function(err) {
    if (err) throw err;
    connection.query(
      `insert into role (departmentId, title, salary) values (?,?,?)`,
      [role.departmentId, role.title, role.salary],
      function(err) {
        if (err) {
          console.log(err);
        }
        console.log("added role successfully");
      }
    );
  });
}
//test: addRole({departmentId:1, title: "greeter", salary: 14000.00})
function addEmployee(employee) {
  connection.connect(function(err) {
    if (err) throw err;
    connection.query(
      `
            insert into employee (roleid, managerid, first_name,last_name) values (?, ?, ? , ?)`,
      [
        employee.roleid,
        employee.managerid,
        employee.first_name,
        employee.last_name
      ],
      function(err) {
        if (err) {
          console.log(err);
        }
        console.log("added employee successfully");
      }
    );
  });
}
//test addEmployee({roleid:5,managerid:null,first_name:"man a ", last_name:"ger"})

function viewEmployees() {
  connection.connect(function(err) {
    if (err) throw err;
    connection.query(`select * from employee`, function(err, data) {
      if (err) {
        console.log(err);
      }
      let resvar = data.map(value => {
        return { first_name: value.first_name, last_name: value.last_name };
      });
      printDataResult(resvar);
    });
  });
}
//viewEmployees();
function viewDeparments() {
  connection.connect(function(err) {
    if (err) throw err;
    connection.query(`select * from department`, function(err, data) {
      if (err) {
        console.log(err);
      }
      let resvar = data.map(value => {
        return { name: value.name };
      });
      printDataResult(resvar);
    });
  });
}
//viewDeparments();
function viewRoles() {
  connection.connect(function(err) {
    if (err) throw err;
    connection.query(`select * from role`, function(err, data) {
      if (err) {
        console.log(err);
      }
      let resvar = data.map(value => {
        return { title: value.title, salary: value.salary };
      });
      printDataResult(resvar);
    });
  });
}
//viewRoles();

//take an employee object and update it
//insert into employee (roleid, managerid, first_name,last_name) values (8, null, "man" , "ager") , ( 7, 1, "Scott","Mikul");
function updateEmployeeRoles(employeeRoleId) {
  connection.connect(function(err) {
    if (err) throw err;
    connection.query(
      `UPDATE employee
            SET roleid = ? 
            WHERE id = ?;`,
      [employeeRoleId.roleid, employeeRoleId.id],
      function(err) {
        if (err) {
          console.log(err);
        }
        console.log("success");
      }
    );
  });
}
//test : updateEmployeeRoles({roleid: 8, id:4});

function printDataResult(result) {
  result.forEach(element => {
    console.log(element);
  });
}

// ## Bonus
// * The command-line application should allow users to:
//   * Update employee managers
//   * View employees by manager
//   * Delete departments, roles, and employees
//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

module.exports = {
  addEmployee: addEmployee,
  addDepartment: addDepartment,
  addRole: addRole,
  viewDeparments: viewDeparments,
  viewEmployees: viewEmployees,
  viewRoles: viewRoles,
  updateEmployeeRoles: updateEmployeeRoles
};
