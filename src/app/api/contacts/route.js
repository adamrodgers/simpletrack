import { connectToDatabase } from "../../../utils/mongodb";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const contacts = await db.collection("contacts").find({}).toArray();

    const response = new Response(JSON.stringify(contacts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    });
    return response;
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching contacts", error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
