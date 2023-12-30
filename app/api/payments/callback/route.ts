import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  console.log('Payments callback route accessed');
  console.log(req.json());
  NextResponse.json({ message: 'Hello World' });
}
