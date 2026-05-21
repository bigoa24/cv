# CV Website — Bilgehan Bayramoğlu

Minimal, profesyonel, çok sayfalı kişisel CV sitesi. Saf HTML + CSS + JavaScript. Build adımı yok — herhangi bir static hosting servisinde çalışır.

## Yapı

```
cv-website/
  index.html         # Anasayfa (hakkımda, eğitim, yetenekler)
  experience.html    # İş deneyimi
  projects.html      # Projeler
  contact.html       # İletişim
  css/styles.css
  js/lang.js         # TR/EN dil değiştirici (localStorage'da kaydedilir)
  assets/
    projects/        # Proje ekran görüntüleri buraya
    docs/            # PDF dosyaları buraya (örn. stock-prediction.pdf)
```

## Yerel olarak çalıştırma

Çift tıklayarak `index.html` dosyasını açabilirsin ya da basit bir HTTP sunucusu çalıştır:

```sh
cd cv-website
python3 -m http.server 8000
# tarayıcıdan: http://localhost:8000
```

## Ekran görüntüsü / PDF ekleme

- Proje ekran görüntülerini `assets/projects/` klasörüne koy. Dosya isimleri `projects.html` içindeki placeholder yazılarında belirtildi (örn. `basketbol-1.png`).
- Yerleştirdikten sonra `projects.html` içinde ilgili `<div class="screenshot-slot">` blokunu şu şekilde değiştir:

```html
<div class="screenshot-slot">
  <img src="assets/projects/basketbol-1.png" alt="Basketbol Analiz ekran 1" />
</div>
```

- Hisse senedi tahmini PDF'ini `assets/docs/stock-prediction.pdf` olarak kaydetmen yeterli — link zaten oraya işaret ediyor.

## Yayınlama

GitHub Pages, Netlify, Vercel veya Cloudflare Pages'e direkt sürükle-bırak ile yayınlayabilirsin.

### GitHub Pages

```sh
cd cv-website
git init && git add . && git commit -m "Initial CV site"
git branch -M main
git remote add origin https://github.com/<kullanici>/<repo>.git
git push -u origin main
# Repo Settings → Pages → Branch: main → /(root) → Save
```

## Dil değiştirici

Sağ üstte `TR / EN` düğmesi var. Seçim `localStorage`'da saklandığı için sayfalar arası geçişte korunur.
