import Link from "next/link"

export default function RegisterContent() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground">
        Untuk menggunakan platform ini pengguna harus memiliki akun terlebih dahulu, jika pengguna belum memiliki akun
        diharuskan untuk mendaftar terlebih dahulu adapun langkah pendaftaran sebagai berikut
      </p>
      <div className="flex justify-center">
        <ol className="ml-10 flex list-decimal flex-col gap-2">
          <li>
            <p>
              Pada laman{" "}
              <Link href={"/"} className="underline underline-offset-4 ">
                Beranda
              </Link>{" "}
              silahkan tekan tombol <span className="font-bold">Mulai sekarang</span>.
            </p>
          </li>
          <li>
            <p>
              Pengguna akan diarahkan ke halaman pendaftaran, pengguna harus mengisi form yang tersedia pada halaman
              tersebut.
            </p>
          </li>
          <li>
            <p>
              Pada form awal pengguna akan diminta untuk memilih role sesuai yang di inginkan, terdapat dua role yang
              bisa dipilih yaitu pengguna <span className="font-bold">Siswa</span> dan{" "}
              <span className="font-bold">Guru</span>.
            </p>
          </li>
          <li>
            <p>
              Setelah memilih role yang sesuai, pengguna akan diminta mengisi biodata seperti email, password, nama
              lengkap yang nantinya akan di gunakan untuk mengakses fitur yang ada.
            </p>
          </li>
        </ol>
      </div>
    </div>
  )
}
