import { csrfFetch } from "./csrf";

const LOAD = 'spots/LOAD'
const LOAD_ONE = 'spots/LOAD_ONE'
const CREATE = 'spots/CREATE'
const UPDATE = 'spots/UPDATE'
const REMOVE = 'spots/REMOVE'

const load = spots => ({
  type: LOAD,
  spots,
})
