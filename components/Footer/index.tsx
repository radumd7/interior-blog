import { FacebookIcon, InstagramIcon, PinterestIcon } from "../Icons";

export default function Footer() {
    return(
        <footer
            className="flex flex-col space-y-4 bg-blue-900 items-center text-white p-4"
        >
            <p>Follow us on Social Media</p>
            <ul className="flex items-center justify-center space-x-10">
                <li><FacebookIcon/></li>
                <li><InstagramIcon/></li>
                <li><PinterestIcon/></li>
            </ul>
            <p className="text-sm">©2022 The Savinterior. All Rights Reserved.</p>
        </footer>
    );
};