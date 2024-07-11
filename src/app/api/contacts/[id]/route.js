import { connectToDatabase } from "../../../../utils/mongodb";
import { ObjectId } from "mongodb";
import Joi from "joi";

const idSchema = Joi.string().custom((value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId validation");

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

export async function GET(request, { params }) {
  console.log("GET request received at /api/contacts/[id]");
  const start = Date.now();

  const { error: idError } = idSchema.validate(params.id);
  if (idError) {
    console.error("Invalid ID format");
    return new Response(JSON.stringify({ message: "Invalid ID format" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const { db } = await connectToDatabase();
    const { id } = params;

    const contact = await db.collection("contacts").findOne({ _id: new ObjectId(id) });

    const duration = Date.now() - start;
    console.log(`Query completed in ${duration}ms`);

    if (contact) {
      return new Response(JSON.stringify(contact), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      console.error("Contact not found");
      return new Response(JSON.stringify({ message: "Contact not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Error fetching contact:", error);
    return new Response(JSON.stringify({ message: "Error fetching contact", error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = params;
    const data = await request.json();

    // Validate id
    const { error: idError } = idSchema.validate(id);
    if (idError) {
      console.error("Invalid ID format");
      return new Response(JSON.stringify({ message: "Invalid ID format" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const { error: bodyError } = contactSchema.validate(data);
    if (bodyError) {
      console.error("Invalid request body", bodyError);
      return new Response(JSON.stringify({ message: "Invalid request body", error: bodyError.details }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    delete data._id;

    const result = await db.collection("contacts").updateOne({ _id: new ObjectId(id) }, { $set: data });

    if (result.matchedCount === 1) {
      return new Response(JSON.stringify({ message: "Contact updated successfully" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      console.error("Contact not found");
      return new Response(JSON.stringify({ message: "Contact not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    return new Response(JSON.stringify({ message: "Error updating contact", error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = params;

    const { error: idError } = idSchema.validate(id);
    if (idError) {
      console.error("Invalid ID format");
      return new Response(JSON.stringify({ message: "Invalid ID format" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const result = await db.collection("contacts").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return new Response(JSON.stringify({ message: "Contact deleted successfully" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      console.error("Contact not found");
      return new Response(JSON.stringify({ message: "Contact not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    return new Response(JSON.stringify({ message: "Error deleting contact", error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
