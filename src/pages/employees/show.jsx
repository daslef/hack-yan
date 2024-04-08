import React from "react";
import { useShow } from "@refinedev/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import "./show.css"; 

export const ShowEmployee = ({ Employee_id}) => {
  const { queryResult: { data, isLoading } } = useShow("employees", Employee_id);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!data) {
    return (
      <div className="not-found-message">
        <FontAwesomeIcon icon={faExclamationTriangle} size="3x" /> {/* Увеличиваем размер иконки */}
        <div>Данные о сотруднике не найдены</div>
      </div>
    );
  }

  return (
    <div>
      <div>First Name: {data.first_name}</div>
      <div>Last Name: {data.last_name}</div>
      <div>Account ID: {data.account_id}</div>
      <div>Points: {data.points}</div>
      <div>Position: {data.position}</div>
      <div>Avatar: {data.avatar}</div>
      <div>Admin: {data.is_admin}</div>
    </div>
  );
};

export default ShowEmployee;



