import Card from "../components/Card";

export default function Contact() {
    return (
        <div className="body">
            <h1 className="title">Contact Us!</h1>
            <div className="contact-grid">
                <Card title="Business Email" info="christianlarsen@kairosllc.org" />
                <Card title="Personal Email" info="christi9nl9rsen@gmail.com" />
                <Card title="Phone Number" info="TEXT ONLY! +1 (469)-742-3710" />
            </div>
        </div>
    );
}