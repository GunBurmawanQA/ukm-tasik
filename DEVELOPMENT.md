# Development Workflow

Panduan ini dibuat untuk project HTML/CSS/JS sederhana tanpa build tool.

## 1. Struktur Project

- `index.html` adalah halaman utama.
- `css/style.css` menyimpan semua style.
- `js/script.js` menyimpan logic untuk render data, pencarian, dan interaksi.
- `data/sme.json` menyimpan data UKM yang muncul di direktori.
- `data/products.json` menyimpan data produk.
- `images/` menyimpan gambar lokal.
- `profile-*.html` adalah halaman profil UKM.

## 2. Menjalankan Website Lokal

Jalankan dari folder project:

```powershell
python -m http.server 8123 --bind 127.0.0.1
```

Buka:

```text
http://127.0.0.1:8123/
```

Gunakan server lokal, bukan double-click `index.html`, karena website mengambil data dengan `fetch()` dari folder `data/`.

## 3. Alur Kerja Harian

1. Jalankan server lokal.
2. Buka website di browser.
3. Edit file yang diperlukan:
   - Konten layout: `index.html`
   - Tampilan: `css/style.css`
   - Interaksi/data render: `js/script.js`
   - Data UKM/produk: `data/*.json`
4. Refresh browser setelah perubahan.
5. Tes fitur yang berubah di desktop dan mobile width.
6. Cek console browser jika ada data yang tidak muncul.

## 4. Menambah UKM Baru

1. Tambahkan gambar ke `images/`.
2. Tambahkan data baru ke `data/sme.json`.
3. Buat file profil baru, contoh:

```text
profile-nama-ukm.html
```

4. Pastikan nilai `profile` di `data/sme.json` sama persis dengan nama file profil.

Contoh data:

```json
{
    "name": "Nama UKM",
    "category": "Kategori",
    "description": "Deskripsi singkat UKM.",
    "image": "images/nama-gambar.jpeg",
    "profile": "profile-nama-ukm.html"
}
```

## 5. Checklist Sebelum Selesai

- Semua gambar di JSON ada di folder `images/`.
- Semua link `profile` di `data/sme.json` punya file HTML tujuan.
- JSON valid, tidak ada koma berlebih di item terakhir.
- Pencarian UKM bisa menemukan data berdasarkan nama dan kategori.
- Tidak ada error di browser console.
- Halaman tetap rapi di layar desktop dan mobile.

## 6. Validasi Cepat

Cek sintaks JavaScript:

```powershell
node --check js\script.js
```

Cek semua file profil dari data UKM:

```powershell
$smes = Get-Content -Raw data\sme.json | ConvertFrom-Json
foreach ($sme in $smes) {
    if (Test-Path -LiteralPath $sme.profile) {
        "OK $($sme.profile)"
    } else {
        "BROKEN $($sme.profile)"
    }
}
```

## 7. Aturan Kecil Agar Project Tetap Rapi

- Pakai lowercase untuk nama file baru jika memungkinkan.
- Hindari spasi pada nama file gambar dan halaman.
- Simpan data berulang di JSON, bukan hardcode kartu satu per satu di HTML.
- Jaga `script.js` tetap fokus pada render data dan interaksi.
- Jangan ubah struktur folder tanpa memperbarui path di HTML, CSS, JS, dan JSON.
