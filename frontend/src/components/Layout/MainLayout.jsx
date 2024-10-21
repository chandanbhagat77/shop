import Footer from "../Features/Navbar/Footer";
import Navbar from "../Features/Navbar/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="py-10"></div>
      <div className="min-h-screen">{children}</div>
      <div className="pb-48"></div>
      <Footer />
    </>
  );
}
