# Cem Karabulut - Creative Art Director Portfolio

Modern, performans odaklı ve SEO optimize edilmiş kişisel portföy sitesi.

## 🚀 Performans Özellikleri

- **Core Web Vitals Optimizasyonu**: LCP, FID ve CLS metrikleri optimize edildi
- **Lazy Loading**: Kritik olmayan bileşenler lazy load ediliyor
- **Bundle Splitting**: Kod bölümleme ile daha hızlı yükleme
- **Image Optimization**: Next.js image optimizasyonu
- **Font Optimization**: Font display swap ve preloading
- **Caching**: Statik kaynaklar için agresif caching
- **Compression**: Gzip sıkıştırma aktif

## 📊 SEO Özellikleri

- **Structured Data**: Schema.org markup'ları
- **Meta Tags**: Kapsamlı meta tag optimizasyonu
- **Sitemap**: Otomatik sitemap.xml
- **Robots.txt**: SEO dostu robots.txt
- **Open Graph**: Sosyal medya paylaşım optimizasyonu
- **Twitter Cards**: Twitter paylaşım optimizasyonu

## 🛠️ Teknolojiler

- **Next.js 13**: App Router ile modern React framework
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animasyonlar
- **Contentlayer**: MDX içerik yönetimi
- **FontAwesome**: İkonlar

## 📈 Performans Metrikleri

```bash
# Bundle analizi
npm run analyze

# Lighthouse performans testi
npm run lighthouse

# Kapsamlı performans testi
npm run performance
```

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
pnpm install

# Geliştirme sunucusunu başlat
pnpm dev

# Production build
pnpm build

# Production sunucusunu başlat
pnpm start
```

## 📁 Proje Yapısı

```
cem_karabulut_web/
├── app/                    # Next.js App Router
│   ├── components/         # React bileşenleri
│   ├── about/             # Hakkında sayfası
│   ├── experience/        # Deneyim sayfası
│   ├── skills/           # Yetenekler sayfası
│   ├── projects/         # Projeler sayfası
│   └── contact/          # İletişim sayfası
├── content/              # MDX içerik dosyaları
├── public/              # Statik dosyalar
└── util/               # Yardımcı fonksiyonlar
```

## 🔧 Performans İyileştirmeleri

### Bundle Optimizasyonu
- Kritik olmayan bileşenler lazy loading
- Bundle splitting ile kod bölümleme
- Tree shaking ile kullanılmayan kod temizleme

### CSS Optimizasyonu
- Tailwind JIT mode
- Critical CSS inline
- Unused CSS temizleme

### Font Optimizasyonu
- Font display swap
- Preloading kritik fontlar
- Fallback fontlar

### Image Optimizasyonu
- Next.js Image component
- WebP format desteği
- Lazy loading

## 📊 SEO İyileştirmeleri

### Meta Tags
- Title ve description optimizasyonu
- Open Graph tags
- Twitter Card tags
- Canonical URLs

### Structured Data
- Person schema markup
- Organization schema
- Breadcrumb schema

### Technical SEO
- Sitemap.xml
- Robots.txt
- XML sitemap
- Meta robots

## 🎯 Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## 📱 Responsive Design

- Mobile-first yaklaşım
- Touch-friendly interface
- Optimized for all screen sizes

## 🔒 Güvenlik

- CSP headers
- XSS protection
- Frame options
- Content type options

## 📈 Analytics

- Beam Analytics entegrasyonu
- Performance monitoring
- Core Web Vitals tracking

## 🚀 Deployment

```bash
# Production build
pnpm build

# Export static files
pnpm export

# Deploy to hosting platform
```

## 📝 License

MIT License - Detaylar için LICENSE dosyasına bakın.
