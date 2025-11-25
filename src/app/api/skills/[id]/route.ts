import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Skill from '@/models/Skill';
import { withAuth } from '@/lib/auth';

// PUT /api/skills/[id] - Update a skill
export const PUT = withAuth(async (request: NextRequest, context: any) => {
  try {
    await connectDB();
    
    const { params } = context;
    const id = params.id;
    const body = await request.json();

    const skill = await Skill.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return NextResponse.json(
        { success: false, message: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: skill }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating skill:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update skill',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
});

// DELETE /api/skills/[id] - Delete a skill
export const DELETE = withAuth(async (request: NextRequest, context: any) => {
  try {
    await connectDB();
    
    const { params } = context;
    const id = params.id;

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return NextResponse.json(
        { success: false, message: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Skill deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete skill',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
});
