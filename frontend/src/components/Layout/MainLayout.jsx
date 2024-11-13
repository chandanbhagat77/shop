import Footer from "../Features/Navbar/Footer";
import Navbar from "../Features/Navbar/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="py-8 lg:py-10"></div>
      <div className="min-h-screen lg:my-10">{children}</div>
      <div className=""></div>
      <Footer />
    </>
  );
}
