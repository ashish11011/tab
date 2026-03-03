import { Footer } from "@/components/Footer";
import { Header, Navbar, Ribbon } from "@/components/nacbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Ribbon />
            <Header />
            <Navbar />
            {children}
            <Footer />

        </div>
    );
}