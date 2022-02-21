import { GET_HOME_DATA, GET_ALL_DRIVERS, GET_ALL_FLIGHTS } from "../actions/config";

const initialState = {
  home: [],
  drivers: [],
  flights: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_DATA:
      return { ...state, home: action.payload };

    case GET_ALL_DRIVERS:
      //console.log(action.payload);
      return { ...state, drivers: action.payload };

    case GET_ALL_FLIGHTS:
      //console.log(action.payload);
      action.payload.map(e => {
        state.flights.push(e)
      })
     
      return { ...state, flights: [ ...state.flights],};

    default:
      return state;
  }
};
