'use client'

import axios from 'axios';
import * as z from 'zod';
import { Heading } from "@/components/heading";
import { MusicIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import { useProModal } from '@/hooks/use-pro-modal';



const MusicGenerationPage = () => {

    const proModal = useProModal();
    const router = useRouter();

    type MessageType ={
        content: string;
        role: 'user' | 'system'; 
    }
    

    const [music, setMusic] = useState<string>();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined)
            
            const response = await axios.post('/api/music', values)

            setMusic(response.data.audio);
            form.reset();
        } catch (error: any) {
            if(error?.response?.status === 403){
                proModal.onOpen();
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            
            <div className="p-4 lg:px-8">
                {/* Form Comp */}
                <div>
                <Heading 
                title='Music Generation'
                description='Turn your words into Music'
                icon={MusicIcon}
                iconColor='text-orange-500'
                bgColor='bg-violet-500/10'
            />
                    <Form {...form}>
                        <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2'
                        >
                            <FormField name='prompt'
                            render={({field}) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='m-0 p-0'>
                                        <Input 
                                            className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            disabled={isLoading}
                                            placeholder='Type your message here...'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}/>
                            <Button 
                            className='col-span-12 lg:col-span-2 w-full'
                            disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* Chat comp */}
                <div className='mt-8 space-y-4 w-full'>
                    {isLoading && (
                        <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                            <Loader />
                        </div>
                    )}
                    {!music && !isLoading && (
                        <Empty 
                            label='No music generated yet'
                            imagesource='/music.png'
                        />
                    )}
                </div>
                {music && (
                    <audio controls>
                        <source src={music} />
                    </audio>

                )}
            </div>
        </div>
    )
}

export default MusicGenerationPage;