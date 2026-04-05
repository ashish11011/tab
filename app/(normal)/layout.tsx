import { Footer } from "@/components/Footer";
import { Header, Ribbon } from "@/components/nacbar";
import { Navbar } from "@/components/Navbar";

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