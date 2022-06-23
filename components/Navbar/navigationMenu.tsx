import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";

interface NavigationMenuProps {
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
};
const NavigationMenu: React.FC<NavigationMenuProps> = ({
    state,
    setState
}) => {
    const refDiv = React.useRef<HTMLDivElement>(null);
    const router = useRouter();
    const isActive = (url: string) => {
        if(url === '/'+router.query.category){
            return true;
        };
        return false;
    };
    return(
        <Dialog
            initialFocus={refDiv}
            open={state}
            onClose={() => setState(s => !s)}
            className='fixed inset-0 z-20'
        >
            <div className="flex flex-col w-full h-full bg-white">
                <div className="flex items-center justify-between p-4 h-16 bg-blue-900 text-white">
                    <figure>
                        <Link href='/' passHref>
                            <a>
                                <p className="font-bold">Savinterior</p>
                            </a>
                        </Link>
                    </figure>
                    <AiOutlineMenuUnfold fontSize={22} className="cursor-pointer" onClick={() => setState(s => !s)}/>
                </div>
                <nav>
                    <ul className="flex flex-col p-4">
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
                                    className={`${isActive(location.url) && 'bg-blue-900 text-white'} font-semibold tracking-wide rounded-full text-sm w-full flex items-center p-4`}
                                >
                                    <Link href={location.url} passHref>
                                        <a>{location.display}</a>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>            
        </Dialog>
    );
};
export default NavigationMenu;