export default function Sponsor(data: { link: string | undefined; image: string | Blob | undefined; name: string | undefined; }){
    return(
        <div className={"partner"}>
            <a href={data.link}>
                <img src={data.image} alt={data.name}/>
            </a>
        </div>
    );
}