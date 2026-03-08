export default function Forbidden() {
    return (
        <div className="forbidden-wrapper">
            <div className="forbidden-card">
                <span className="forbidden-code">403</span>
                <h1 className="forbidden-title">Access Denied</h1>
                <p className="forbidden-body">
                    Your IP address is not authorized to view this page.
                </p>
                <a href="/" className="forbidden-link">Go home</a>
            </div>
        </div>
    );
}