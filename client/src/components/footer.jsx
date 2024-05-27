import { UserCogIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="mt-4 border-t">
            <div className="p-4 w-full max-w-6xl mx-auto">
                <Link to={'/support'} className="w-fit flex items-center gap-1">
                    <UserCogIcon size={19} /> Support
                </Link>
            </div>
        </footer>
    );
}

export default Footer;