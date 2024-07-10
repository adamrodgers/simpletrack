import { connectToDatabase } from "./mongodb";

export async function handleSignIn(user) {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ email: user.email });

    if (!existingUser) {
      await usersCollection.insertOne({
        userId: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        createdAt: new Date(),
        lastLoggedIn: new Date(),
        isAdmin: user.id === process.env.ADMIN_ID,
      });
    } else {
      await usersCollection.updateOne(
        { email: user.email },
        {
          $set: {
            lastLoggedIn: new Date(),
            isAdmin: user.id === process.env.ADMIN_ID,
          },
        }
      );
    }

    return true;
  } catch (error) {
    console.error("Error during sign in:", error);
    return false;
  }
}

export async function getUserByEmail(email) {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");
    return await usersCollection.findOne({ email });
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
