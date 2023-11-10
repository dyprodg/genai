import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from "replicate";
import { checkApiLimit, increaseApiLimit  } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';


export async function POST(req: Request) {
    
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });

    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1 } = body;

        if(!userId) {
            return new NextResponse('Unauthorized', { status: 401});
        }

        if(!replicate.auth){
            return new NextResponse('Replicate API Key not configured', {status: 500});
        }

        if(!prompt) {
            return new NextResponse('prompt is required', {status: 400});
        }
        if(!amount) {
            return new NextResponse('amount is required', {status: 400});
        }

        const freeTrail = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrail && !isPro){
            return new NextResponse('Free trail has expired.', { status: 403})
        }

        const output = await replicate.run(
            "stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316",
            {
              input: {
                prompt: prompt,
                num_outputs: Number(amount),
              }
            }
          );

        if(!isPro) {
        await increaseApiLimit();
        }
        
        return NextResponse.json(output);
    } catch (error) {
       console.log("[IMAGEGENERATION_ERROR]", error);
       return new NextResponse("Internal Error", {status: 500});
    }
}
