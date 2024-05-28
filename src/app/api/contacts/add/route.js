import { connectToDatabase } from "../../../../utils/mongodb";

export async function POST(request) {
  console.log("API route hit");

  try {
    const { db } = await connectToDatabase();
    const data = await request.json();

    console.log("Data received:", data);

    const result = await db.collection("contacts").insertOne(data);

    return new Response(JSON.stringify({ insertedId: result.insertedId }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Error adding contact", error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
