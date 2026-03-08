import { ReactNode } from "react";

interface ProjectProps {
    title: ReactNode;
    link: string;
}

export default function Project({ title, link }: ProjectProps) {
    return (
        <a href={link}>
            <button className="project-button">{title}</button>
        </a>
    );
}