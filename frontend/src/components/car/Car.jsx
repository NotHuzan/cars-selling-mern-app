import React, { useState } from "react";
import "../car/Car.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { snackbarActions } from "../../store/snackbar";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";

// Create a mapping of model names to image paths
const carImages = {
  accord: `${process.env.PUBLIC_URL}/assets/Accord/0.png`,
  h6: `${process.env.PUBLIC_URL}/assets/H6/0.png`,
  civic: `${process.env.PUBLIC_URL}/assets/Civic/0.png`,
  reborn: `${process.env.PUBLIC_URL}/assets/Reborn/0.png`,
  vezel: `${process.env.PUBLIC_URL}/assets/Vezel/0.png`,
  grande: `${process.env.PUBLIC_URL}/assets/Grande/0.png`,
};

export default function Car(props) {

  const user = useSelector((state) => state.auth.activeUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the image source from the mapping
  // const imageSrc = carImages[props.model];
  const imageSrc = String(props.imageSrc);
  console.log(imageSrc.match("^upload"));

  const editAdHandler = () => {
    navigate(`/editad/${props.id}`);
  };

  const deleteAdHandler = async () => {
    // const result = confirm("Are you sure to remove Ad?");

    // if (result) {
      // console.log("ad removed");
      try {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/api/user/myads/${props.id}`,
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
        props.reFetch();
      } catch (err) {
        console.log(err);
        dispatch(
          snackbarActions.openSnackbar({
            text: err.response.data.message,
            severity: "error",
          })
        );
      }
    // } 
  };

  return (
    <>
      <div
        id="carbox"
        className="bg-gray-100 pb-8 flex flex-col rounded-2xl shadow-lg h-96"
      >
        {props.edit && (
          <div className="edit-box">
            <div className="edit edit-btn" onClick={editAdHandler}>
              <FaRegEdit />
            </div>
            <div className="delete edit-btn" onClick={deleteAdHandler}>
              <MdOutlineDeleteForever />
            </div>
          </div>
        )}
        <div className="cari bg-center bg-cover w-[93%] mx-auto mt-2 rounded-lg h-1/2">
          <img
            src={
              imageSrc.match("^uploads")
                ? `${process.env.REACT_APP_BASE_URL}/` + props.imageSrc
                : carImages[props.model]
            }
            alt={`${props.make} ${props.model}`}
            className="block w-full h-full object-cover object-center"
          />
        </div>
        <div className="card bg-gray-100 border-none w-[95%] mx-auto h-1/2">
          <h4 className="font-poppins mt-4 text-center font-bold capitalize">
            {props.make} {props.model}
          </h4>
          <h6 className="font-poppins text-red-600 font-semibold text-center">
            PKR {props.price}
          </h6>
          <div className="row mx-auto mt-4 flex w-full justify-evenly">
            <div className="column flex flex-col items-center">
              <h6 className="font-bold">Model</h6>
              <h6 className="font-poppins">{props.year}</h6>
            </div>
            <div className="column flex flex-col items-center">
              <h6 className="font-bold">Mileage</h6>
              <h6 className="font-poppins">{props.mileage}</h6>
            </div>
            <div className="column flex flex-col items-center">
              <h6 className="font-bold">Fuel</h6>
              <h6 className="font-poppins">{props.fuel}</h6>
            </div>
          </div>
          <Link
            to={`/car/${props.id}`}
            className="list-none no-underline bg-black text-white px-2 py-1 text-center inline-block mx-auto mt-4 rounded-2xl text-sm"
          >
            See Details
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div id="carbox">
      {/* <div className='cari' style={{ backgroundImage: `url(${imageSrc})` }}> */}
      <div className="cari">
        {/* the condition in src is to check if the imageSrc starts with upload which means that they are stored in uploads of backend folder ,else they are hardcoded from above */}
        <img
          src={
            imageSrc.match("^uploads")
              ? `${process.env.REACT_APP_BASE_URL}/` + props.imageSrc
              : carImages[props.model]
          }
        />
      </div>
      <div className="card">
        <h4>
          {props.make} {props.model}
        </h4>
        <h6 className="redtext">PKR {props.price}</h6>
        <div className="row">
          <div className="column">
            <h6 className="bold">Model</h6>
            <h6>{props.year}</h6>
          </div>
          <div className="column">
            <h6 className="bold">Mileage</h6>
            <h6>{props.mileage}</h6>
          </div>
          <div className="column">
            <h6 className="bold">Fuel</h6>
            <h6>{props.fuel}</h6>
          </div>
        </div>

        <Link to={`/car/${props.id}`} className="car_details">
          See Details
        </Link>
      </div>
    </div>
  );
}
