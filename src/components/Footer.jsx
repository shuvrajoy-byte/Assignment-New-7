import logoXl from '../assets/logo-xl.png';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import twitter from '../assets/twitter.png';

export default function Footer() {
  return (
    <footer className="bg-[#244D3F] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 text-center">
        <img src={logoXl} alt="KeenKeeper" className="h-12 md:h-14 mx-auto mb-6 object-contain" />
        
        <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <p className="text-gray-300 text-sm mb-4 font-medium">Social Links</p>
        
        <div className="flex items-center justify-center gap-6 mb-12">
          <a href="#" className="w-16 h-16 bg-white rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-none border-none outline-none">
              <img src={instagram} alt="Instagram" className="w-10 h-10 object-contain" />
          </a>

          <a href="#" className="w-16 h-16 bg-white rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-none border-none outline-none">
              <img src={facebook} alt="Facebook" className="w-10 h-10 object-contain" />
          </a>

          <a href="#" className="w-16 h-16 bg-white rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-none border-none outline-none">
              <img src={twitter} alt="Twitter" className="w-10 h-10 object-contain" />
          </a>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-gray-400">
          <span>© 2026 KeenKeeper. All rights reserved.</span>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}