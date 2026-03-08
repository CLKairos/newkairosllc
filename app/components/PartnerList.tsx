import Partner from "./Partner";

const partners = [
    {
        name: "Farmers Bank & Trust",
        image: "https://www.myfarmers.bank/assets/files/jMmEnSPx/Vertical.png",
        link: "https://myfarmers.bank",
    },
];

export default function PartnerList() {
    return (
        <div className="partnerlist">
            {partners.map((info) => (
                <Partner key={info.name} name={info.name} image={info.image} link={info.link} />
            ))}
        </div>
    );
}