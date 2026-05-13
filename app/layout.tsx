import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getSession } from "./session";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();

  return (
    <html lang="en">
      <body>
        <Navbar user={user ? { id: user.id, username: user.username, type: user.type } : null} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
