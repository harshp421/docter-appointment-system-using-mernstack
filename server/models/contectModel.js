const mongoose = require("mongoose");

const contectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  doctername: {
    type: String,
    required: [true, "docterName is require"],
  },
  phone: {
    type: String,
    required: [true, "phone is require"],
  },
  date:{
    type: String,
    required: [true, "date is require"],
  },
  time: {
    type: String,
    required: true,
  },
   notifcation: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});

const contectModel = mongoose.model("contect", contectSchema);

module.exports = contectModel;
