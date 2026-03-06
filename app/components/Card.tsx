
export default function Card(data) {
    return(
        <div className={"card"}>
            <h2 className={"card-title"}>{data.title}</h2>
            <p className={"card-info"}>{data.info}</p>
        </div>
    );
}