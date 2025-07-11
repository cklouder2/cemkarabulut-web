import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye } from "lucide-react";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="p-4 md:p-8">
				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-zinc-500 text-xs  flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>
				{project.image && (
					<div className="my-2">
						<img src={project.image} alt={project.title} className="rounded w-full max-h-40 object-cover" />
					</div>
				)}
				<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
					{project.title}
				</h2>
				<p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
					{project.description}
				</p>
				{project.tech && project.tech.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-2">
						{project.tech.map((tech) => (
							<span key={tech} className="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded text-xs font-medium">
								{tech}
							</span>
						))}
					</div>
				)}
			</article>
		</Link>
	);
};
