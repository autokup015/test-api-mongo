import { Schema, model, Collection } from "mongoose";
import { TEmployee } from "../types/employee";

const EmployeeSchema = new Schema<TEmployee>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, default: "" },
    updated: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, res) => {
        const { _id, ...rest } = res;

        return {
          id: _id,
          ...rest,
        };
      },
    },
  }
);

const EmployeeModels = model<TEmployee>("employees", EmployeeSchema);

export { EmployeeModels };
