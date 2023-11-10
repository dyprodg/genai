import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Models } from 'openai/resources/models.mjs'
import { ModalProvider } from '@/components/modal-provider'
import { ToasterProvider } from '@/components/toaster-provider'
import { CrispProvider } from '@/components/crips-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AIOrchard',
  description: 'Multi AI Tool Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider>
    <html lang="en">
      <CrispProvider />
      <body className={inter.className}>
        
        <ModalProvider />
        <ToasterProvider />
        {children}
      
      </body>
    </html>
    </ClerkProvider>
  )
}
