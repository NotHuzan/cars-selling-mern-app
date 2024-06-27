import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = useSelector((state) => state.auth.activeUser);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/book_appointment/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAppointments(data);
    } catch (err) {
      console.log("Error Fetching Appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      {appointments.map((appointment) => (
        <AppointmentCard
          appointment={appointment}
          reFetchAppointments={fetchAppointments}
        />
      ))}
    </div>
  );
};

export default UserAppointments;
