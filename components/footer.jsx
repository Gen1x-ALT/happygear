import Link from 'next/link';

export function Footer() {
    return (
        <footer className="pt-16 pb-12 sm:pt-24 sm:pb-16">
            <p className="text-m text-center">
                Hecho con ❤️ por <a href="https://gen1x.nekoweb.org/" target="_blank" className="text-red-600">
                    Gen1x
                </a>
            </p>
        </footer>
    );
}
