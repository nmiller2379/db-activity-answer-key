import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../models/User";

export async function GET(req) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const users = await User.find({}); // Fetch all users
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching users" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const { name, email } = await req.json(); // Parse the request body
    const newUser = new User({ name, email });
    await newUser.save(); // Save new user to the database
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating user" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const { id, name, email } = await req.json(); // Parse the request body
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating user" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const { id } = await req.json(); // Parse the request body
    await User.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "User deleted" }), {
      status: 200,
    });
  }
  catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting user" }), {
      status: 500,
    });
  }
}
