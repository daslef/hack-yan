import React from "react";
import { useTable, useMany, useNavigation } from "@refinedev/core";
import "./list.css"; 

export const ListEmployee = () => {
  const {
    tableQueryResult: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    resource: "employees",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "Employee_id", order: "asc" }] },
    syncWithLocation: true,
  });

  const { show } = useNavigation();

  const { } = useMany({
    resource: "categories",
    ids: data?.data?.map((employees) => employees.category?.id) ?? [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onPrevious = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  const onNext = () => {
    if (current < pageCount) {
      setCurrent(current + 1);
    }
  };

  const onPage = (page) => {
    setCurrent(page);
  };

  const getSorter = (field) => {
    const sorter = sorters?.find((sorter) => sorter.field === field);

    if (sorter) {
      return sorter.order;
    }
  };

  const onSort = (field) => {
    const sorter = getSorter(field);
    setSorters(
      sorter === "desc"
        ? []
        : [
            {
              field,
              order: sorter === "asc" ? "desc" : "asc",
            },
          ]
    );
  };

  const indicator = { asc: "⬆️", desc: "⬇️" };

  return (
    <div>
      <h1>Сотрудники</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort("Employee_id")}>
              Employees ID {indicator[getSorter("Employee_id")]}
            </th>
            <th onClick={() => onSort("first_name")}>
              First Name {indicator[getSorter("first_name")]}
            </th>
            <th onClick={() => onSort("last_name")}>
              Last Name {indicator[getSorter("last_name")]}
            </th>
            <th onClick={() => onSort("account_id")}>
              Account ID {indicator[getSorter("account_id")]}
            </th>
            <th onClick={() => onSort("points")}>
              Points {indicator[getSorter("points")]}
            </th>
            <th onClick={() => onSort("position")}>
              Position {indicator[getSorter("position")]}
            </th>
            <th onClick={() => onSort("avatar")}>
              Avatar {indicator[getSorter("avatar")]}
            </th>
            <th onClick={() => onSort("is_admin")}>
              Admin {indicator[getSorter("is_admin")]}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((employee) => (
            <tr key={employee.Employee_id}>
              <td>{employee.Employee_id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.account_id}</td>
              <td>{employee.points}</td>
              <td>{employee.position}</td>
              <td>{employee.avatar}</td>
              <td>{employee.is_admin}</td>
              <td>
                <button
                  type="button"
                  onClick={() => show("employees", employee.Employee_id)}
                >
                  Show
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button type="button" onClick={onPrevious}>
          {"<"}
        </button>
        <div>
          {current - 1 > 0 && (
            <span onClick={() => onPage(current - 1)}>{current - 1}</span>
          )}
          <span className="current">{current}</span>
          {current + 1 < pageCount && (
            <span onClick={() => onPage(current + 1)}>{current + 1}</span>
          )}
        </div>
        <button type="button" onClick={onNext}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ListEmployee;

