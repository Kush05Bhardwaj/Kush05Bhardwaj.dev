import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('admin123', 10);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if email matches
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // For initial setup, check plain password if no hash exists
    let isValidPassword = false;
    
    if (process.env.ADMIN_PASSWORD_HASH) {
      // Compare with hashed password
      isValidPassword = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    } else {
      // For initial setup, allow plain password comparison
      isValidPassword = password === process.env.ADMIN_PASSWORD;
    }

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return token
    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        token,
        user: { email, role: 'admin' }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
