import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

interface Message {
    content: string;
}

interface RequestBody {
    messages: Message[];
}

export async function POST(req: Request) {
    
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const { userId } = auth();
        const body: RequestBody = await req.json();
        const { prompt, amount = 1, resolution = '512x512' } = body;

        if(!userId) {
            return new NextResponse('Unauthorized', { status: 401});
        }

        if(!openai.apiKey){
            return new NextResponse('OpenAI API Key not configured', {status: 500});
        }

        if(!prompt) {
            return new NextResponse('prompt is required', {status: 400});
        }
        if(!amount) {
            return new NextResponse('amount is required', {status: 400});
        }
        if(!resolution) {
            return new NextResponse('resolution is required', {status: 400});
        }

        const response = await openai.images.generate({
            prompt: prompt,
            n: parseInt(amount, 10 ),
            size: resolution,

        });

       

        return NextResponse.json(response.data);
    } catch (error) {
       console.log("[IMAGEGENERATION_ERROR]", error);
       return new NextResponse("Internal Error", {status: 500});
    }
}
