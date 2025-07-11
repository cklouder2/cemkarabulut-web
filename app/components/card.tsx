"use client";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "framer-motion";

import { MouseEventHandler, PropsWithChildren } from "react";
import clsx from "clsx";

type CardProps = PropsWithChildren & {
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<motion.div
			onMouseMove={onMouseMove}
			className={clsx(
         "card relative duration-700 border rounded-xl group md:gap-8 border-zinc-700/50 backdrop-blur-sm bg-zinc-900/20 hover:bg-zinc-900/80 hover:border-zinc-400/50 transition-colors overflow-visible",
         className
       )}
			whileHover={{ 
				scale: 1.02,
				transition: { duration: 0.3, ease: "easeOut" }
			}}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="pointer-events-none">
				<div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
				<motion.div
					className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000 group-hover:opacity-50"
					style={style}
				/>
				<motion.div
					className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
					style={style}
				/>
			</div>

			<div className="relative z-20">
				{children}
			</div>
		</motion.div>
	);
};
