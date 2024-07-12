import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import { RingLoader } from "react-spinners";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.activeUser);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user/book_appointment/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      setAppointments(data);
    } catch (err) {
      setLoading(false);
      console.log("Error Fetching Appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <>
      {!loading ? (
        <div>
          <h1 className="text-center mt-11 mb-11">Appointments</h1>
          {appointments.length === 0 ? (
            <p className="text-center mt-11 mb-11">No Appointments</p>
          ) : (
            appointments.map((appointment) => (
              <AppointmentCard
                appointment={appointment}
                reFetchAppointments={fetchAppointments}
              />
            ))
          )}
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <RingLoader size={50} color={"#010101"} loading={true} />
        </div>
      )}
    </>
  );
};

export default UserAppointments;
