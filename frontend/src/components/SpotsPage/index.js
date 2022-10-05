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
    <div>
      {Object.values(spots).map(spot => (

        <h1>{spot.previewImage}MEH</h1>
      ))}
    </div>
  );
};

export default SpotsPage;
