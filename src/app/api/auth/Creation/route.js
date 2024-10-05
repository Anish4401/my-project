import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
async function handleUserCreation() {
  try {
    console.log("Starting user creation process..."); // Log for debugging

    const { isAuthenticated, getUser } = getKindeServerSession();
    console.log("Kinde session initialized...");

    // Check if user is authenticated
    const isUserAuthenticated = await isAuthenticated();
    console.log("Is user authenticated:", isUserAuthenticated); // Log for debugging
    if (!isUserAuthenticated) {
      console.log("User is not authenticated");
      return { error: "User is not authenticated", statusCode: 401 };
    }

    // Get the user details from the session
    const user = await getUser();
    console.log("Fetched user from Kinde session:", user); // Log user details
    if (!user || !user.id) {
      console.log("No user found in session");
      return { error: "No user found in session", statusCode: 400 };
    }

    // Check if the user exists in the database
    let dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    console.log("Database user:", dbUser); // Log for debugging

    // If the user doesn't exist, create a new user
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email ?? "",
          // Ensure you handle passwords securely
          family_name: user.family_name ?? "",
          given_name: user.given_name ?? "",

          picture:
            user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,

          username: user.username ?? "",
          phone_number: user.phone_number ?? "",
        },
      });
      console.log("Created new user in database:", dbUser); // Log for debugging
    }

    // Everything went fine, return the user or success flag
    return { success: true, user: dbUser };
  } catch (error) {
    console.error("Error handling user creation:", error);
    return { error: "Internal server error", statusCode: 500 };
  }
}

// Named export for GET method
export async function GET(req) {
  console.log("Handler initiated, method: GET"); // Log method type

  // Call the helper function to handle user creation logic
  const result = await handleUserCreation();
  console.log("Result from user creation:", result); // Log the result

  // If there's an error, return the appropriate status code and message
  if (result.error) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: result.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If successful, redirect to the dashboard
  console.log("Redirecting to dashboard...");
  return Response.redirect("http://localhost:3000");
}

// Add named exports for other HTTP methods if needed (e.g., POST, PUT, DELETE)
