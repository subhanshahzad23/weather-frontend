import React from "react";

export default function Footer() {
    return (
        <footer className="bg-muted py-12 w-full flex justify-center schemed mt-4 md:pl-16 md:pr-16 xl:pl-40 xl:pr-40 2xl:pl-60 2xl:pr-60">
            <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
                <div className="flex flex-col items-start gap-4">
                    <a href="#" className="flex items-center gap-2">
                        <span className="font-bold text-lg">WeatherMap</span>
                    </a>
                    <p className="text-muted-foreground">Providing high-quality services since XXXX.</p>
                </div>
                <div className="grid gap-2">
                    <h3 className="font-bold">Pages</h3>
                    <a href="/" className="hover:underline">
                        Home
                    </a>
                    <a href="/city-search/0/0" className="hover:underline">
                        City Search
                    </a>
                    <a href="/blogs" className="hover:underline">
                        Blogs
                    </a>
                    <a href="news" className="hover:underline">
                        News
                    </a>
                    <a href="profile" className="hover:underline">
                        Profile
                    </a>
                </div>
                <div className="grid gap-2">
                    <h3 className="font-bold">Contact</h3>
                    <div className="flex items-center gap-2">
                        <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                        <a href="#" className="hover:underline">
                            +XX XXXXX XXXXX
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <MailIcon className="w-5 h-5 text-muted-foreground" />
                        <a href="#" className="hover:underline">
                            info@weather.com
                        </a>
                    </div>
                    <div className="flex items-start gap-2">
                        <MapPinIcon className="w-5 h-5 text-muted-foreground" />
                        <address className="not-italic">123 Main St, Anytown SomeCountry 12345</address>
                    </div>
                </div>
                <div className="grid gap-2">
                    <h3 className="font-bold">Support</h3>
                    <a href="#" className="hover:underline">
                        FAQ
                    </a>
                    
                    <a href="#" className="hover:underline">
                        Support
                    </a>
                </div>
                <div className="grid gap-2">
                    <h3 className="font-bold">Legal</h3>
                    <a href="#" className="hover:underline">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:underline">
                        Terms of Service
                    </a>
                    <a href="#" className="hover:underline">
                        Cookie Policy
                    </a>
                </div>
            </div>
        </footer>
    );
}

function MailIcon(props:any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

function MapPinIcon(props:any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function MountainIcon(props:any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}

function PhoneIcon(props:any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}

function XIcon(props:any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}
