import "./AppointmentCard.css";
import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { snackbarActions } from "../../store/snackbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// imports for dateTime picker
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const AppointmentCard = ({ appointment, reFetchAppointments }) => {
  const [showAppointment, setShowAppointment] = useState(false);
  const [newAppointment, setAppointment] = useState();
  const user = useSelector((state) => state.auth.activeUser);
  const dispatch = useDispatch();

  const appointmentDateTimeHandler = (value) => {
    setAppointment({
      dateTime: value.format("YYYY-MM-DD HH:mm"),
      location: appointment.location,
    });
  };

  const onEditButton = () => {
    // show edit appointment box
    setShowAppointment(true);
    setAppointment({
      dateTime: dayjs(appointment.appointmentDate).format("YYYY-MM-DD HH:mm"),
      location: appointment.location,
    });
  };

  const onCloseEditButton = () => {
    // close edit appointment box
    setShowAppointment(false);
    setAppointment();
  };

  const editAppointmentHandler = async () => {
    // book appointment

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/user/edit_appointment/${appointment._id}`,
        {
          appointmentDate: newAppointment.dateTime,
          location: newAppointment.location,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(
        snackbarActions.openSnackbar({
          text: data.message,
          severity: "success",
        })
      );

      setShowAppointment(false);
      setAppointment({});
      reFetchAppointments();
    } catch (err) {
      dispatch(
        snackbarActions.openSnackbar({
          text: err.response.data.message,
          severity: "error",
        })
      );
    }
  };

  const completeAppointmentHandler = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/user/complete_appointment/${appointment._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch(
        snackbarActions.openSnackbar({
          text: data.message,
          severity: "success",
        })
      );

      reFetchAppointments();
    } catch (err) {
      dispatch(
        snackbarActions.openSnackbar({
          text: err.response.data.message,
          severity: "error",
        })
      );
    }
  };

  const cancelAppointmentHandler = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/user/cancel_appointment/${appointment._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch(
        snackbarActions.openSnackbar({
          text: data.message,
          severity: "success",
        })
      );

      reFetchAppointments();
    } catch (err) {
      dispatch(
        snackbarActions.openSnackbar({
          text: err.response.data.message,
          severity: "error",
        })
      );
    }
  };

  return (
    <div class="flex flex-col md:flex-row items-start gap-4 p-4 rounded-lg shadow-md app-card">
      <div class="flex-shrink-0 w-full md:w-48 h-32 md:h-auto overflow-hidden rounded-md h-full">
        <img
          src={`${process.env.REACT_APP_BASE_URL}/${appointment.carId.images[0]}`}
          alt="Car"
          width={192}
          height={144}
          // class="object-cover w-full h-full"
          class="object-cover m-auto"
        />
      </div>
      <div class="flex-1 grid gap-2 w-full">
        <div class="flex items-center justify-between">
          <div class="text-lg font-medium">Appointment</div>
          <div class="text-sm text-gray-500">
            {dayjs(appointment.appointmentDate).format(
              "MMMM D, YYYY [at] h:mm A"
            )}
          </div>
        </div>
        <div>
          <div class="text-gray-500 font-medium">Car</div>
          <p class="capitalize">
            {appointment.carId.make} {appointment.carId.model}
          </p>
        </div>
        <div>
          <div class="text-gray-500 font-medium">Location</div>
          {appointment.location}
        </div>
        <div class="mb-2">
          <div class="mt-2 text-gray-500 font-medium">Status</div>
          <div class="flex items-center gap-2">
            <div class="h-2 w-2 rounded-full bg-yellow-500"></div>
            <div class="capitalize">{appointment.status}</div>
          </div>
        </div>
        {showAppointment && (
          <div class="appointment-box">
            <h2>Book Appointment</h2>
            <div class="location">
              <label for="location">Location:</label>
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={appointment.location}
                disabled
                class="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div class="appointment">
              <label for="appointment">Date & Time:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    "DateTimePicker",
                    "MobileDateTimePicker",
                    "DesktopDateTimePicker",
                    "StaticDateTimePicker",
                  ]}
                >
                  <DemoItem>
                    <DateTimePicker
                      defaultValue={dayjs(appointment.appointmentDate)}
                      minDateTime={dayjs()}
                      onChange={appointmentDateTimeHandler}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <button
              class="save-changes-btn mt-4"
              onClick={editAppointmentHandler}
            >
              Save Changes
            </button>
            <button
              class="flex items-center justify-between mt-2 p-2 border border-gray-300 rounded-md text-gray-700"
              onClick={onCloseEditButton}
            >
              Close Edit
            </button>
          </div>
        )}
        {!showAppointment && (
          <div class="flex items-center justify-between">
            <button
              class="flex items-center justify-between p-2 border border-gray-300 rounded-md text-gray-700"
              onClick={onEditButton}
            >
              <FaEdit class="w-4 h-4 mr-2" /> Edit
            </button>
            <button
              class="flex items-center justify-between p-2 border border-gray-300 rounded-md text-gray-700"
              onClick={completeAppointmentHandler}
            >
              <FaCheck class="w-4 h-4 mr-2" /> Complete
            </button>
            <button
              class="flex items-center justify-between p-2 text-red-500"
              onClick={cancelAppointmentHandler}
            >
              <FaTrash class="w-4 h-4 mr-2" /> Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
