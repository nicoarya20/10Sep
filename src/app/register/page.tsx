"use client"
import {
   Button,
   Flex,
   Group,
   Stack,
   Text,
   TextInput,
   Title
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";

export default function Page() {
   const [form, setForm] = useState({
      name: " ",
      email: " ",
      password: " "
   });

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const [listUser, setListUser] = useState<any[]>([]);
   const [loading, setLoading] = useState(false);

   function cleanForm() {
      setForm({
         name: " ",
         email: " ",
         password: " "
      });

   }
   async function loadListUser() {
      const res = await fetch("/api/list");
      const data = await res.text();
      if (!res.ok) return console.log(data);

      const dataJson = JSON.parse(data);
      console.log(JSON.stringify(dataJson, null, 2));
      setListUser(dataJson.data);
   }

   useShallowEffect(() => {
      loadListUser();
   }, []);

   async function onRegister() {
      setLoading(true);
      try {
         if (form.name && form.email && form.password) {
            const res = await fetch('/api/register', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(form)
            });
            const data = await res.text();
            if (!res.ok) return alert(data);
            cleanForm();
            loadListUser();
            return
         }
         return alert("Please fill at the fields");
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   }

   return (
      <Stack>
         <Flex>
            <Stack>
               <Title>Register</Title>
               <TextInput
                  label="name"
                  placeholder="name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
               />
               <TextInput
                  label="email"
                  placeholder="email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
               />
               <TextInput
                  label="password"
                  placeholder="password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
               />
               <Group justify="end">
                  <Button loading={loading} onClick={onRegister}>
                     Register
                  </Button>
               </Group>
               <Stack>
                  <Title>
                     List User
                  </Title>z
                  {listUser.length === 0 && <Text>No user</Text>}
                  {listUser.map((user, k) => (
                     <Flex key={k} gap={"md"}>
                        {k}
                        <Text>{k + 1}</Text>
                        <Text>{user.name}</Text>
                     </Flex>
                  ))}
               </Stack>
            </Stack>
         </Flex>
      </Stack>
   );
}


// const str = "Hello, World!";
// const st2 = 0
// const st3 = {}
// const st4 = []

// const dsta = {
//    name: " ",
//    email: " ",
//    password: " ",
//    data: st2,
//    data2: st3,
//    data3: st4,
//    apa: [],
//    ini: {},
//    lala: {
//       itu: {
//          apa: {
//             nama: "malik",
//             umur: "10"
//          }
//       }
//    }
// }



// const arr = [{
//    nama: "malik",
// }, "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"]
// const arr2 = [1,2,3,4,5,6,7,8,9,10,11]
// const arr4 = [
//    [1,2,3,4,5,6,7,8,9,10,11],
//    [1,2,3,4,5,6,7,8,9,10,11],
// ]
// const arr5 = [str, st2, st3, st4, dsta, arr, arr2, arr4, arr5]

//14-70
// Kode di atas adalah sebuah komponen React yang menangani pendaftaran pengguna dan pemuatan daftar pengguna. Berikut adalah penjelasan mendetail tentang setiap bagian kode:

// 1. export default function Page() { ... }
// Komponen Page ini adalah fungsi React yang diekspor secara default. Komponen ini mengelola state dan fungsi untuk pendaftaran pengguna dan memuat daftar pengguna.
// 2. const [form, setForm] = useState({ name: " ", email: " ", password: " " });
// Menggunakan useState untuk mendefinisikan state form, yang berisi data pengguna yang akan didaftarkan.
// form: Objek yang menyimpan nilai untuk nama, email, dan password pengguna.
// setForm: Fungsi untuk memperbarui nilai form.
// useState(): Hook React yang digunakan untuk menambahkan state ke komponen fungsional. Inisialisasi state dengan objek berisi properti name, email, dan password.
// 3. const [listUser, setListUser] = useState<any[]>([]);
// Mendefinisikan state listUser untuk menyimpan daftar pengguna yang diambil dari API.
// listUser: Array yang akan menyimpan daftar pengguna.
// setListUser: Fungsi untuk memperbarui nilai listUser.
// useState<any[]>([]): Inisialisasi state dengan array kosong. Tipe any digunakan untuk menonaktifkan pemeriksaan tipe TypeScript pada array ini.
// 4. const [loading, setLoading] = useState(false);
// Mendefinisikan state loading untuk menunjukkan status pemuatan data (apakah data sedang dimuat atau tidak).
// loading: Boolean yang menunjukkan status pemuatan.
// setLoading: Fungsi untuk memperbarui nilai loading.
// useState(false): Inisialisasi state dengan nilai false, menandakan bahwa pemuatan data belum dimulai.
// 5. function cleanForm() { ... }
// Fungsi cleanForm digunakan untuk mengatur ulang nilai-nilai di state form menjadi string kosong.
// setForm({ name: " ", email: " ", password: " " });: Mengatur ulang form dengan nilai awal.
// 6. async function loadListUser() { ... }
// Fungsi loadListUser digunakan untuk mengambil daftar pengguna dari endpoint API /api/list.
// await fetch("/api/list"): Mengirimkan request GET ke API /api/list untuk mengambil data.
// const data = await res.text();: Mengambil response dalam bentuk teks.
// if (!res.ok) return console.log(data);: Mengecek apakah request berhasil. Jika tidak, mencetak pesan error ke console.
// const dataJson = JSON.parse(data);: Mengonversi teks response menjadi objek JSON.
// setListUser(dataJson.data);: Memperbarui state listUser dengan data pengguna yang diambil dari response.
// 7. useShallowEffect(() => { loadListUser(); }, []);
// Ini adalah hook useShallowEffect yang akan menjalankan fungsi loadListUser setiap kali komponen di-render.
// useShallowEffect sepertinya adalah custom hook yang mirip dengan useEffect, tapi hanya memeriksa perubahan shallow (tidak mendalam) pada dependensi.
// []: Array dependensi kosong berarti efek ini hanya akan dijalankan sekali setelah komponen di-mount (mirip dengan componentDidMount di class components).
// 8. async function onRegister() { ... }
// Fungsi onRegister menangani proses pendaftaran pengguna saat form dikirim.
// setLoading(true);: Mengatur loading menjadi true untuk menunjukkan bahwa pemrosesan pendaftaran sedang berlangsung.
// if (form.name && form.email && form.password) { ... }: Mengecek apakah semua field form sudah diisi.
// await fetch('/api/register', { ... }): Mengirimkan request POST ke endpoint /api/register dengan data pengguna untuk pendaftaran.
// headers: { 'Content-Type': 'application/json' }: Mengatur header request untuk menunjukkan bahwa body request berupa JSON.
// body: JSON.stringify(form): Mengonversi objek form menjadi string JSON.
// const data = await res.text();: Mengambil response dari server dalam bentuk teks.
// if (!res.ok) return alert(data);: Mengecek apakah request berhasil. Jika tidak, menampilkan pesan error.
// cleanForm();: Mengatur ulang form setelah pendaftaran berhasil.
// loadListUser();: Memuat ulang daftar pengguna setelah pendaftaran.
// return alert("Please fill all the fields");: Jika ada field yang kosong, menampilkan pesan alert.
// catch (error) { console.log(error); }: Menangani dan mencetak error jika terjadi masalah saat pendaftaran.
// finally { setLoading(false); }: Mengatur loading menjadi false setelah proses pendaftaran selesai, terlepas dari apakah pendaftaran berhasil atau gagal.
// Kesimpulan:
// Komponen ini mengelola form pendaftaran pengguna, termasuk mengisi dan mengirimkan data pendaftaran, serta memuat dan menampilkan daftar pengguna. Komponen ini juga menangani status pemuatan data dan pembersihan form setelah pendaftaran. Fungsi utama komponen adalah:

// Menampilkan form pendaftaran.
// Mengirim data pendaftaran ke API.
// Memuat daftar pengguna dari API dan menampilkan daftar tersebut.
// Menangani status pemuatan dan error.

//92-109
// Kode di atas adalah bagian dari komponen React yang digunakan untuk menampilkan form pendaftaran dan daftar pengguna. Ini mencakup beberapa elemen UI seperti tombol, judul, dan daftar pengguna. Berikut adalah penjelasan setiap bagiannya:

// 1. <Group justify="end">
// Group adalah komponen dari library UI, mungkin seperti Mantine atau library UI lain yang mendukung komponen Group.
// justify="end": Mengatur alignment isi dalam Group ke akhir (kanan). Ini akan memposisikan elemen-elemen di dalam Group ke sisi kanan kontainer.
// 2. <Button loading={loading} onClick={onRegister}>Register</Button>
// Button adalah elemen tombol yang di-render di UI.
// loading={loading}: Menampilkan indikator loading (seperti spinner) jika state loading bernilai true. Ini memberi umpan balik visual bahwa proses sedang berlangsung.
// onClick={onRegister}: Menetapkan fungsi onRegister untuk dipanggil saat tombol diklik. Fungsi ini akan menangani proses pendaftaran pengguna.
// Register: Teks yang ditampilkan di dalam tombol.
// 3. </Group>
// Menutup elemen Group.
// 4. <Stack>
// Stack adalah komponen yang mungkin digunakan untuk menata elemen secara vertikal dengan jarak tertentu di antara mereka.
// Elemen-elemen di dalam Stack akan ditempatkan secara vertikal dengan jarak yang konsisten.
// 5. <Title>List User</Title>
// Title adalah komponen yang mungkin digunakan untuk menampilkan teks sebagai judul atau heading.
// List User: Teks yang ditampilkan sebagai judul untuk daftar pengguna.
// 6. {listUser.length === 0 && <Text>No user</Text>}
// Ini adalah ekspresi kondisional yang menggunakan && (logical AND) untuk memeriksa apakah listUser kosong (panjangnya 0).
// Jika listUser.length sama dengan 0, maka akan menampilkan <Text>No user</Text>. Ini memberi tahu pengguna bahwa tidak ada pengguna yang tersedia dalam daftar.
// 7. {listUser.map((user, k) => ( ... ))}
// listUser.map: Menggunakan fungsi map untuk iterasi melalui array listUser dan mengembalikan elemen untuk setiap pengguna.
// (user, k): Mengambil setiap elemen dari listUser sebagai user dan indeksnya sebagai k.
// a. <Flex key={k} gap={"md"}>
// Flex adalah komponen yang mungkin digunakan untuk tata letak fleksibel, biasanya untuk menyusun elemen dalam baris atau kolom.
// key={k}: Menyediakan kunci unik untuk setiap elemen dalam daftar, di sini menggunakan indeks k. Ini penting untuk React untuk mengidentifikasi elemen yang berubah.
// gap={"md"}: Mengatur jarak (gap) antara elemen-elemen di dalam Flex.
// b. {k}
// Menampilkan nilai indeks k dari pengguna saat ini di dalam daftar.
// c. <Text>{k + 1}</Text>
// <Text>: Menampilkan teks dengan nilai k + 1, yang memberikan nomor urut pengguna di daftar (misalnya, 1, 2, 3, ...).
// d. <Text>{user.name}</Text>
// Menampilkan nama pengguna dari objek user.
// 8. </Flex>
// Menutup elemen Flex.
// 9. </Stack>
// Menutup elemen Stack.
// Kesimpulan:
// Kode ini menyusun beberapa elemen UI:
// Tombol Register di sebelah kanan (dalam Group) dengan indikator loading jika pendaftaran sedang diproses.
// Judul untuk daftar pengguna di bagian atas (dalam Stack).
// Daftar pengguna ditampilkan dengan nomor urut dan nama. Jika daftar kosong, menampilkan pesan "No user".
// Komponen ini menggabungkan elemen-elemen UI untuk memberikan tampilan yang terstruktur dan responsif untuk pendaftaran pengguna dan menampilkan daftar pengguna yang terdaftar.