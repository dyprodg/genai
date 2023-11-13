import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { checkApiLimit, increaseApiLimit  } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

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
        const isPro = await checkSubscription();

        if (!freeTrail && !isPro){
            return new NextResponse('Free trail has expired.', { status: 403})
        }


        const transformedMessages: { role: 'system' | 'user', content: string }[] = [
            {
                role: 'system',
                content: 'You are a conversation bot and will provide me with anything i will ask for and chat with me'
            },
            ...messages.map(message => ({
                role: 'user' as 'user',
                content: message.content
            }))
            
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-4-1106-preview',
            messages: transformedMessages,
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 0.8,
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

        if(!isPro) {
        await increaseApiLimit();
        }
        
        return NextResponse.json(responseData);
    } catch (error) {
       console.log("[CONVERSTION_ERROR]", error);
       return new NextResponse("Internal Error", {status: 500});
    }
}
