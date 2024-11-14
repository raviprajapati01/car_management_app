import { useEffect, useState } from "react";
import "../styles/ProductDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer"

import enUS from 'date-fns/locale/en-US'; // Import the locale

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://car-management-app-2cwb.onrender.com"

const ProductDetail = () => {
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  console.log("listing id is:", listingId);

  const getProductDetail = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/properties/${listingId}`);


      console.log("responce is: ", response)

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setListing(data);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    } finally {
      setLoading(false); // Ensure loading state is set to false after fetch
    }
  };


  useEffect(() => {
    getProductDetail();
  }, []);

  console.log("liating is: ", listing)


  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!listing || !customerId || dayCount <= 0) {
      console.error("Invalid data for booking");
      return;
    }

    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      console.log("form data is:", bookingForm)

      const response = await fetch(`${BACKEND_URL}/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      console.log("responce is booking is ", response)

      if (response.ok) {
        navigate(`/${customerId}/trips`);
      } else {
        console.error("Booking failed", response.statusText);
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };


  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              src={`${BACKEND_URL}/${item.replace("public", "")}`}
              alt="listing Img"
            />
          ))}
        </div>
        <div className="profile">
          <img alt="Img profile"
            src={`${BACKEND_URL}/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
