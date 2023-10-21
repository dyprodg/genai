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
        label: 'Music Generation',
        icon: Music,
        color: 'text-orange-500',
        bgColor: 'bg-violet-500/10',
        href: '/music'
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
    {
        label: 'Video Generation',
        icon: Video,
        color: 'text-emerald-500',
        bgColor: 'bg-violet-500/10',
        href: '/video'
    }
]