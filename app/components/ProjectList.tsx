import Project from "./Project";

const projects = [
    {
        title: "Kairos Task Manager",
        link: "https://todo.kairosllc.org",
    },
    {
        title: "Anna High School SkillsUSA",
        link: "https://annaskillsusa.kairosllc.org",
    },
    {
        title: "Anna High School Student Council Newsletter",
        link: "https://ahsstuconewsletter.kairosllc.org",
    },
];

export default function ProjectList() {
    return (
        <div className="projectlist">
            {projects.map((project) => (
                <Project key={project.link} title={project.title} link={project.link} />
            ))}
        </div>
    );
}