const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "user"],
      default: "user"
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant"
    },
    tokens: [{            
      token: {
        type: String,
        required: true
      }
    }]
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    console.log("Error hashing password: ", error);
    next(error);
  }
});


userSchema.methods.generateAuthToken = async function() {
  const token = await jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }   
  );


  this.tokens = this.tokens.concat({ token });
  await this.save();
  
  return token;
};


userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
