
const pages = [
    {name: "Home", locaiton: "/",},
    {name: "About", locaiton: "/about",},
    {name: "Projects", locaiton: "/projects",},
    {name: "Sponsors", locaiton: "/sponsors",},
    {name: "Partnerships", locaiton: "/partnerships",},
    {name: "Contact", locaiton: "/contact",},
]

export default function Navbar() {
    return(
        <div className={"navbar"}>
            <div className={"navbar-inner"}>
                <div className={"navbar-brand"}>
                    <h1>KairosLLC</h1>
                </div>
                <div className={"navbar-buttons"}>
                    {
                        pages.map((page) => (
                            // eslint-disable-next-line react/jsx-key
                            <a href={page.locaiton}><button>{page.name}</button></a>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}