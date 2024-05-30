import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Footer() {
    return (
        <div className="w-full mt-6 border-t">
            <footer className="mx-auto py-5 px-4 w-full max-w-6xl flex justify-between">
                <div>
                    <img src='/assets/logo.svg' alt="TripTrove" />
                    <p className="w-96 text-sm mt-2">
                        Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className="flex items-center justify-center gap-5 mt-7">
                        <FaFacebook color="#1877F2" size={22} />
                        <FaTwitter color="#1DA1F2" size={22} />
                        <FaInstagram color="#EC3397" size={22} />
                        <FaLinkedin color="#0A66C2" size={22} />
                    </div>
                    <p className="mt-7 text-xs font-thin">© 2024 . All rights reserved.</p>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">Take a tour</h2>
                    <Link className="font-thin">
                        Features
                    </Link>
                    <Link className="font-thin">
                        Partners
                    </Link>
                    <Link className="font-thin">
                        Pricing
                    </Link>
                    <Link className="font-thin">
                        Product
                    </Link>
                    <Link to={'/support'} className="font-thin">
                        Support
                    </Link>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">Our company</h2>
                    <Link className="font-thin">
                        About Us
                    </Link>
                    <Link className="font-thin">
                        Agents
                    </Link>
                    <Link className="font-thin">
                        Blog
                    </Link>
                    <Link className="font-thin">
                        Media
                    </Link>
                    <Link className="font-thin">
                        Contact Us
                    </Link>
                </div>
                <div className="h-fit">
                    <h2 className="text-lg font-semibold">Subscribe</h2>
                    <p className="text-xs mt-1">Subscribe to get latest property,<br /> blog news from us</p>
                    <div className="mt-4 relative h-fit">
                        <input className="w-60 border py-2.5 px-2 rounded" placeholder="Email" />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-white bg-primary p-2">
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;