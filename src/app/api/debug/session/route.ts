import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log("Debug session:", {
      exists: !!session,
      user: session?.user?.name,
      accessToken: !!session?.accessToken,
    });
    
    return NextResponse.json({
      authenticated: !!session,
      user: session?.user,
      hasAccessToken: !!session?.accessToken,
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { error: "Failed to check session" },
      { status: 500 }
    );
  }
}
