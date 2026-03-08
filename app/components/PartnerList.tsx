import Partner from "./Partner";

const partner = [
    {
        name: "Farmers Bank & Trust",
        image: "https://www.myfarmers.bank/assets/files/jMmEnSPx/Vertical.png",
        link: "https://myfarmers.bank",
    }
]

export default function PartnerList(){
    return(
        <div className={"partnerlist"}>
            {
                partner.map((info) => (
                    // eslint-disable-next-line react/jsx-key
                    <Partner name={info.name} image={info.image} link={info.link} />
                ))
            }
        </div>
    );
}