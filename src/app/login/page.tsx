"use client"
import {
   Button,
   Center,
   Container,
   Group,
   Stack,
   TextInput,
   Title
} from '@mantine/core';
import { useState } from 'react';

export default function Page() {
   const [form,setForm] = useState({
      email: " ",
      password: " "
   });

   async function login() {
      if (form.email && form.password) {
         const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
         });
         const data = await res.text();
         if (!res.ok) return alert (data);
         window.location.href = '/profile';
         return
   }
   return alert("Please fill at the fields");
}
// Kode di atas merupakan sebuah komponen React yang berfungsi sebagai form login. Komponen ini memungkinkan pengguna memasukkan email dan password, lalu mengirimkan data tersebut ke API login untuk autentikasi. Jika login berhasil, pengguna akan diarahkan ke halaman /profile. Berikut penjelasan bagian-bagian pentingnya:

// 1. export default function Page() { ... }
// Komponen Page ini adalah fungsi React yang diekspor secara default. Ini adalah komponen utama yang akan di-render pada halaman tertentu.
// 2. const [form, setForm] = useState({ email: " ", password: " " });
// Menggunakan useState untuk mendefinisikan state form, yang akan menyimpan data email dan password yang dimasukkan oleh pengguna.
// form: Variabel yang menyimpan objek dengan properti email dan password.
// setForm: Fungsi untuk memperbarui nilai form.
// useState(): Hook React yang digunakan untuk menambahkan state ke komponen fungsional.
// Initial state di sini adalah sebuah objek dengan nilai awal email dan password yang berupa string kosong.
// 3. async function login() { ... }
// Fungsi login ini bertugas menangani proses login ketika pengguna menekan tombol login.
// async: Menandakan bahwa fungsi ini bersifat asynchronous, yang memungkinkan penggunaan await untuk menunggu proses asynchronous (seperti fetch API).
// 4. if (form.email && form.password) { ... }
// Ini adalah pengecekan sederhana untuk memastikan bahwa kedua field (email dan password) sudah diisi oleh pengguna sebelum mengirimkan data.
// form.email && form.password: Kondisi ini memastikan bahwa email dan password tidak kosong.
// 5. const res = await fetch('/api/login', { ... });
// fetch digunakan untuk melakukan request HTTP POST ke API endpoint /api/login dengan data yang dimasukkan pengguna (email dan password).
// method: 'POST': Menentukan bahwa request ini adalah POST.
// headers: { 'Content-Type': 'application/json' }: Mengatur header request untuk menunjukkan bahwa body yang dikirim berupa JSON.
// body: JSON.stringify(form): Mengonversi objek form (yang berisi email dan password) menjadi string JSON sebelum dikirim dalam request.
// 6. const data = await res.text();
// Setelah response dari API diterima, kode ini mengambil hasil response dalam bentuk teks (bukan JSON). Variabel data menyimpan pesan dari API tersebut.
// 7. if (!res.ok) return alert(data);
// Pengecekan ini dilakukan untuk melihat apakah request berhasil atau gagal.
// res.ok: Properti dari response yang mengembalikan true jika response status antara 200–299 (berhasil).
// Jika request gagal, akan menampilkan pesan error dari server menggunakan alert(data) dan menghentikan eksekusi fungsi dengan return.
// 8. window.location.href = '/profile';
// Jika request berhasil (login sukses), pengguna akan diarahkan ke halaman /profile.
// window.location.href: Mengganti URL browser, sehingga pengguna diarahkan ke halaman baru.
// 9. return alert("Please fill at the fields");
// Jika pengguna tidak mengisi kedua field (email dan password), fungsi ini akan menampilkan pesan alert untuk memberitahukan bahwa form belum diisi dengan benar.
// Kesimpulan:
// Komponen ini membuat form login yang mengumpulkan email dan password pengguna, lalu mengirim data tersebut ke API untuk login. Jika login berhasil, pengguna diarahkan ke halaman /profile. Jika terjadi kesalahan (entah itu karena form tidak lengkap atau ada error dari server), akan muncul pesan alert untuk memberitahukan pengguna.
return(
   <Container>
      <Center>
         <Stack>
            <Title>Login</Title>
            <TextInput
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            placeholder="Email"
            label="Email"
            />
            <TextInput
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
// Kode di atas adalah bagian dari form input di React yang mengelola perubahan nilai email menggunakan state. Berikut penjelasan detailnya:

// 1. value={form.email}
// value adalah atribut dari elemen input yang menentukan nilai yang ditampilkan di dalam input tersebut.
// form.email: Mengambil nilai email dari state form. Ini berarti nilai yang ditampilkan di input akan selalu sinkron dengan state form.
// 2. onChange={(e) => setForm({...form, email: e.target.value})}
// onChange: Event handler yang dipanggil setiap kali nilai input berubah (saat pengguna mengetik di dalam input).
// (e) => ...: Fungsi yang mengambil event (e) sebagai argumen. Event ini berisi informasi tentang interaksi pengguna dengan elemen input, termasuk nilai input saat ini.
// e.target.value: Mengambil nilai baru yang dimasukkan pengguna ke dalam input (nilai terbaru yang diketik).
// Penjelasan lebih lanjut:
// setForm({...form, email: e.target.value}):
// setForm: Fungsi yang digunakan untuk memperbarui state form.
// {...form}: Menggunakan spread operator untuk menyalin semua properti yang ada di dalam objek form. Ini menjaga agar nilai properti lain di dalam form (misalnya, password) tidak dihapus atau diganti.
// email: e.target.value: Mengubah nilai email di state form menjadi nilai baru yang diketik pengguna. Properti email diperbarui sesuai input, sementara properti lain di objek form tetap sama.
// Kesimpulan:
// value={form.email} memastikan bahwa nilai yang ditampilkan di input selalu berasal dari state.
// onChange={(e) => setForm({...form, email: e.target.value})} memperbarui nilai state email setiap kali pengguna mengetik sesuatu di input, sehingga state selalu up-to-date dengan nilai input terbaru. Hal ini membuat komponen menjadi controlled component di mana state React sepenuhnya mengontrol nilai input.
            placeholder="Password"
            label="Password"
            />
            <Group justify='end'>
            <Button
            onClick={login}
            >Login</Button>
            </Group>
         </Stack>
      </Center>
   </Container>
);
}
