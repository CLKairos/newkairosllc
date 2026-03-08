import { ReactNode } from "react";

interface CardProps {
    title: ReactNode;
    info: ReactNode;
}

export default function Card({ title, info }: CardProps) {
    return (
        <div className="card">
            <h2 className="card-title">{title}</h2>
            <p className="card-info">{info}</p>
        </div>
    );
}