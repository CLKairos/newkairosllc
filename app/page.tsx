export default function Home() {
    const services = [
        { 
            title: "Custom Websites", 
            description: "Professional websites built to represent your brand with clean design and modern technology.",
        },
        { 
            title: "Web Applications", 
            description: "Scalable web apps designed to grow with your business and deliver results.",
        },
        { 
            title: "E-Commerce Solutions", 
            description: "Complete online stores with secure payments, inventory management, and customer tools.",
        },
        { 
            title: "Maintenance & Support", 
            description: "Ongoing support, security updates, and optimization to keep your site running smoothly.",
        },
    ];

    const whyUs = [
        {
            title: "Expertise",
            description: "CLKairos specializes in web development with years of proven experience delivering quality projects."
        },
        {
            title: "Quality",
            description: "We build with excellence in every detail—from pixel-perfect design to reliable, efficient code."
        },
        {
            title: "Full Service",
            description: "From initial concept through design, development, launch, and ongoing support—we handle it all."
        },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="hero" id="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Web Development <br />
                        <span className="highlight">Built Right</span>
                    </h1>
                    <p className="hero-subtitle">
                        CLKairos specializes in professional web development. Beautiful, responsive websites and applications built to last.
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
                    <h2 className="section-title">What We Build</h2>
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
                    <h2 className="section-title">Why Choose CLKairos</h2>
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
                    <h2 className="cta-title">Ready to Get Started?</h2>
                    <p className="cta-subtitle">Let's build your next web project together.</p>
                    <div className="cta-buttons">
                        <a href="https://github.com/CLKairos" className="btn btn-primary">Contact Us</a>
                    </div>
                </div>
            </section>
        </div>
    );
}