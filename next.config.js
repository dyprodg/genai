/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'oaidalleapiprodscus.blob.core.windows.net',
            'pbxt.replicate.delivery',
            'replicate.delivery',
        ]
    }
}

module.exports = nextConfig
