import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
    try {
      //@todo make a better redirect
   return NextResponse.redirect('https://warpcast.com/funkornaut', { status: 302 }) 
  } catch (error) {
   console.log(error) 
    return NextResponse.json({ error: error })
  }
}