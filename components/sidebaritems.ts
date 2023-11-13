import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";

export const sidebaritems = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500'
    },
    {
        label: 'Conversation',
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-500'
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        href: '/image',
        color: 'text-pink-500'
    },
    {
        label: 'Code Generation',
        icon: Code,
        href: '/code',
        color: 'text-green-500'
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
        color: 'text-gray-200'
    },
]
