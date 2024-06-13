import { connectToDatabase } from "../../../utils/mongodb";

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const insurableItems = await db.collection("insurableItems").find({}).toArray();
    return new Response(JSON.stringify(insurableItems), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch insurable items" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
