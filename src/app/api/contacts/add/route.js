import { connectToDatabase } from "../../../../utils/mongodb";
import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().optional().allow(""),
  email: Joi.string().email().optional().allow(""),
  phone: Joi.string()
    .pattern(/^\d{3}-\d{3}-\d{4}$/)
    .optional()
    .allow(""),
  status: Joi.string().valid("initial", "pending", "followedUp", "quoted", "client", "notInterested").required(),
  statusDate: Joi.date().max("now").required(),
  currentInsCo: Joi.string().optional().allow(""),
  state: Joi.string().optional().allow(""),
  needs: Joi.array().items(Joi.string()).optional().allow(""),
  preferredContact: Joi.array().items(Joi.string()).optional().allow(""),
  notes: Joi.string().optional().allow(""),
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
