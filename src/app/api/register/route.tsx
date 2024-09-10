import prisma from "../../_lib/prisma";
export async function POST(request: Request) {
   try{
     const body = await request.json();
     const create = await prisma.user.create({
        data : {
         name : body.name,
         email : body.email,
         password : body.password
        }
     });
      return new Response(
         JSON.stringify({
            success : true,
            data: create
         })
      );
   } catch (error) {
      return new Response("Error :" + error, { status: 500 });
   }
}


// Kode ini adalah sebuah handler API POST di Next.js yang menangani pembuatan pengguna baru (user creation) di database menggunakan Prisma. Saat pengguna mengirimkan permintaan POST dengan data pengguna (name, email, dan password), handler ini akan menyimpan data tersebut ke dalam tabel User di database. Berikut penjelasan detailnya:

// 1. import prisma from "../../_lib/prisma";
// Mengimpor Prisma Client dari file prisma.js di folder _lib. Prisma Client digunakan untuk berinteraksi dengan database.

// 2. export async function POST(request: Request) { ... }
// Fungsi ini menangani request POST yang dikirim ke server.
// request: Request: Parameter ini berisi objek Request dari HTTP, yang menyimpan informasi seperti body, headers, dll.
// async: Fungsi ini bersifat asynchronous, memungkinkan penggunaan await untuk menangani operasi asinkron seperti parsing body request dan query database.

// 3. const body = await request.json();
// Kode ini mengambil isi body dari request POST dan mengonversinya menjadi objek JSON.
// await request.json(): Menunggu sampai body request selesai diubah ke format JSON.

// 4. const create = await prisma.user.create({ data: { ... } });
// Baris ini membuat pengguna baru di database menggunakan Prisma Client.
// a. prisma.user.create()
// Method create() digunakan untuk menambah data baru ke tabel User.
// b. data: { name: body.name, email: body.email, password: body.password }
// data: Berisi data yang akan dimasukkan ke tabel User. Field yang dikirimkan adalah:
// name: Nama pengguna yang berasal dari body request (body.name).
// email: Email pengguna yang berasal dari body request (body.email).
// password: Kata sandi pengguna yang berasal dari body request (body.password).

// 5. return new Response(JSON.stringify({ success: true, data: create }));
// Setelah data pengguna berhasil disimpan di database, handler mengembalikan response berupa JSON.
// a. JSON.stringify({ success: true, data: create })
// Konversi objek hasil ke dalam format JSON.
// success: true: Mengindikasikan bahwa operasi berhasil.
// data: create: Menyimpan data pengguna baru yang dibuat, yang dikembalikan oleh Prisma.

// 6. catch (error) { return new Response("Error: " + error, { status: 500 }); }
// Blok try-catch digunakan untuk menangani error yang mungkin terjadi selama operasi pembuatan pengguna.
// Jika terjadi error, handler mengembalikan response dengan status 500 (Internal Server Error) dan pesan error.

// Kesimpulan:
// Kode ini adalah handler API POST yang digunakan untuk membuat pengguna baru di database. Langkah-langkahnya:
// Mengambil data pengguna (name, email, password) dari body request.
// Menyimpan data tersebut ke dalam tabel User menggunakan Prisma Client.
// Jika berhasil, mengembalikan response dengan status 200 dan data pengguna yang baru dibuat.
// Jika terjadi error, mengembalikan response dengan status 500 dan pesan error.
// Fungsi ini umumnya digunakan untuk registrasi pengguna di sebuah aplikasi.