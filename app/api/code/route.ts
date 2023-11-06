import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { checkApiLimit, increaseApiLimit  } from '@/lib/api-limit';

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

        const freeTrail = await checkApiLimit();

        if (!freeTrail){
            return new NextResponse('Free trail has expired.', { status: 403})
        }

        const transformedMessages: { role: 'system' | 'user', content: string }[] = [
            {
                role: 'system',
                content: 'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanation'
            },
            ...messages.map(message => ({
                role: 'user' as 'user',
                content: message.content
            }))
            
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: transformedMessages,
            temperature: 0.6,
            max_tokens: 1024,
            top_p: 0.7,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const responseData = {
            ...response,
            choices: response.choices.map(choice => ({
                ...choice,
                role: 'system'
            }))
        };
        await increaseApiLimit();
        
        return NextResponse.json(responseData);
    } catch (error) {
       console.log("[CODE_ERROR]", error);
       return new NextResponse("Internal Error", {status: 500});
    }
}
