export default function Footer() {
  return (
    <footer className="bg-[#3C1F42] text-center text-sm text-gray-400 p-6 mt-10">
  <div className="mb-2 space-x-4">
    <a href="/about" className="hover:text-white">Tentang</a>
    <span>|</span>
    <a href="/contact" className="hover:text-white">Kontak</a>
    <span>|</span>
    <a href="/privacy" className="hover:text-white">Kebijakan Privasi</a>
  </div>
  <p className="mt-2">&copy; {new Date().getFullYear()} GameTopUp. All rights reserved.</p>
</footer>

  );
}
