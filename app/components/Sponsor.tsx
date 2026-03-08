interface SponsorProps {
    link: string;
    image: string;
    name: string;
}

export default function Sponsor({ link, image, name }: SponsorProps) {
    return (
        <div className="partner">
            <a href={link}>
                <img src={image} alt={name} />
            </a>
        </div>
    );
}