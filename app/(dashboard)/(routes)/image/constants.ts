import * as z from 'zod';

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: 'Image Prompt is required',
    }),
    amount: z.string().min(1),
})

export const amountOptions = [
    {
        value: '1',
        label: '1 Picture',
    },
]

