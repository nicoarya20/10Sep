import prisma from "../../_lib/prisma";
export async function POST(request: Request) {
   try{
      const body = await request.json();
      const user = await prisma.user.findUnique({
         where: {
            email : body.email
         }
      });
      if (user && user.password === body.password) {
         return new Response(
            JSON.stringify({
               success : true,
               data : user
            })
            );
   } 
   return new Response("Error: Invalid Credentials", { status: 401 });
}catch (error) {
   console.log(error);
   return new Response("Error :" + error, { status: 500 });
}
}

// Kode di atas adalah handler API POST di Next.js yang menangani proses autentikasi atau login. Kode ini memeriksa apakah pengguna dengan email dan password yang diberikan ada di database. Berikut penjelasan detailnya:

// 1. import prisma from "../../_lib/prisma";
// Kode ini mengimpor Prisma Client dari file prisma.js yang berada di folder _lib. Prisma Client digunakan untuk berinteraksi dengan database.

// 2. export async function POST(request: Request) { ... }
// Fungsi ini mendefinisikan handler untuk menangani request POST.
// request: Request: Parameter ini berisi objek Request yang mewakili request HTTP, yang di dalamnya mengandung data seperti body, headers, dll.
// async: Fungsi ini adalah asynchronous sehingga dapat menggunakan await untuk operasi asynchronous seperti pemrosesan request dan query database.

// 3. const body = await request.json();
// Baris ini mengekstrak body dari request POST dan mengubahnya menjadi objek JSON.
// await request.json(): request.json() adalah asynchronous, jadi kita menggunakan await untuk menunggu proses pengubahan body request ke format JSON.

// 4. const user = await prisma.user.findUnique({ where: { email: body.email } });
// Di sini, kita melakukan query ke database menggunakan Prisma Client untuk menemukan pengguna berdasarkan email yang dikirim di dalam body request.
// prisma.user.findUnique(): Ini adalah method Prisma untuk menemukan satu entri unik dari tabel User berdasarkan kondisi tertentu (dalam hal ini, email).
// where: { email: body.email }: Kondisi pencarian, di mana kita mencari pengguna dengan email yang cocok dengan email dari body request.

// 5. if (user && user.password === body.password) { ... }
// Setelah query selesai, kondisi ini memeriksa apakah pengguna (user) ditemukan dan apakah password yang ditemukan di database cocok dengan password yang diberikan di body request.
// user: Jika pengguna ditemukan, variabel user akan berisi data pengguna.
// user.password === body.password: Memastikan bahwa password yang diinputkan cocok dengan password yang tersimpan di database.
// a. return new Response(JSON.stringify({ success: true, data: user }));
// Jika email dan password cocok, maka kita mengembalikan response dengan status 200 OK yang berisi data pengguna dalam format JSON.
// JSON.stringify({ success: true, data: user }): Mengonversi objek yang berisi success: true dan data pengguna (user) menjadi format JSON untuk dikirim kembali ke klien.

//6. return new Response("Error: Invalid Credentials", { status: 401 });
// Jika pengguna tidak ditemukan atau password tidak cocok, server akan mengembalikan response dengan pesan "Error: Invalid Credentials" dan status 401 Unauthorized.
// Status 401 digunakan untuk menunjukkan bahwa kredensial yang diberikan salah atau tidak valid.

// 7. catch (error) { ... }
// Blok try-catch digunakan untuk menangani error yang mungkin terjadi selama proses.

// a. console.log(error);
// Jika terjadi error, kita mencetak error tersebut ke console untuk tujuan debugging.
// b. return new Response("Error :" + error, { status: 500 });
// Jika ada error yang tidak terduga, server akan mengembalikan response dengan pesan error dan status 500 (Internal Server Error), menandakan bahwa ada masalah di server.

//Kesimpulan:
// Kode ini merupakan handler API POST yang digunakan untuk melakukan autentikasi pengguna. Prosesnya adalah:

// Mengambil email dan password dari body request.
// Mencari pengguna di database berdasarkan email.
// Jika pengguna ditemukan dan password cocok, respons dengan data pengguna akan dikembalikan.
// Jika email atau password salah, respons dengan status 401 akan dikirim.
// Jika ada error lain yang tidak terduga, status 500 akan dikembalikan.
