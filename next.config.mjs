import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: 'export', // KALDIRILDI
	trailingSlash: true,
	images: {
		unoptimized: true
	},
	// Performance optimizations
	experimental: {
		optimizeCss: true,
		optimizePackageImports: ['@fortawesome/react-fontawesome', 'framer-motion', 'lucide-react'],
	},
	// Compression
	compress: true,
	// Cache headers for static assets - GEÇİCİ OLARAK DEVRE DIŞI
	// async headers() {
	// 	return [
	// 		{
	// 			source: '/(.*)',
	// 			headers: [
	// 				{
	// 					key: 'Cache-Control',
	// 					value: 'public, max-age=31536000, immutable',
	// 				},
	// 			],
	// 		},
	// 		{
	// 			source: '/_next/static/(.*)',
	// 			headers: [
	// 				{
	// 					key: 'Cache-Control',
	// 					value: 'public, max-age=31536000, immutable',
	// 				},
	// 			],
	// 		},
	// 		{
	// 			source: '/fonts/(.*)',
	// 			headers: [
	// 				{
	// 					key: 'Cache-Control',
	// 					value: 'public, max-age=31536000, immutable',
	// 				},
	// 			],
	// 		},
	// 		{
	// 			source: '/favicon.ico',
	// 			headers: [
	// 				{
	// 					key: 'Cache-Control',
	// 					value: 'public, max-age=31536000, immutable',
	// 				},
	// 			],
	// 		},
	// 		{
	// 			source: '/og.png',
	// 			headers: [
	// 				{
	// 					key: 'Cache-Control',
	// 					value: 'public, max-age=31536000, immutable',
	// 				},
	// 			],
	// 		},
	// 	];
	// },
	// Bundle analyzer (development only)
	...(process.env.ANALYZE === 'true' && {
		webpack: (config) => {
			config.plugins.push(
				new (require('@next/bundle-analyzer'))({
					enabled: true,
				})
			);
			return config;
		},
	}),
}

export default withContentlayer(nextConfig)
