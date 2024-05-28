import { connectToDatabase } from "../../../utils/mongodb";

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const contacts = await db.collection("contacts").find({}).toArray();
    return new Response(JSON.stringify(contacts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching contacts", error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
