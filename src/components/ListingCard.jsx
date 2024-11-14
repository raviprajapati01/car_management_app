import { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
  DeleteForever,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://car-management-app-172y.onrender.com";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  description,
  title,
}) => {
  /* SLIDER FOR IMAGES */
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();

  /* ADD TO WISHLIST */
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  const isLiked = wishList?.find((item) => item?._id === listingId);

  /* DELETE LISTING */
  const deleteListing = async () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      const response = await fetch(`${BACKEND_URL}/listing/${listingId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Listing deleted successfully");
        // Optionally, you can navigate the user away or update the UI
        navigate("/properties");
      } else {
        alert("Failed to delete the listing. Please try again.");
      }
    }
  };

  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`${BACKEND_URL}/${photo?.replace("public", "")}`}
                alt={`Img ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3>
        {title}
      </h3>
      <p>{description}</p>

      <div className="actions">
        <button
          className="favorite"
          onClick={(e) => {
            e.stopPropagation();
          }}
          disabled={!user}
        >
          {isLiked ? (
            <Favorite sx={{ color: "red" }} />
          ) : (
            <Favorite sx={{ color: "white" }} />
          )}
        </button>

        {user?._id === creator._id && (
          <button
            className="delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteListing();
            }}
          >
            <DeleteForever sx={{ color: "red" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
