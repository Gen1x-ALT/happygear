import Image from 'next/image';
import Link from 'next/link';
import happygear from 'public/happygear.png';

const navItems = [
    { linkText: 'Quiénes somos', href: '/' },
    { linkText: '¿Qué falta?', href: '/quefalta' },
];

export function Header() {
    return (
        <nav className="flex flex-wrap items-center gap-4 pt-6 pb-12 sm:pt-12 md:pb-24">
            <Link href="/">
                <Image src={happygear} alt="Happygear" width="70"/>
            </Link>
            {!!navItems?.length && (
            <ul className="flex gap-x-4 list-none overflow-x-auto whitespace-nowrap">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                className="inline-block px-1.5 py-1 transition hover:opacity-80 sm:px-3 sm:py-2"
                            >
                                {item.linkText}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex-grow justify-end hidden lg:flex lg:mr-1">
            </div>
        </nav>
    );
}
