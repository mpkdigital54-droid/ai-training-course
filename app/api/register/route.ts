import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, level, plan, language } = body;

    // Validate required fields
    if (!name || !email || !phone || !level || !plan) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("registrations")
      .insert([
        {
          name,
          email,
          phone,
          level,
          plan,
          language: language || "en",
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save registration. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful!",
        data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
