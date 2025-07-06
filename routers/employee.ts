import type { TEmployee } from "../types/employee";

import { Request, Response, Router } from "express";
import { EmployeeModels } from "../models/employee";
import { MongooseError } from "mongoose";

const router = Router();

// ---------------------------------------------------------------------------------

router.get("/", async (req: Request, res: Response) => {
  try {
    const getEmployee = await EmployeeModels.find<TEmployee>({
      // age: { $gte: 30 },
    });

    res.json({
      data: getEmployee,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const getEmployee = await EmployeeModels.findById<TEmployee>(req.params.id);

    res.json({
      data: getEmployee,
    });
  } catch {
    res.json({
      data: null,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await EmployeeModels.create(req.body);

    res.send({ message: "success" });
  } catch (error) {
    if (!(error instanceof MongooseError)) {
      return;
    }

    const { message } = error;

    res.status(400).send({
      message,
    });
  }
});

router.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    await EmployeeModels.findByIdAndUpdate(req.params.id, req.body);

    res.json({ message: "update success" });
  } catch (error) {
    if (!(error instanceof MongooseError)) {
      return;
    }

    const { message } = error;

    res.status(400).send({
      message,
    });
  }
});

router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    await EmployeeModels.findByIdAndDelete(req.params.id);

    res.json({ message: "delete success" });
  } catch (error) {
    if (!(error instanceof MongooseError)) {
      return;
    }

    const { message } = error;

    res.status(400).send({
      message,
    });
  }
});

module.exports = router;
