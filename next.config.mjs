import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: 'export', // KALDIRILDI
	// trailingSlash: true, // KALDIRILDI - Turkish URL routing için
	images: {
		unoptimized: true
	},
	// Performance optimizations
	experimental: {
		optimizeCss: true,
		optimizePackageImports: ['@fortawesome/react-fontawesome', 'framer-motion', 'lucide-react'],
		// Mobile performance optimizations
		legacyBrowsers: false,
		modernBrowsers: true,
	},
	// Compression
	compress: true,
	// Mobile performance optimizations
	swcMinify: true,
	// Bundle optimization
	webpack: (config, { dev, isServer }) => {
		// Mobile performance optimizations
		if (!dev && !isServer) {
			config.optimization = {
				...config.optimization,
				splitChunks: {
					...config.optimization.splitChunks,
					cacheGroups: {
						...config.optimization.splitChunks.cacheGroups,
						// Separate vendor chunks for better caching
						vendor: {
							test: /[\\/]node_modules[\\/]/,
							name: 'vendors',
							chunks: 'all',
							priority: 10,
						},
						// Separate common chunks
						common: {
							name: 'common',
							minChunks: 2,
							chunks: 'all',
							priority: 5,
						},
					},
				},
			};
		}
		
		// Bundle analyzer (development only)
		if (process.env.ANALYZE === 'true') {
			config.plugins.push(
				new (require('@next/bundle-analyzer'))({
					enabled: true,
				})
			);
		}
		
		return config;
	},
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
}

export default withContentlayer(nextConfig)
