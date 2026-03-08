import Sponsor from "./Sponsor";

const sponsors = [
    {
        name: "",
        image: "",
        link: "",
    },
];

export default function SponsorList() {
    return (
        <div className="partnerlist">
            {sponsors.map((info, index) => (
                <Sponsor key={info.name || index} name={info.name} image={info.image} link={info.link} />
            ))}
        </div>
    );
}