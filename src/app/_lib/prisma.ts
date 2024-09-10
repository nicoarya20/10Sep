import { PrismaClient } from '@prisma/client';
const PrismaClientSingleton = () => { 
   return new PrismaClient()
}
declare const globalThis:{
   prismaGlobal: ReturnType<typeof PrismaClientSingleton>;
  }  &typeof global;

  const prisma = globalThis.prismaGlobal || PrismaClientSingleton();
  export default prisma
  
  if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma


//   Kode di atas adalah sebuah implementasi untuk membuat Prisma Client sebagai singleton dalam aplikasi Next.js atau Node.js. Ini bertujuan agar hanya ada satu instance dari Prisma Client yang dibuat selama aplikasi berjalan, terutama di lingkungan development di mana server sering di-reload. Berikut penjelasan dari setiap bagian:

//   1. import { PrismaClient } from '@prisma/client';
//   Mengimpor PrismaClient dari package @prisma/client, yang merupakan API untuk berinteraksi dengan database menggunakan Prisma.

//   2. const PrismaClientSingleton = () => { return new PrismaClient() }
//   Fungsi PrismaClientSingleton ini mengembalikan instance baru dari PrismaClient.
//   new PrismaClient(): Membuat sebuah instance baru dari PrismaClient untuk digunakan berkomunikasi dengan database.

//   3. declare const globalThis: {...} & typeof global;
//   globalThis adalah objek global di JavaScript yang tersedia di semua lingkungan (browser, Node.js, dll.).
  
//   Deklarasi globalThis ini menambahkan properti khusus (prismaGlobal) pada objek globalThis.
  
//   Deklarasi ini dilakukan agar TypeScript mengetahui bahwa properti prismaGlobal mungkin ada di globalThis. Properti ini nantinya akan menyimpan instance Prisma yang akan digunakan sebagai singleton.
  
//   prismaGlobal: Properti tambahan yang memiliki tipe yang sama dengan return dari fungsi PrismaClientSingleton, yaitu instance dari PrismaClient.

//   4. const prisma = globalThis.prismaGlobal || PrismaClientSingleton();
//   Baris ini menentukan apakah instance Prisma Client sudah ada atau belum.
//   Jika globalThis.prismaGlobal sudah ada, artinya instance Prisma Client sudah ada, maka digunakan instance yang ada.
//   Jika belum ada, maka dibuat instance baru dengan memanggil PrismaClientSingleton().
//   Ini memastikan bahwa aplikasi tidak membuat lebih dari satu instance Prisma Client secara bersamaan.

//   5. export default prisma
//   prisma diekspor sebagai default export. Ini berarti instance Prisma ini dapat digunakan di berbagai bagian aplikasi.

//   6. if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
//   Bagian ini menetapkan instance prisma ke properti globalThis.prismaGlobal jika aplikasi berjalan di lingkungan development atau staging (bukan production).
//   process.env.NODE_ENV !== 'production': Mengecek apakah lingkungan aplikasi bukan production.

//   Jika kondisi ini terpenuhi, instance Prisma Client yang baru saja dibuat akan disimpan di globalThis.prismaGlobal agar instance yang sama bisa digunakan di request berikutnya.
//   Mengapa Singleton Penting?
//   Dalam lingkungan development, server Node.js sering di-reload setiap kali kode berubah, yang menyebabkan Prisma membuat instance baru di setiap reload. Hal ini bisa menyebabkan masalah seperti terlalu banyak koneksi yang terbuka ke database. Menggunakan pola singleton seperti ini memastikan hanya ada satu instance Prisma Client yang aktif, meskipun server di-reload berkali-kali.
  
//   Kesimpulan:
//   Kode ini membuat Prisma Client sebagai singleton untuk menghindari pembuatan instance berlebih, khususnya di lingkungan development. Jika aplikasi di-reload, instance yang sama akan digunakan kembali, dan jika server di-production, instance Prisma akan dibuat baru untuk setiap proses yang berjalan.