import Card from "./components/Card";
import Project from "./components/Project";

export default function Home() {
  return (
    <div className={"homepage"}>
        <h1 className={"title"}>FAQ</h1>
        <div className={"card-grid"}>
            <Card title={"Who are we?"} info={"We are a for-profit group ran by Christian Larsen IV, we help people or businesses who want web or software development. We understand time is money so we want to help you minimize the amount of time it takes to get your ideas production ready and maximize the amount of money made from that idea."} />
            <Card title={"What do we do?"} info={"We provide website or software development servies, meaning that if you want a website made or a program developed we are the people you should call upon to get it done reliably and quickly."} />
            <Card title={"Why should I trust you?"} info={"We are partnered with a few companies who can confirm that we only provide better quality (and better pricing) than most big companies providing the same services, additionally we have plenty of sponsors who can confirm the same thing. If you are interested in our partners or sponsors or past projects please check out their respective pages."} />
            <Card title={"How can I get in touch with you"} info={"If you go to our contact page you will find all the information you need to start a partnership or just request a contact for a project."} />
            <Card title={"How can I sponsor you?"} info={"If you go to our sponsors page and scroll to the very bottom you will find a form you can fill out to request to become a sponsor."} />
            <Card title={"Where can I find more info?"} info={"If you go to our about page you will see all the information about us and what we do in greater detail."} />
        </div>
        <hr />
        <h1 className={"title"}>Featured Projects</h1>
        <div className={"card-grid"}>
            <a href={"https://todo.kairosllc.org"}><button className={"card-button"}>Kairos Task Manager</button></a>
            <a href={"https://annaskillsusa.kairosllc.org"}><button className={"card-button"}>Anna High School SkillsUSA</button></a>
            <a href={"https://ahsstuconewsletter.kairosllc.org"}><button className={"card-button"}>Anna High School Student Council Newsletter</button></a>
        </div>
    </div>
  );
}
