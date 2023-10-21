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
        const { messages } = body;

        if(!userId) {
            return new NextResponse('Unauthorized', { status: 401});
        }

        if(!openai.apiKey){
            return new NextResponse('OpenAI API Key not configured', {status: 500});
        }

        if(!messages) {
            return new NextResponse('messages are required', {status: 400});
        }

        const transformedMessages: { role: 'system' | 'user', content: string }[] = [
            {
                role: 'system',
                content: 'Start a conversation with GPT-3.5-turbo'
            },
            ...messages.map(message => ({
                role: 'user' as 'user',
                content: message.content
            }))
            
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: transformedMessages,
            temperature: 0,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return NextResponse.json(response);
    } catch (error) {
       console.log("[CONVERSTION_ERROR]", error);
       return new NextResponse("Internal Error", {status: 500});
    }
}
