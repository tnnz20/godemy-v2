import Link from "next/link"

export default function LoginContent() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground">Adapun langkah untuk login sebagai berikut</p>
      <div className="flex justify-center">
        <ol className="ml-10 flex list-decimal flex-col gap-2">
          <li>
            <p>
              Pada laman{" "}
              <Link href={"/"} className="underline underline-offset-4 ">
                Beranda
              </Link>{" "}
              silahkan tekan tombol <span className="font-bold">Masuk</span>.
            </p>
          </li>
          <li>
            <p>
              Pengguna akan diarahkan ke halaman login, pengguna harus mengisi form yang tersedia pada halaman tersebut.
            </p>
          </li>
          <li>
            <p>Pengguna akan diminta memasukan email dan password yang sudah terdaftar.</p>
          </li>
        </ol>
      </div>
    </div>
  )
}
