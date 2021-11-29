const mongoose = require("mongoose");
const mongooseShema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  street: {
    type: String,
    default: "",
  },
  apartment: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
});

mongooseShema.virtual('id').get(function () {
     return this._id.toHexString();
 });
 
 mongooseShema.set('toJSON', {
     virtuals: true,
 });

 
exports.User = mongoose.model("User", mongooseShema);
