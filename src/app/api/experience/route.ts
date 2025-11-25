import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Experience from '@/models/Experience';

// GET /api/experience - Fetch all active experiences
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const experiences = await Experience.find({ isActive: true })
      .sort({ order: 1, startDate: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error: any) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch experiences',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// POST /api/experience - Create a new experience (for admin)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const experience = await Experience.create(body);

    return NextResponse.json(
      {
        success: true,
        data: experience,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating experience:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create experience',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
