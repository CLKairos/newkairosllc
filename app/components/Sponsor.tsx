export default function Sponsor(data){
    return(
        <div className={"partner"}>
            <a href={data.link}>
                <img src={data.image} alt={data.name}/>
            </a>
        </div>
    );
}