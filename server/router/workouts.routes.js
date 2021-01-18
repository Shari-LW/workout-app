import express from "express";
import { to } from "await-to-js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { type, duration } = req.body;
  console.log(`Type: ${type} Duration: ${duration}`);

  /**
   * In here, have a look at the router.post('register') example on line 43 of auth.route.js
   * Have a think about how you could take some of that code and convert it to create a WORKOUT instead of a USER
   */

  // HWK:
  // router.post("/workout", async (req, res) => {
  //   const {type, duration } = req.body;

  return res.status(200).json({
    success: true,
    data: "/",
  });
});

export default router;
