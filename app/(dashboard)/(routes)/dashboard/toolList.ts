import {  Code, Image, MessageSquare, Music, Video } from "lucide-react";

export const toolList = [
    {
        label: 'Conversation',
        icon: MessageSquare,
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
        href: '/conversation'
    },
    {
        label: 'Code Generation',
        icon: Code,
        color: 'text-green-500',
        bgColor: 'bg-violet-500/10',
        href: '/code'
    },
    {
        label: 'Image Generation',
        icon: Image,
        color: 'text-pink-500',
        bgColor: 'bg-violet-500/10',
        href: '/image'
    },
]