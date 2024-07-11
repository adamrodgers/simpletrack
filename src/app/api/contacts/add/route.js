import { connectToDatabase } from "../../../../utils/mongodb";
import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().optional(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\d{3}-\d{3}-\d{4}$/)
    .required(),
  status: Joi.string().valid("initial", "pending", "followedUp", "quoted", "client", "notInterested").required(),
  statusDate: Joi.date().max("now").required(),
  currentInsCo: Joi.string().optional(),
  state: Joi.string().optional(),
  needs: Joi.array().items(Joi.string()).optional(),
  preferredContact: Joi.array().items(Joi.string()).optional(),
  notes: Joi.string().optional(),
}).unknown();

export async function POST(request) {
  console.log("API route hit");

  try {
    const { db } = await connectToDatabase();
    const data = await request.json();

    console.log("Data received:", data);

    const { error } = contactSchema.validate(data);
    if (error) {
      console.error("Invalid request body", error);
      return new Response(JSON.stringify({ message: "Invalid request body", error: error.details }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await db.collection("contacts").insertOne(data);

    return new Response(JSON.stringify({ insertedId: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Error adding contact", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
