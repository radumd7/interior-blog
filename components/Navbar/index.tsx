import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineMenuFold } from 'react-icons/ai';
import NavigationMenu from "./navigationMenu";

export default function Navbar() {
    const [ menu, setMenu ] = React.useState<boolean>(false);
    const router = useRouter();
    const isActive = (url: string) => {
        if(url === '/'+router.query.category){
            return true;
        };
        return false;
    };
    React.useEffect(() => {
        const closeMenu = () => {
            setMenu(false);
        };
        router.events.on('routeChangeStart', closeMenu);
        return () => {
            router.events.off('routeChangeStart', closeMenu);
        };
    }, [router.events])
    return(
        <header className="bg-blue-900 h-16 text-white flex items-center justify-between lg:justify-start space-x-4 w-full shadow-md fixed top-0 left-0 z-10">
            <figure className="p-4 h-full flex items-center">
                <Link href='/' passHref>
                    <a>
                        <p className="font-bold">Savinterior</p>
                    </a>
                </Link>
            </figure>
            <nav className="h-full flex items-center">
                <ul className="hidden lg:flex items-center h-full">
                    {
                        [
                            {url: '/living-room', display: 'Living Room'},
                            {url: '/kitchen', display: 'Kitchen'},
                            {url: '/dining-room', display: 'Dining Room'},
                            {url: '/bedroom', display: 'Bedroom'},
                            {url: '/bathroom', display: 'Bathroom'},
                        ].map((location) => (
                            <li
                                key={location.display}
                                className={`${isActive(location.url) && 'border-b-2 border-white'} text-sm h-full flex items-center px-4 hover:border-b-2 hover:border-white ease-linear duration-50`}
                            >
                                <Link href={location.url} passHref>
                                    <a>{location.display}</a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <AiOutlineMenuFold fontSize={22} className="lg:hidden mr-4 cursor-pointer" onClick={() => setMenu(s => !s)}/>
            </nav>
            {menu && <NavigationMenu state={menu} setState={setMenu}/>}
        </header>
    );
};