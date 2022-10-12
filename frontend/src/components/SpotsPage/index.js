import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import "./SpotsPage.css";

const SpotsPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if (!spots) return <h1>Loading...</h1>;

  return (
    <div id="all-spots-container">
      {Object.values(spots).map(spot => (
        <>

        <div id="spot-card-container">

        <img style={{width:"250px", height:"250px"}}src={spot.previewImage}></img>
        </div>
        </>
      ))}
    </div>
  );
};

export default SpotsPage;
