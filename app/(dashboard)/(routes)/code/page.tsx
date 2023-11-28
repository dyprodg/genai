'use client'

import axios from 'axios';
import * as z from 'zod';
import { Heading } from "@/components/heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import { UserAvater } from '@/components/user-avater';
import { BotAvatar } from '@/components/bot-avatar';
import ReactMarkdown from 'react-markdown'
import { useProModal } from '@/hooks/use-pro-modal';
import toast from 'react-hot-toast';
import hljs from 'highlight.js';
import 'highlight.js/styles/arta.css';
import { Textarea } from '@/components/ui/textarea';




const CodePage = () => {

    const proModal = useProModal();
    const router = useRouter();

    type MessageType ={
        content: string;
        role: 'user' | 'system'; 
    }
    

    const [messages, setMessages] = useState<MessageType[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage = {
                content: values.prompt
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post('/api/code', {
                messages: newMessages,
            })

            setMessages((current) => [
                ...current, 
                { content: values.prompt, role: 'user' }, 
                { content: response.data.choices[0].message.content, role: response.data.choices[0].message.role }
            ]);
            form.reset();
        } catch (error: any) {
            if(error?.response?.status === 403){
                proModal.onOpen();
            } else {
                toast.error('Something went wrong')
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            
            <div className="p-4 lg:px-8">
                {/* Form Comp */}
                <div className=''>
                <div>
                <Heading 
                title='Code Generation'
                description='Generate code using descriptive text'
                icon={Code}
                iconColor='text-emerald-500'
                bgColor='bg-black/70'
            />
                    <Form {...form}>
                        <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='rounded-lg w-full p-4 px-3 md:px-6 shadow-xl grid grid-cols-12 gap-2'
                        >
                            <FormField name='prompt'
                            render={({field}) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='m-0 p-0'>
                                    <Textarea
                                            className='p-2 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none w-full'
                                            rows={4}
                                            disabled={isLoading}
                                            placeholder='Type your message here...'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}/>
                            <Button 
                            className='col-span-12 lg:col-span-2 w-full hover:scale-105 transition ease-in-out'
                            disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                </div>
                {/* Chat comp */}
                <div className='mt-8 space-y-4 w-full'>
                    {isLoading && (
                        <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty 
                            label=''
                            imagesource='/logored.png'
                        />
                    )}
                    <div className='flex flex-col-reverse gap-y-4'>
                        {messages.map((message, index) => (
                            <div 
                                key={index}
                                className={cn(
                                    'p-8 w-full flex items-start gap-x-8 rounded-lg overflow-x-auto',
                                    message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted'
                                )}
                            >
                                {message.role === 'user' ? <UserAvater /> : <BotAvatar />}
                                
                                <ReactMarkdown
                                    components={{
                                        // Use 'any' to bypass TypeScript checks for the 'inline' prop
                                        code: ({ node, className, children, ...props }: any) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !props.inline && match ? (
                                            <pre className={className} {...props}>
                                            <code 
                                                className={className} 
                                                dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(String(children), [match[1]]).value }} 
                                            />
                                            </pre>
                                        ) : (
                                            <code className={className} {...props}>
                                            {children}
                                            </code>
                                        );
                                        },
                                    }}
                                    >
                                    {message.content || ''}
                                    </ReactMarkdown>

                                
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CodePage;