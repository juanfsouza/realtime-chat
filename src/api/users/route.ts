import { createUser, getUserById, updateUserProfile } from '@/lib/userService';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = await createUser(email, password);
  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const { userId, username, imageUrl } = await request.json();
  const user = await updateUserProfile(userId, username, imageUrl);
  return NextResponse.json(user);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = Number(searchParams.get('userId'));
  const user = await getUserById(userId);
  return NextResponse.json(user);
}
