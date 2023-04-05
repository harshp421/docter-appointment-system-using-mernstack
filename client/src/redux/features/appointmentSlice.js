import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
     appointment: null,
  },
  reducers: {
    setAppointment: (state, action) => {
      state.appointment = action.payload;
    },
  },
});

export const { setAppointment } = appointmentSlice.actions;
