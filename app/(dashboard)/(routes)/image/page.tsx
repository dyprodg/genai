'use client'

import axios from 'axios';
import * as z from 'zod';
import { Heading } from "@/components/heading";
import Image from "next/image";
import { ImageIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';
import { Download } from 'lucide-react';


const ImageGenerationPage = () => {

    const router = useRouter();

    const [images, setImages] = useState<string[]>([]);

    type MessageType ={
        content: string;
        role: 'user' | 'system'; 
    }
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
            amount: '1',
            resolution: '512x512'
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([])
            const response = await axios.post('/api/image', values)

            const urls = response.data.map((image: {url: string}) => image.url)

            setImages(urls);
            form.reset();
        } catch (error: any) {
            //Todo: open pro model
            console.log(error)
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
                title='Image Generation'
                description='Turn your words into pictures'
                icon={ImageIcon}
                iconColor='text-pink-500'
                bgColor='bg-violet-500/10'
            />
                    <Form {...form}>
                        <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2'
                        >
                            <FormField name='prompt'
                            render={({field}) => (
                                <FormItem className='col-span-12 lg:col-span-6'>
                                    <FormControl className='m-0 p-0'>
                                        <Input 
                                            className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            disabled={isLoading}
                                            placeholder='Describe the picture you want...'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}/>

                            {/* Picture Amount Selection */}
                            <FormField
                                name='amount'
                                control={form.control}
                                render={({field }) => (
                                    <FormItem className='col-span-12 lg:col-span-2'>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            {/* Resoltion Option Selection */}
                            <FormField
                                name='resolution'
                                control={form.control}
                                render={({field }) => (
                                    <FormItem className='col-span-12 lg:col-span-2'>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            {/* Generate Button */}
                            <Button 
                            className='col-span-12 lg:col-span-2 w-full'
                            disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* Image Area */}
                <div className='mt-8 space-y-4 w-full'>
                    {isLoading && (
                        <div className='p-2'>
                            <Loader />
                        </div>
                    )}
                    {images.length === 0 && !isLoading && (
                        <Empty 
                            label='No images generated yet'
                            imagesource='/images.png'
                        />
                    )}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
                        {images.map((src) => (
                            <Card
                                key={src}
                                className='rounded-lg overflow-hidden'
                            >
                                <div className='relative aspect-square'>
                                    <Image 
                                        alt='image'
                                        fill
                                        src={src}
                                    />
                                </div>
                                <CardFooter className='p-2'>
                                    <Button 
                                        onClick={() => window.open(src)}
                                        variant='secondary'
                                        className='w-full'
                                    >
                                        <Download className='h-4 w-4 mr-2'/>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ImageGenerationPage;