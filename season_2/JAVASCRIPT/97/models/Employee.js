import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  salary: { type: Number, required: true, min: 0 },
  language: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  isManager: { type: Boolean, default: false },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
