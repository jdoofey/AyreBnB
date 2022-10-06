import { csrfFetch } from "./csrf";

const LOAD_ALL = "spots/LOAD_ALL";
const LOAD_CURRENT = "spots/LOAD_CURRENT";
const LOAD_ONE = "spots/LOAD_ONE";
const ADD = "spots/ADD";
const EDIT = "spots/EDIT";
const REMOVE = "spots/REMOVE";
const RESET = 'spots/RESET'

const loadAll = (spots) => ({
  type: LOAD_ALL,
  spots,
});

const loadCurrent = (spots) => ({
  type: LOAD_CURRENT,
  spots,
});

const loadOne = (spot) => ({
  type: LOAD_ONE,
  spot,
});

const add = (spot) => ({
  type: ADD,
  spot,
});

const edit = spot => ({
  type: EDIT,
  spot
})

const remove = spotId => ({
  type: REMOVE,
  spotId
})

export const getAllSpots = () => async dispatch => {
  const res = await fetch('/api/spots')
  if (res.ok) {
    const spots = await res.json()
    console.log(spots)
    dispatch(loadAll(spots))
  }
}
const initialState = {allSpots:{}, singleSpot:{}}

const spotsReducer = (state = initialState, action) => {
  const allSpots = {}
  const singleSpot = {}

  switch(action.type) {
    case LOAD_ALL:
      action.spots.Spots.forEach(spot=> allSpots[spot.id]=spot)
      return {allSpots, singleSpot}
    case RESET:
      return initialState
    default:
      return state
  }
}

export default spotsReducer
