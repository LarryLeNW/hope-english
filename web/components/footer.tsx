import { BookOpen } from "lucide-react";

function Footer() {
    return <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-16 mt-auto">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50"></div>
                            <BookOpen className="relative h-8 w-8 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Hope English
                        </h4>
                    </div>
                    <p className="text-purple-300 leading-relaxed">
                        Where every story becomes a magical journey and every reader finds their perfect adventure.
                    </p>
                </div>

                {[
                    {
                        title: "Events",
                        links: ["Every days", "Holly days", "Happy days"],
                    },
                    {
                        title: "Support",
                        links: ["Help Center", "Contact Us"],
                    },
                    {
                        title: "Connect",
                        links: ["Facebook", "Instagram", "Tiktok",],
                    },
                ].map((section, index) => (
                    <div key={index} className="space-y-4">
                        <h5 className="text-white font-semibold text-lg">{section.title}</h5>
                        <ul className="space-y-2">
                            {section.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                    <a href="#" className="text-purple-300 hover:text-white transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 text-center">
                <p className="text-purple-300">© 2023 Hope English Club CFM</p>
            </div>
        </div>
    </footer>
}

export default Footer;