# Jawaban Teori

## A1. Aturan Hooks

Karena useState dipanggil di dalam kondisi if, sehingga Hook hanya dijalankan ketika sudahLogin bernilai true. React mencocokkan state dengan Hook berdasarkan urutan pemanggilan Hook pada setiap render, sehingga urutan yang berubah dapat menyebabkan state tertukar atau error.

```jsx
function Profil({ sudahLogin }) {
  const [nama, setNama] = useState("");
  if (!sudahLogin) return <p>Silakan masuk.</p>;
  return <input value={nama} onChange={(event) => setNama(event.target.value)} />;
}
```

## A2. Pembaruan Array State

items.push(baru) mengubah array secara langsung, sehingga referensi array tetap sama dan React dapat menganggap state tidak berubah ketika setItems(items) dipanggil. React menggunakan perubahan referensi untuk mendeteksi perubahan state, sehingga memutasi array yang sama dapat menyebabkan komponen tidak dirender ulang.

```jsx
setItems((itemsSaatIni) => [...itemsSaatIni, baru]);
```

## A3. useEffect dan Cleanup    

useEffect(() => { ... }) dijalankan setelah setiap render ketika komponen selesai diperbarui.
useEffect(() => { ... }, []) dijalankan setelah render pertama
useEffect(() => { ... }, [kota]) dijalankan setelah render pertama dan ketika nilai kota berubah. Cleanup function dijalankan sebelum Effect dijalankan kembali karena dependensinya berubah dan ketika komponen dilepas. Cleanup biasanya digunakan untuk membersihkan timer, menghapus event listener, atau membatalkan proses yang masih berjalan.

## A4. Mengangkat State

State keyword sebaiknya disimpan di komponen induk yang menaungi FilterBar dan DaftarMenu, karena keduanya membutuhkan nilai yang sama. Memindahkan state ke induk terdekat yang digunakan bersama. Komponen induk mengirimkan keyword dan fungsi untuk mengubahnya melalui props ke kedua komponen. Dari FilterBar, yang diteruskan ke induk bukan data hasil pencarian secara langsung, melainkan pemanggilan fungsi callback yang membawa nilai kata kunci terbaru.

## A5. Controlled Component

Controlled component adalah elemen formulir yang nilai inputnya dikendalikan oleh React melalui state, biasanya menggunakan props value dan onChange. Satu fungsi handleChange dapat menangani sepuluh input jika setiap input memiliki atribut name yang unik dan fungsi tersebut menggunakan event.target.name serta event.target.value untuk mengetahui input yang berubah dan nilainya.
