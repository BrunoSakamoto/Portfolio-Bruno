export default function Footer() {
    return (
        <footer className="mt-24 border-t border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-10 text-xs text-white/60">
                © {new Date().getFullYear()} Bruno Araújo Sakamoto. Feito com React + Tailwind.
            </div>
        </footer>
    )
}