/* **department**:
  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name
* **role**:
  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to
* **employee**:
  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  */
  drop database if exists company;
  create database company;
  use company;
  create table department( id int auto_increment, name varchar(30), primary key (id));
  create table role(id int auto_increment,  departmentId int, title varchar(30), salary decimal, foreign key (departmentId) references department(id), primary key (id));
  create table employee(id int auto_increment, roleid int, managerid int, first_name varchar(30), last_name varchar(30), foreign key (roleid ) references role(id), primary key (id));