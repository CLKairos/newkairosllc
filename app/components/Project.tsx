
export default function Project(data) {
    return(
        <a href={data.link}><button className={"project-button"}>{data.title}</button></a>
    );
}