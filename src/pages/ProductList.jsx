import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setProductList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer"

import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import variables from "../styles/variables.scss";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://car-management-app-2cwb.onrender.com"


const ProductList = () => {

  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)
  const ProductList = user?.ProductList;
  console.log(user)

  const dispatch = useDispatch()
  const getProductList = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/${user._id}/properties`, {
        method: "GET"
      })
      const data = await response.json()
      console.log(data)
      dispatch(setProductList(data))
      setLoading(false)
    } catch (err) {
      console.log("Fetch all properties failed", err.message)
    }
  }

  useEffect(() => {
    getProductList()
  }, [])

  return loading ? <Loader /> : (
    <>
      <Navbar />

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search
            sx={{ color: variables.pinkred }}
            onClick={() => { navigate(`/properties/search/${search}`) }}
          />
        </IconButton>
      </div>
      
      <h1 className="title-list">Your Car Listing</h1>
      <div className="list">
        {ProductList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            title,
            description,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
              title={title}
              description={description}
            />
          )
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProductList;
