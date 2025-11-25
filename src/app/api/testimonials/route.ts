import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

// GET /api/testimonials - Fetch all active testimonials
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .populate('projectRelated', 'title')
      .lean();

    return NextResponse.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch testimonials',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// POST /api/testimonials - Create a new testimonial (for admin)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const testimonial = await Testimonial.create(body);

    return NextResponse.json(
      {
        success: true,
        data: testimonial,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create testimonial',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
