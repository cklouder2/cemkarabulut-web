"use client";

import React from "react";
import Particles from "./particles";
import MouseGradient from "./mouse-gradient";

interface BackgroundEffectProps {
	visible?: boolean;
	className?: string;
}

// Main BackgroundEffect Component
export default function BackgroundEffect({ visible = true, className = "" }: BackgroundEffectProps) {
	return (
		<div 
			className={`fixed inset-0 z-0 transition-all duration-1000 ease-out ${
				visible 
					? "opacity-100 scale-100" 
					: "opacity-0 scale-105"
			} ${className}`}
			aria-hidden="true"
		>
			{/* Base gradient background - more visible */}
			<div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] pointer-events-none opacity-80 z-10" />
			
			{/* Mouse gradient effect - behind particles */}
			<div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-20">
				<MouseGradient />
			</div>
			
			{/* Particles effect - in front of gradient, full screen coverage */}
			<div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-30">
				<Particles quantity={120} className="w-full h-full" />
			</div>
		</div>
	);
} 