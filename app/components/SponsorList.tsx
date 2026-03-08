import Sponsor from "./Sponsor";

const sponsor = [
    {
        name: "",
        image: "",
        link: "",
    }
]

export default function PartnerList(){
    return(
        <div className={"partnerlist"}>
            {
                sponsor.map((info) => (
                    // eslint-disable-next-line react/jsx-key
                    <Sponsor name={info.name} image={info.image} link={info.link} />
                ))
            }
        </div>
    );
}