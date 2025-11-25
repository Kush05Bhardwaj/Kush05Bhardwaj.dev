import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Skill from '@/models/Skill';
import { withAuth } from '@/lib/auth';

// GET /api/skills - Fetch all active skills
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const skills = await Skill.find({ isActive: true })
      .sort({ category: 1, order: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error: any) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch skills',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// POST /api/skills - Create a new skill (for admin)
export const POST = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();

    const body = await request.json();
    const skill = await Skill.create(body);

    return NextResponse.json(
      {
        success: true,
        data: skill,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create skill',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
});
