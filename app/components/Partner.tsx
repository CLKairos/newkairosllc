interface PartnerProps {
    link: string;
    image: string;
    name: string;
}

export default function Partner({ link, image, name }: PartnerProps) {
    return (
        <div className="partner">
            <a href={link}>
                <img src={image} alt={name} />
            </a>
        </div>
    );
}