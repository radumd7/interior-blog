import Link from "next/link";

export default function Navbar() {
    return(
        <header className="bg-blue-900 h-16 text-white p-4 flex items-center space-x-4 w-full shadow-md fixed top-0 left-0 z-10">
            <figure>
                <Link href='/' passHref>
                    <a>
                        <p className="font-bold">Logo.</p>
                    </a>
                </Link>
            </figure>
            <nav>
                <ul className="flex space-x-2">
                    {
                        [
                            {url: '/living-room', display: 'Living Room'},
                            {url: '/kitchen', display: 'Kitchen'},
                            {url: '/dining-room', display: 'Dining Room'},
                            {url: '/bedroom', display: 'Bedroom'},
                            {url: '/bathroom', display: 'Bathroom'},
                        ].map((location) => (
                            <li key={location.display}>
                                <Link href={location.url} passHref>
                                    <a>{location.display}</a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    );
};