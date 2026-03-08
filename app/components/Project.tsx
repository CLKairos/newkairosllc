import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function Project(data: { link: string | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) {
    return(
        <a href={data.link}><button className={"project-button"}>{data.title}</button></a>
    );
}