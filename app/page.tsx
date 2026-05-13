export default function Home() {
    const services = [
        { 
            title: "Custom Websites", 
            description: "Beautiful, responsive websites built with modern technology tailored to your business needs.",
        },
        { 
            title: "Web Applications", 
            description: "Full-featured web apps that scale with your business, from concept to deployment.",
        },
        { 
            title: "E-Commerce Solutions", 
            description: "Complete online stores with payment processing and inventory management.",
        },
        { 
            title: "Maintenance & Support", 
            description: "Ongoing technical support, updates, and optimization for your web presence.",
        },
    ];

    const whyUs = [
        {
            title: "Expertise",
            description: "Experienced web developers with proven track records across all modern web technologies."
        },
        {
            title: "Quality",
            description: "Unwavering commitment to excellence in every line of code and design decision."
        },
        {
            title: "Full Service",
            description: "End-to-end solutions from concept, design, development through deployment and support."
        },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="hero" id="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Build Your Future <br />
                        <span className="highlight">With Confidence</span>
                    </h1>
                    <p className="hero-subtitle">
                        Professional web development services. Beautiful, responsive websites and applications built with modern technology.
                    </p>
                    <div className="hero-cta">
                        <a href="#contact" className="btn btn-primary">Start Your Project</a>
                        <a href="#services" className="btn btn-secondary">See Our Services</a>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="services" id="services">
                <div className="services-header">
                    <h2 className="section-title">What We Do</h2>
                </div>
                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.title} className="service-card">
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why CLKairos Section */}
            <section className="why-section" id="about">
                <div className="why-header">
                    <h2 className="section-title">Why CLKairos</h2>
                </div>
                <div className="why-grid">
                    {whyUs.map((item) => (
                        <div key={item.title} className="why-card">
                            <h3 className="why-title">{item.title}</h3>
                            <p className="why-description">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section" id="contact">
                <div className="cta-content">
                    <h2 className="cta-title">Let's Build Something Great</h2>
                    <p className="cta-subtitle">Transform your ideas into powerful web solutions.</p>
                    <div className="cta-buttons">
                        <a href="https://github.com/CLKairos" className="btn btn-primary">Get In Touch</a>
                    </div>
                </div>
            </section>
        </div>
    );
}