// Homepage Backup - Cem Karabulut Website
// Bu dosya anasayfadaki özel içerikleri backup olarak saklar

export const navigation = [
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export const featuredBrands = [
  "Microsoft", "Coca-Cola", "Nestlé", "Ford Otosan", "Nescafé", "Lipton", "Cif", "Avon", "Beko", "Dimes", "Obsesso", "Akbank", "Enerjisa", "Kayalar Kimya", "Düfa", "Metro İstanbul", "İBB", "İGDAŞ", "Türk Nippon Sigorta", "Baymak", "Electrolux", "Vialand", "Greenlog"
];

export const descriptionText = "Creative Art Director with over 15 years of experience in visual communication and digital media design. Specialized in brand identity development, campaign design, and multimedia storytelling. Passionate about creating compelling visual narratives that connect brands with their audiences through innovative design solutions and strategic creative direction.";

export const homepageContent = {
  navigation,
  featuredBrands,
  descriptionText,
  buttons: {
    primary: {
      text: "Learn more about Cem →",
      href: "/about",
      className: "px-8 py-3 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-700 text-zinc-100 font-semibold hover:from-zinc-700 hover:to-zinc-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
    },
    secondary: {
      text: "View Portfolio →",
      href: "https://www.behance.net/cemkarabulut",
      target: "_blank",
      className: "px-8 py-3 rounded-lg border-2 border-zinc-600 text-zinc-300 font-semibold hover:border-zinc-400 hover:text-zinc-100 transition-all duration-300 transform hover:scale-105"
    }
  }
};

// Backup tarihi: 2025-01-27
// Bu dosya anasayfadaki özel içerikleri korumak için oluşturuldu 