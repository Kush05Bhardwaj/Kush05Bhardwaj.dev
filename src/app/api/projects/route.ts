import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

// GET /api/projects - Fetch all active projects
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Check for featured query parameter
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    let query: any = { isActive: true };
    if (featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch projects',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project (for admin)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const project = await Project.create(body);

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create project',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
