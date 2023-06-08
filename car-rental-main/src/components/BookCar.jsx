import { useEffect, useRef, useState } from "react";
import CarAudi from "../images/cars-big/audia1.jpg";
import CarGolf from "../images/cars-big/golf6.jpg";
import CarToyota from "../images/cars-big/toyotacamry.jpg";
import CarBmw from "../images/cars-big/bmw320.jpg";
import CarMercedes from "../images/cars-big/benz.jpg";
import CarPassat from "../images/cars-big/passatcc.jpg";

import Creta from "../images/cars-big/2.jpg";
import Nexon from "../images/cars-big/1jpeg.jpeg"
import Sel from "../images/cars-big/3.jpg";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../context/providerdata";
import { useForm } from "react-hook-form";

function BookCar() {

  const {account,setAccount} = useContext(DataContext);

  const [modal, setModal] = useState(false); //  class - active-modal

  // booking car
  const [carType, setCarType] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [carImg, setCarImg] = useState("");

  // modal infos
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [t1, sett1] = useState("");
  const [t2, sett2] = useState("");

  // taking value of modal inputs
  const handleTime1 = (e) => {
    sett1(e.target.value);
  };
  const handleTime2 = (e) => {
    sett2(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };


  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleZip = (e) => {
    setZipCode(e.target.value);
  };

  // open modal when all inputs are fulfilled
  const closeErr = () =>{
    const errMsg = document.querySelector(".error-message");
    errMsg.style.display = "none";
  }

  const closekrde = () =>{
    const errMsg = document.querySelector(".not-in-stock");
    errMsg.style.display = "none";
  }

  const URL = "http://localhost:8000";
  const [cars,setCars] = useState("");

  useEffect(()=>{
    const fetchdata = async()=>{
      const data  = await axios.get(`${URL}/cardata`);
      setCars(data);      
    }
    fetchdata();
  });

  const openModal = async(e) => {
    e.preventDefault();

    const obj = cars.data.find(main=> main.name === carType);
    
    
    const errorMsg = document.querySelector(".error-message");
    
    if (
      pickUp === "" ||
      dropOff === "" ||
      pickTime === "" ||
      dropTime === "" ||
      carType === ""
      ) {

        errorMsg.style.display = "flex";
      
      } else if(obj.stock === 0){
        
          document.querySelector(".not-in-stock").style.display="flex";

      }else {
        setModal(!modal);
        const modalDiv = document.querySelector(".booking-modal");
        modalDiv.scroll(0, 0);
        errorMsg.style.display = "none";
    }
  };

  // disable page scroll when modal is displayed
  useEffect(() => {
    if (modal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  // confirm modal booking
 
  const confirmBooking = async(e) => {
    e.preventDefault();
    setModal(!modal);
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "flex";

    let bookingData = {
      f_name:name,
      l_name:lastName,
      phone:phone,
      age:age,
      email:account.email,
      city:city,
      zipcode:zipcode,
      cartype:carType,
      pickup:pickUp,
      dropoff: dropOff,
      pickdate:pickTime,
      dropdate:dropTime,
      picktime:t1,
      droptime:t2
    };



    console.log(bookingData);

    await setTimeout(() => {
      doneMsg.style.display = "none";
    }, 5000);

    let res = await axios.post(`${URL}/reservebooking`,bookingData);
    console.log(res.data.message);



  };

  // taking value of booking inputs
  const handleCar = (e) => {
    setCarType(e.target.value);
    setCarImg(e.target.value);
  };

  const handlePick = (e) => {
    setPickUp(e.target.value);
  };

  const handleDrop = (e) => {
    setDropOff(e.target.value);
  };

  const handlePickTime = (e) => {
    setPickTime(e.target.value);
  };

  const handleDropTime = (e) => {
    setDropTime(e.target.value);
  };

  // based on value name show car img
  let imgUrl;
  switch (carImg) {
    case "Hyundai Nexon Ev":
      imgUrl = Nexon;
      break;
    case "Hyundai Creta":
      imgUrl = Creta;
      break;
    case "Toyota Camry":
      imgUrl = CarToyota;
      break;
    case "BMW 320 ModernLine":
      imgUrl = CarBmw;
      break;
    case "Mercedes-Benz GLK":
      imgUrl = CarMercedes;
      break;
    case "Kia Seltos":
      imgUrl = Sel;
      break;
    default:
      imgUrl = "";
  }

  // hide message
  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  return (
    <>
      <section id="booking-section" className="book-section">
        {/* overlay */}
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
        ></div>

        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a car</h2>

              <p className="error-message">
                All fields required! <i className="fa-solid fa-xmark" onClick={closeErr}></i>
              </p>

              <p className="not-in-stock" style={{
                display:"none",
                justifyContent:"space-between",
                width:"100%",
                fontSize:"1.6rem",
                borderRadius:"7px",
                color: "#721c24",
                backgroundColor: "#f8d7da",
                borderColor: "#f5c6cb",
                padding: "1rem 1.4rem",
                marginBottom:"1.8rem",
                marginTop: "-1rem",
                fontWeight: "500",
                alignItems:"center"
            }}>
                Car Not Available Please choose a different car type <i onClick={closekrde} className="fa-solid fa-xmark"></i>
              </p>

              <p className="booking-done">
                Check your email to confirm your reservation.{" "}
                <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>

              <form className="box-form">
                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-car"></i> &nbsp; Select Your Car
                    Type <b>*</b>
                  </label>
                  <select value={carType} onChange={handleCar}>
                    <option>Select your car type</option>
                    <option value="Hyundai Nexon Ev">Hyundai Nexon Ev</option>
                    <option value="Hyundai Creta">Hyundai Creta</option>
                    <option value="Toyota Camry">Toyota Camry</option>
                    <option value="BMW 320 ModernLine">
                    BMW 320 ModernLine
                    </option>
                    <option value="Mercedes-Benz GLK">Mercedes-Benz GLK</option>
                    <option value="Kia Seltos">Kia Seltos</option>  
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Pick-up{" "}
                    <b>*</b>
                  </label>
                  <select value={pickUp} onChange={handlePick}>
                    <option>Select pick up location</option>
                    <option>Rajpura</option>
                    <option>Patiala</option>
                    <option>Chandigarh</option>
                    <option>Panchkula</option>
                    <option>Mohali</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Drop-of{" "}
                    <b>*</b>
                  </label>
                  <select value={dropOff} onChange={handleDrop}>
                    <option>Select drop off location</option>
                    <option>Rajpura</option>
                    <option>Patiala</option>
                    <option>Chandigarh</option>
                    <option>Panchkula</option>
                    <option>Mohali</option>
                  </select>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Pick-up <b>*</b>
                  </label>
                  <input
                    id="picktime"
                    value={pickTime}
                    onChange={handlePickTime}
                    type="date"
                  ></input>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="droptime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Drop-of <b>*</b>
                  </label>
                  <input
                    id="droptime"
                    value={dropTime}
                    onChange={handleDropTime}
                    type="date"
                    min={pickTime}
                  ></input>
                </div>

                <button onClick={openModal} type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* modal ------------------------------------ */}

      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        {/* title */}
        <div className="booking-modal__title">
          <h2>Complete Reservation</h2>
          <i onClick={openModal} className="fa-solid fa-xmark"></i>
        </div>
        {/* message */}
        <div className="booking-modal__message">
          <h4>
            <i className="fa-solid fa-circle-info"></i> Upon completing this
            reservation enquiry, you will receive:
          </h4>
          <p>
            Your rental voucher to produce on arrival at the rental desk and a
            toll-free customer support number.
          </p>
        </div>
        {/* car info */}
        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h5>Location & Date</h5>
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Pick-Up Date & Time</h6>
                  <p>
                    {pickTime} /{" "}
                    <input type="time" value={t1} onChange={handleTime1} className="input-time" style={{width:"12rem"}}></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Drop-Off Date & Time</h6>
                  <p>
                    {dropTime} /{" "}
                    <input type="time" value={t2} onChange={handleTime2}  className="input-time" style={{width:"12rem"}}></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Pick-Up Location</h6>
                  <p>{pickUp}</p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Drop-Off Location</h6>
                  <p>{dropOff}</p>
                </div>
              </span>
            </div>
          </div>
          <div className="booking-modal__car-info__model">
            <h5>
              <span>Car -</span> {carType}
            </h5>
            {imgUrl && <img src={imgUrl} alt="car_img" />}
          </div>
        </div>
        {/* personal info */}
        <div className="booking-modal__person-info">
          <h4>Personal Information</h4>
          <form className="info-form">
            <div className="info-form__2col">
              <span>
                <label>
                  First Name <b>*</b>
                </label>
                <input
                  value={name}
                  onChange={handleName}
                  type="text"
                  placeholder="Enter your first name"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Last Name <b>*</b>
                </label>
                <input
                  value={lastName}
                  onChange={handleLastName}
                  type="text"
                  placeholder="Enter your last name"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>

              <span>
                <label>
                  Phone Number <b>*</b>
                </label>
                <input
                  value={phone}
                  onChange={handlePhone}
                  type="number"
                  placeholder="Enter your phone number"
                  minLength="10"
                  maxLength="10"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Age <b>*</b>
                </label>
                <input
                  value={age}
                  onChange={handleAge}
                  type="number"
                  placeholder="18"
                  min="18"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <div className="info-form__1col">
              <span>
                <label>
                  Email <b>*</b>
                </label>
                <input
                  value={account.email} 
                  onChange={handleEmail}
                  type="email"
                  placeholder={account.email}
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Address <b>*</b>
                </label>
                <input
                  value={address}
                  onChange={handleAddress}
                  type="text"
                  placeholder="Enter your street address"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <div className="info-form__2col">
              <span>
                <label>
                  City <b>*</b>
                </label>
                <input
                  value={city}
                  onChange={handleCity}
                  type="text"
                  placeholder="Enter your city"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Zip Code <b>*</b>
                </label>
                <input
                  value={zipcode}
                  onChange={handleZip}
                  type="text"
                  placeholder="Enter your zip code"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <span className="info-form__checkbox">
              <input type="checkbox"></input>
              <p>Please send me latest news and updates</p>
            </span>

            <div className="reserve-button">
              <button onClick={confirmBooking} type="submit">Reserve Now</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookCar;
