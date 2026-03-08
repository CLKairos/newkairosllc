const pages = [
    { name: "Home", location: "/" },
    { name: "About", location: "/about" },
    { name: "Projects", location: "/projects" },
    { name: "Sponsors", location: "/sponsors" },
    { name: "Partnerships", location: "/partnerships" },
    { name: "Contact", location: "/contact" },
];

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-inner">
                <div className="navbar-brand">
                    <h1>KairosLLC</h1>
                </div>
                <div className="navbar-buttons">
                    {pages.map((page) => (
                        <a key={page.name} href={page.location}>
                            <button>{page.name}</button>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}