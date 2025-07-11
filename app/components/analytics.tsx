"use client";

import { useEffect } from 'react';

export function Analytics() {
	const token = process.env.NEXT_PUBLIC_BEAM_TOKEN;
	
	useEffect(() => {
		if (!token) return;
		
		// Load analytics script with better performance
		const script = document.createElement('script');
		script.src = "https://beamanalytics.b-cdn.net/beam.min.js";
		script.setAttribute('data-token', token);
		script.async = true;
		script.defer = true;
		
		// Add to head with low priority
		document.head.appendChild(script);
		
		return () => {
			// Cleanup if component unmounts
			if (document.head.contains(script)) {
				document.head.removeChild(script);
			}
		};
	}, [token]);
	
	if (!token) {
		return null;
	}
	
	return null; // No need to render anything
}
