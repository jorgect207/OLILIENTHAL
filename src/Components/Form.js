import React, { useRef } from "react";
import classes from "./Form.module.css";

let direction;

const Form = (props) => {
  const latitude = useRef();
  const longitude = useRef();
  const altitude = useRef();

  function senDirection(event) {
    const getLatitude = latitude.current.value;
    const getLongitude = longitude.current.value;
    const getAltitude = altitude.current.value;
    event.preventDefault();

    direction = {
      getLatitude,
      getLongitude,
      getAltitude,
    };

    async function senData() {
      const response = await fetch(
        "https://olilienthal-default-rtdb.firebaseio.com//location.json",
        { method: "POST", body: JSON.stringify(direction) }
      );
      if (!response.ok) {
        throw new Error("no fetch data");
      }
    }
    senData();

    latitude.current.value = "";
    longitude.current.value = "";
    altitude.current.value = "";
  }

  return (
    <form onSubmit={senDirection} className={classes.Form}>
      <div className={classes.sub}>
        <label htmlFor="Latitude">Latitude</label>
        <input type="number" id="Latitude" ref={latitude}></input>
      </div>
      <div className={classes.sub}>
        <label htmlFor="longitude">longitude</label>
        <input type="number" id="longitude" ref={longitude}></input>
      </div>
      <div className={classes.sub}>
        <label htmlFor="altitude">altitude</label>
        <input type="number" id="altitude" ref={altitude}></input>
      </div>
      <div>
        <button type="onSubmit">Send direction</button>
      </div>
    </form>
  );
};

export default Form;
