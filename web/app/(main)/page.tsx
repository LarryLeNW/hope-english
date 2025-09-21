"use client"

import { useState, useEffect } from "react"
import {
    Search,
    ShoppingCart,
    Star,
    Heart,
    BookOpen,
    Users,
    Award,
    Sparkles,
    Quote,
    ArrowRight,
    ArrowUp,
    Grid,
    List,
    X,
    Plus,
    Minus,
    Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const featuredBooks = [
    {
        id: 1,
        title: "ITALIAN NIGHT",
        author: "Teacher TJ",
        rating: 4.8,
        reviews: 1247,
        time: "09/09/2025 18:00",
        image: "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/545408913_1758927838835401_4308965763236215539_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=AC5p_SSXPMQQ7kNvwGZFGIe&_nc_oc=AdnRVltGafW3pvVUx7dFvdfykrMXnVkrbVSRWVHf2R0M49gkiXQGtw63jZ2DCSo7EupyBkiVCQOl62i_f7gl8UsR&_nc_zt=23&_nc_ht=scontent.fdad3-6.fna&_nc_gid=GQkQ6ClhvuETvbvzm7qHaA&oh=00_AfYs2PZSRGVKFuCCAQ-wlxiyMcd-xpjul2CCnwuzP0WMgA&oe=68CFB300",
        category: "Event",
        description: "Please join us for a night of fellowship, food and family...",
        color: "from-purple-600 to-blue-600",
        accent: "purple",
    },
    {
        id: 2,
        title: "Lesson #3 Abandonment, Hurt and Recovery",
        author: "Teacher TJ",
        rating: 4.9,
        reviews: 2156,
        image: "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/530221162_1736087851119400_5647083391161124424_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=GYB6tbyRwysQ7kNvwGsbF6i&_nc_oc=AdlXKlopZA7GlZbj0RWGZAeHgyumdc_ro0OvY6FWQIu2wD23nKlFhdyIvkRb87DtKNdBqj4oXrJKQjEpvk3SIwdw&_nc_zt=23&_nc_ht=scontent.fdad3-6.fna&_nc_gid=nxL0NCpRzWrqNLaYmJWNtQ&oh=00_AfaEbmLD0zAFx554OjiTsPughcbDqTjQ_gw15BENeHHl0Q&oe=68CFCD5F",
        category: "News",
        time: "13/08/2025 13:25",
        description:
            "This comprehensive English language course is designed to help learners improve their skills in speaking, writing, reading, and listening. Whether you are a beginner or an advanced learner, the course provides tailored lessons to meet your needs and goals.",
        color: "from-purple-600 to-blue-600",
        accent: "purple",
    },
    {
        id: 3,
        title: "Lesson #4 Abandonment, Hurt and Recovery",
        author: "Teacher TJ",
        time: "13/08/2025 19:30",
        rating: 4.7,
        reviews: 3421,
        image: "https://tse1.mm.bing.net/th/id/OIP.f7MS0EtRThJCIDrl5qWXmAHaF0?rs=1&pid=ImgDetMain&o=7&rm=3",
        category: "News",
        description: "Do you know someone who has been hurt or abandoned? Maybe you have been betrayed, join us and bring somebody who needs help through life!",
        color: "from-purple-600 to-blue-600",
        accent: "purple",
    },
    {
        id: 4,
        title: "Lesson #3 History and Important Events.",
        author: "Teacher TJ",
        time: "06/08/2025 19:30",
        rating: 4.8,
        reviews: 1876,
        image: "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/527375658_1729006885160830_4312143062755175264_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=qa1lJzuBy6UQ7kNvwFYZK9s&_nc_oc=Adl0AOKzU15Ut9asSoEjYPbSPVdpjgFMkusH3EJtfqbQrMhz5-GI7uDVIFDNvp1nOv-1fJX-ZB2P83io_RIfWRTu&_nc_zt=23&_nc_ht=scontent.fdad3-6.fna&_nc_gid=PmO3379ebZTUVygZMtxg6A&oh=00_Afbdp3dfeBf6PzvyFLtkNjRjcSsbEFy1yavppzghidxMnw&oe=68CFBC79",
        category: "News",
        description:
            "A thrilling book that offers a look at our changing world through the eyes of an unforgettable narrator.",
        color: "from-purple-600 to-blue-600",
        accent: "purple",
    },
    {
        id: 5,
        title: "Let’s Meet Up! - Social Event",
        author: "Kazuo Ishiguro",
        rating: 4.6,
        reviews: 987,
        time: "24/07/2025 08:00",
        image: "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/521481973_1718901252838060_8436415386296698537_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=OqMkIXiqlnAQ7kNvwE87hzl&_nc_oc=AdlB79ptTnvXNp5tiJEUez4kNh85zwSQjwBmrdL129fRCp8fBx9r4-WkQ-2QfUlOawfL8Xi6l7lEM-G-RGU9AHP8&_nc_zt=23&_nc_ht=scontent.fdad3-6.fna&_nc_gid=y9ThA8fwHV2OvP8PEK7F6A&oh=00_Afb6E7BlkYyMH1kCNXqssRzgbNPekFLK0RrjHwNkF6ffmg&oe=68CFBE2E",
        category: "Event",
        description:
            "Coffee Talk Saturday morning 8:00 am",
        color: "from-purple-600 to-blue-600",
        accent: "purple",
    },
    {
        id: 6,
        title: "Lesson #1 Social Media and its effect on YOU!",
        author: "Teacher TJ",
        rating: 4.5,
        time: "23/07/2025 19:30",
        reviews: 1543,
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTrPDOUbu4O37c_dr1u-A3b_qYQDZDS2NNMJwCGps5N0XAjvSylhXG7IRP4cle2p_cFo67VBYxEX6GDw49u8-aGSxRAhlbIZge1CtEBc7qHo3bTu31Y9SiOPKbKM-0rLd04YpuUjvYZv2499MBxo2Vi2pOw0HKVxr8YWgdrVVlemwaGlPeUsOzVTJ0ew/w1200-h630-p-k-no-nu/DALL%C2%B7E%202023-01-23%2011.21.28%20-%20The%20effects%20of%20social%20media.png",
        category: "Event",
        description: "A life no one will remember. A story you will never forget.",
        color: "from-purple-600 to-blue-600",
        accent: "purple",
    },
]

const categories = [
    { name: "Literary Fiction", icon: "📚", color: "bg-gradient-to-r from-indigo-500 to-purple-600" },
    { name: "Science Fiction", icon: "🚀", color: "bg-gradient-to-r from-indigo-500 to-purple-600" },
    { name: "Fantasy", icon: "🧙‍♂️", color: "bg-gradient-to-r from-indigo-500 to-purple-600" },
    { name: "Romance", icon: "💕", color: "bg-gradient-to-r from-indigo-500 to-purple-600" },
    { name: "Mystery", icon: "🔍", color: "bg-gradient-to-r from-indigo-500 to-purple-600" },
    { name: "Biography", icon: "👤", color: "bg-gradient-to-r from-indigo-500 to-purple-600" },
    { name: "Philosophy", icon: "🤔", color: "bg-gradient-to-r from-indigo-500 to-purple-600" },
    { name: "History", icon: "🏛️", color: "bg-gradient-to-r from-indigo-500 to-purple-600" },
]

const testimonials = [
    {
        name: "TEACHER TJ",
        role: "Art Director",
        content: '"Love your enemies and pray for those who persecute you." (Matthew 5:44)"',
        avatar: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    },
    {
        name: "Don Francis",
        role: "Tech Lead",
        content: '"I am the way, the truth, and the life. No one comes to the Father except through me." (John 14:6)',
        avatar: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    },
    {
        name: "Alexa Young",
        role: "Product Manager",
        content: '"Blessed are the poor in spirit, for theirs is the kingdom of heaven." (Matthew 5:3)"',
        avatar: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    },
]

export default function UniqueBookstore() {

    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState("grid")
    const [scrollY, setScrollY] = useState(0)
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
            setShowScrollTop(window.scrollY > 300)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <div className="w-full">
            <section className="relative py-20 md:py-26 overflow-hidden w-full">
                <div
                    className="absolute inset-0 bg-gradient-to-r "
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                ></div>

                <div className="container mx-auto text-center relative z-10">
                    <div className="mb-8">
                        <Sparkles className="h-16 w-16 text-yellow-400 mx-auto mb-4 animate-spin-slow" />
                    </div>

                    <h2 className="text-4xl md:text-8xl font-bold mb-4 md:mb-6 leading-tight ">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Hope
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                            ENGLISH CLUB
                        </span>
                    </h2>

                    <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed px-2">
                        Hope English Club offers free English lessons, ranging from beginner to advanced levels, taught by volunteer native English speakers from the US. It’s not only a place to learn English but also to adopt positive life principles and meet new friends. Everyone is welcome to join!
                    </p>

                    <div className=" max-w-2xl mx-auto relative mb-12">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-30 "></div>
                        <div className="relative bg-white/10 backdrop-blur-xl rounded-full p-2 border border-white/20 ">
                            <div className="flex items-center">
                                <Search className="md:ml-4 h-6 w-6 text-purple-300" />
                                <input
                                    type="text"
                                    placeholder="Search for magical stories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="outline-none shadow-none border-none flex-1 bg-transparent border-0 text-white placeholder:text-purple-300 text-lg px-4 focus:ring-0"
                                />
                                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full px-8">
                                    Explore
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>


                    <div className="relative">
                        <Quote className="h-8 w-8 text-purple-400 mx-auto mb-4 opacity-60" />
                        <p className="text-purple-300 italic text-lg max-w-2xl mx-auto">
                            "Love your enemies and pray for those who persecute you" - Jesus Christ
                        </p>
                    </div>
                </div>
            </section>

            <section className="md:py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: BookOpen, number: "50K+", label: "Books", color: "from-purple-500 to-blue-500" },
                            { icon: Users, number: "100K+", label: "Members", color: "from-pink-500 to-rose-500" },
                            { icon: Award, number: "50+", label: "Nations", color: "from-yellow-500 to-orange-500" },
                            { icon: Sparkles, number: "24/7", label: "Support", color: "from-green-500 to-teal-500" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative mb-4 mx-auto w-20 h-20">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity`}
                                    ></div>
                                    <div className="relative bg-white/10 backdrop-blur-xl rounded-full w-20 h-20 flex items-center justify-center border border-white/20">
                                        <stat.icon className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
                                <p className="text-purple-300">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories with Unique Cards */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h3 className="text-4xl font-bold text-center mb-16">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            OUR LESSION
                        </span>
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <div
                                key={category.name}
                                className="group cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-2xl">
                                    <div className={`${category.color} p-8 text-center transition-transform group-hover:scale-105`}>
                                        <div className="text-4xl mb-4">{category.icon}</div>
                                        <h4 className="text-white font-semibold text-lg">{category.name}</h4>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Books with Artistic Cards */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-16">
                        <h3 className="text-4xl font-bold">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Our Journeys
                            </span>
                        </h3>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant={viewMode === "grid" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("grid")}
                                className="bg-white/10 border-white/20 hover:bg-white/20"
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("list")}
                                className="bg-white/10 border-white/20 hover:bg-white/20"
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredBooks.map((book, index) => (
                            <div key={book.id} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-500 group-hover:scale-105">
                                    {/* Gradient Background */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${book.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                                    ></div>

                                    <div className="relative p-6">
                                        {/* Book Image */}
                                        <div className="relative mb-6 overflow-hidden rounded-2xl">
                                            <img
                                                src={book.image || "/placeholder.svg"}
                                                alt={book.title}
                                                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                            <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${book.color} border-0 text-white`}>
                                                {book.time}
                                            </Badge>
                                        </div>

                                        {/* Book Info */}
                                        <div className="space-y-4">
                                            <Badge variant="outline" className={`border-${book.accent}-400 text-${book.accent}-400`}>
                                                {book.category}
                                            </Badge>

                                            <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                                                {book.title}
                                            </h4>

                                            <p className="text-purple-300 text-sm">by {book.author}</p>

                                            <p className="text-purple-200 text-sm leading-relaxed line-clamp-1">{book.description}</p>

                                            {/* Rating */}
                                            <div className="flex items-center space-x-2">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < Math.floor(book.rating) ? "text-yellow-400 fill-current" : "text-gray-500"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-purple-300">
                                                    {book.rating} ({book.reviews})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h3 className="text-4xl font-bold text-center mb-16">
                        <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                            Our Team
                        </span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="relative group">
                                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                                    <Quote className="h-8 w-8 text-purple-400 mb-4 opacity-60" />
                                    <p className="text-purple-200 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={testimonial.avatar || "/placeholder.svg"}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full border-2 border-purple-400"
                                        />
                                        <div>
                                            <h5 className="text-white font-semibold">{testimonial.name}</h5>
                                            <p className="text-purple-300 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-600 transform hover:scale-110 animate-bounce"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-6 w-6" />
                </button>
            )}
        </div>
    )
}
