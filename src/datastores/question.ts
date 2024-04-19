import { QuestionConfig } from "@/types/quiz"

export const Questions: QuestionConfig[] = [
  {
    chapterId: 1,
    category: "Your First Program",
    questions: [
      {
        id: 1,
        question:
          "Sebutkan 3 orang yang berperan dalam pembuatan pemrograman Golang?",
        options: [
          "Robert Griesemer, Rob Pike, and Ken Thompson.",
          "Bill Gates, Mark Zuckberk, Elon Musk",
          "Jack ma, Jacky Chan, Eddie Wu",
          "Jeff Bezos, Bernard Arnault, Bill Gates",
        ],
        answer: "Robert Griesemer, Rob Pike, and Ken Thompson.",
        isCode: false,
      },
      {
        id: 2,
        question:
          "Dibawah ini pilihlah karakteristik Pemrograman Golang, Kecuali?",
        options: [
          "Static typing dan run-time",
          "Readability",
          "General purpose programming",
          "High - Performance dan multi-processing",
        ],
        answer: "General purpose programming",
        isCode: false,
      },
      {
        id: 3,
        question:
          "Apa library built - in atau bawaan yang disediakan oleh Golang untuk menampilkan teks ke dalam console?",
        options: ["time", "fmt", "String", "I/O"],
        answer: "fmt",
        isCode: false,
      },
      {
        id: 4,
        question:
          "Penulisan sebuah komentar pada pemrograman Golang dapat menggunakan tanda...",
        options: ["#", "*", "//", "$$"],
        answer: "//",
        isCode: false,
      },
      {
        id: 5,
        question:
          "Fungsi apa yang akan dijalankan pertama kali ketika program Golang dijalankan?",
        options: ["main", "important", "function", "first"],
        answer: "main",
        isCode: false,
      },
    ],
  },
  {
    chapterId: 2,
    category: "Variabels, Data Types, Operators",
    questions: [
      {
        id: 1,
        question:
          "Keyword yang digunakan untuk mendeklarasikan sebuah variabel adalah?",
        options: ["let", "variable", "def", "var"],
        answer: "var",
        isCode: false,
      },
      {
        id: 2,
        question: "Tanda yang digunakan untuk melakukan type inference?",
        options: ["==", ":=", "//", "%"],
        answer: ":=",
        isCode: false,
      },
      {
        id: 3,
        question:
          "Jika terdapat bilangan 840194 sebaiknya kita menggunakan tipe data apa ketika mendeklarasikan nilai tersebut ke dalam variable?",
        options: ["int32", "float32", "byte", "string"],
        answer: "int32",
        isCode: false,
      },
      {
        id: 4,
        question:
          "Operator yang digunakan untuk membandingkan dua buah nilai apakah sama adalah?",
        options: ["!=", "==", ">=", "<="],
        answer: "==",
        isCode: false,
      },
      {
        id: 5,
        question:
          "Apa output atau hasil ketika kita menggunakan Operator Logika?",
        options: ["string", "float", "int", "boolean"],
        answer: "boolean",
        isCode: false,
      },
    ],
  },
  {
    chapterId: 3,
    category: "Control Flow",
    questions: [
      {
        id: 1,
        question:
          "Dibawah ini yang merupakan sebuah control-flow adalah, kecuali",
        options: [
          "looping",
          "seleksi kondisi (if-else)",
          "switch-case",
          "Struktur Data",
        ],
        answer: "Struktur Data",
        isCode: false,
      },
      {
        id: 2,
        question:
          "Keyword yang digunakan untuk menambahkan kondisi pada sebuah seleksi kondisi (if-else) adalah?",
        options: ["else", "elif", " if else", "else if"],
        answer: "else if",
        isCode: false,
      },
      {
        id: 3,
        question:
          "Struktur kontrol yang digunakan dalam pemrograman untuk membuat keputusan berdasarkan nilai dari ekspresi tertentu. Adalah pengertian dari?",
        options: ["looping", "seleksi kondisi", "switch-case", "Struktur Data"],
        answer: "switch-case",
        isCode: false,
      },
      {
        id: 4,
        question:
          "Apa yang men Triger atau yang membuat suatu switch case akan menampilkan nilai default?",
        options: [
          "Semua kondisi case terpenuhi",
          "Salah satu kondisi case terpenuhi",
          "Jika tidak ada kondisi yang terpenuhi",
          "Bukan salah satu di atas",
        ],
        answer: "Jika tidak ada kondisi yang terpenuhi",
        isCode: false,
      },
      {
        id: 5,
        question: `var score int = 85
        if score >= 80{
          fmt.Println("Bagus Sekali")
        } else if score > 50{
          fmt.Println("Cukup Bagus")
        } else{
          fmt.Println("Coba Lagi")
        }`,
        subQuestion: "Apa output dari code di atas?",
        options: ["Bagus Sekali", "Cukup Bagus", "Coba Lagi", "Kosong"],
        answer: "Bagus Sekali",
        isCode: true,
      },
    ],
  },
  {
    chapterId: 4,
    category: "Looping",
    questions: [
      {
        id: 1,
        question:
          "Digunakan untuk mengotomatiskan tugas-tugas yang memerlukan repetisi, seperti memproses item dalam sebuah daftar, menghitung iterasi, atau menjalankan instruksi berulang kali. Merupakan fungsi dari?",
        options: ["if else", "fmt", "fungsi", "looping"],
        answer: "looping",
        isCode: false,
      },
      {
        id: 2,
        question:
          "Keyword yang digunakan untuk melakukan sebuah perulangan atau looping pada Go adalah?",
        options: ["func", "import", "break", "for"],
        answer: "for",
        isCode: false,
      },
      {
        id: 3,
        question: "Sebutkan komponen utama dalam looping, kecuali",
        options: ["Inisialisasi", "Kondisi", "scope", " Post - statement"],
        answer: "scope",
        isCode: false,
      },
      {
        id: 4,
        question:
          "Dalam standard looping terdapat sebuah statement “i++” apa yang dimaksud dari statement tersebut?",
        options: [
          "Melakukan penjumlah nilai i dengan nilai i",
          "Melakukan increment nilai i",
          "Melakukan decrement nilai i",
          "Tidak terjadi apa apa",
        ],
        answer: "Melakukan increment nilai i",
        isCode: false,
      },
      {
        id: 5,
        question:
          "Keyword yang digunakan untuk menghentikan sebuah looping tanpa argument adalah?",
        options: ["break", "fmt", "if", "continue"],
        answer: "break",
        isCode: false,
      },
    ],
  },
  {
    chapterId: 5,
    category: "Composite Types",
    questions: [
      {
        id: 1,
        question:
          "Terdiri dari tipe data umum yang digunakan untuk mengelompokkan data, sehingga lebih mudah untuk dikelola dan di manipulasi dalam kode Anda. Merupakan pengertian dari?",
        options: ["Tipe data", "Function", "Scope", "Tipe data komposit"],
        answer: "Tipe data komposit",
        isCode: false,
      },
      {
        id: 2,
        question: "Berikut yang merupakan tipe data dari komposit adalah?",
        options: ["boolean", "string", "array", "integer"],
        answer: "Array",
        isCode: false,
      },
      {
        id: 3,
        question: "Bagaimana sintaks untuk mendeklarasikan sebuah array?",
        options: [
          "var keranjang [5]string",
          "var keranjang {5}string",
          "var keranjang array",
          "var keranjang",
        ],
        answer: "var keranjang [5]string",
        isCode: false,
      },
      {
        id: 4,
        question:
          "Terdapat sebuah variabel data sebagai berikut var data = [4]int{1, 2, 3, 4} bagaimana cara untuk mendapatkan nilai “3 dan 4” menggunakan slice?",
        options: ["data[:]", "data[:2]", "data[2:]", "data"],
        answer: "looping",
        isCode: false,
      },
      {
        id: 5,
        question:
          "Keyword yang digunakan mendeklarasikan sebuah struct pada pemrograman Go adalah",
        options: [
          "type dan struct",
          "sturct dan type",
          "var dan struct",
          "struct dan array",
        ],
        answer: "type dan struct",
        isCode: false,
      },
    ],
  },
  {
    chapterId: 6,
    category: "Function",
    questions: [
      {
        id: 1,
        question:
          "Keyword yang digunakan untuk mendeklarasikan sebuah fungsi adalah",
        options: ["def", "function", "func", "void"],
        answer: "func",
        isCode: false,
      },
      {
        id: 2,
        question:
          "Berikut adalah jenis jenis scope yang tersedia pada Go, kecuali",
        options: [
          "Universal Scope",
          "Package Scope",
          "Block Scope",
          "Inter Scope",
        ],
        answer: "Inter Scope",
        isCode: false,
      },
      {
        id: 3,
        question:
          "Berapa banyak parameter yang bisa dimiliki oleh suatu function?",
        options: [
          "hanya satu",
          "satu atau dua",
          "minimal tiga",
          "sesuai kebutuhan",
        ],
        answer: "sesuai kebutuhan",
        isCode: false,
      },
      {
        id: 4,
        question:
          "Tanda yang digunakan untuk membuat sebuah paramter untuk fungsi variadic adalah?",
        options: ["#", "...", "*", "&"],
        answer: "...",
        isCode: false,
      },
      {
        id: 5,
        question:
          "Fungsi dalam bahasa pemrograman yang memiliki kemampuan untuk menangkap dan mengakses variabel yang ada di luar cakupannya (lexical scope). Merupakan pengertian dari?",
        options: [
          "Fungsi Closure",
          "Fungsi Variadic",
          "Return Fungsi",
          "Fungsi",
        ],
        answer: "Fungsi Closure",
        isCode: false,
      },
    ],
  },
]

export const QuizEval: QuestionConfig = {
  chapterId: 7,
  category: "Evaluasi",
  questions: [
    {
      id: 1,
      question: "Siapa yang awalnya mengembangkan bahasa pemrograman Go?",
      options: ["Google", "Microsoft", "Apple", "Facebook"],
      answer: "Google",
      isCode: false,
    },
    {
      id: 2,
      question:
        "Kapan Bahasa pemrograman Go pertama kali diperkenalkan ke publik?",
      options: ["2005", "2007", "2009", "2011"],
      answer: "2009",
      isCode: false,
    },
    {
      id: 3,
      question:
        "Apa perbedaan antara deklarasi variabel dengan inisialisasi variabel dalam Go?",
      options: [
        "Tidak ada perbedaan",
        "Deklarasi adalah membuat variabel, sedangkan inisialisasi adalah memberikan nilai awal pada variabel.",
        "Inisialisasi adalah membuat variabel, sedangkan deklarasi adalah memberikan nilai awal pada variabel.",
        "Deklarasi adalah memberikan nilai awal pada variabel, sedangkan inisialisasi adalah membuat variabel.",
      ],
      answer:
        "Deklarasi adalah membuat variabel, sedangkan inisialisasi adalah memberikan nilai awal pada variabel.",
      isCode: false,
    },
    {
      id: 4,
      question: "Tipe data float64 digunakan untuk menyimpan?",
      options: ["Angka bulat", "Karakter", "Angka pecahan", "Teks"],
      answer: "Angka pecahan",
      isCode: false,
    },
    {
      id: 5,
      question: "Apa hasil dari operasi 3 % 2 dalam Go?",
      options: ["1", "1.5", "2", "0"],
      answer: "1",
      isCode: false,
    },
    {
      id: 6,
      question: "Apa perbedaan antara operator == dan = dalam Go?",
      options: [
        "== adalah operator perbandingan, sedangkan = adalah operator assignment.",
        "== adalah operator assignment, sedangkan = adalah operator perbandingan.",
        "Keduanya adalah operator perbandingan dengan fungsi yang sama.",
        "Keduanya adalah operator assignment dengan fungsi yang sama.",
      ],
      answer:
        "== adalah operator perbandingan, sedangkan = adalah operator assignment.",
      isCode: false,
    },
    {
      id: 7,
      question:
        "Apa yang akan dilakukan oleh pernyataan if jika kondisi bernilai false?",
      options: [
        "Menjalankan blok kode di dalamnya",
        "Melewati blok kode dan melanjutkan ke pernyataan berikutnya",
        "Menghentikan program",
        "Mencetak pesan kesalahan",
      ],
      answer: "Melewati blok kode dan melanjutkan ke pernyataan berikutnya",
      isCode: false,
    },
    {
      id: 8,
      question: "Apa itu pernyataan else if dalam Go?",
      options: [
        "Pernyataan untuk mengeksekusi blok kode jika kondisi pertama bernilai true",
        "Pernyataan untuk mengeksekusi blok kode jika kondisi pertama bernilai false dan kondisi kedua bernilai true",
        "Pernyataan untuk mengeksekusi blok kode jika kondisi pertama dan kedua bernilai true",
        "Pernyataan untuk mengeksekusi blok kode jika kondisi pertama dan kedua bernilai false",
      ],
      answer:
        "Pernyataan untuk mengeksekusi blok kode jika kondisi pertama bernilai false dan kondisi kedua bernilai true",
      isCode: false,
    },
    {
      id: 9,
      question: "Apa hasil dari pernyataan for i := 0; i < 5; i++ dalam Go?",
      options: [
        "0, 1, 2, 3, 4",
        "1, 2, 3, 4, 5",
        "5, 4, 3, 2, 1",
        "4, 3, 2, 1, 0",
      ],
      answer: "0, 1, 2, 3, 4",
      isCode: false,
    },
    {
      id: 10,
      question: "Apa fungsi dari pernyataan break dalam Go?",
      options: [
        "Menghentikan program secara keseluruhan",
        "Menghentikan iterasi loop saat ini",
        "Melanjutkan ke iterasi berikutnya dalam loop",
        "Tidak melakukan apa-apa",
      ],
      answer: "Menghentikan iterasi loop saat ini",
      isCode: false,
    },
    {
      id: 11,
      question: "Apa perbedaan utama antara array dan slice dalam Go?",
      options: [
        "Array memiliki panjang tetap, sedangkan slice dapat tumbuh dan menyusut.",
        "Array dapat mengandung tipe data campuran, sedangkan slice hanya dapat mengandung tipe data tunggal.",
        "Array hanya dapat digunakan untuk tipe data numerik, sedangkan slice dapat digunakan untuk tipe data apa saja.",
        "Array bersifat dinamis, sedangkan slice bersifat statis.",
      ],
      answer:
        "Array memiliki panjang tetap, sedangkan slice dapat tumbuh dan menyusut.",
      isCode: false,
    },
    {
      id: 12,
      question: "Apa itu map dalam Go?",
      options: [
        "Tipe data untuk menyimpan kumpulan data dengan indeks numerik",
        "Tipe data untuk menyimpan pasangan kunci-nilai",
        "Tipe data untuk menyimpan data dalam urutan terurut",
        "Tipe data untuk menyimpan data yang tidak memiliki urutan tertentu",
      ],
      answer: "Tipe data untuk menyimpan pasangan kunci-nilai",
      isCode: false,
    },
    {
      id: 13,
      question:
        "Bagaimana cara mengembalikan nilai dari sebuah fungsi dalam Go?",
      options: [
        "Dengan menggunakan pernyataan return",
        "Dengan menggunakan pernyataan break",
        "Dengan menggunakan pernyataan yield",
        "Dengan menggunakan pernyataan continue",
      ],
      answer: "Dengan menggunakan pernyataan return",
      isCode: false,
    },
    {
      id: 14,
      question:
        "Sebuah program Go memiliki slice siswa, var siswa = []string{udin, malik, lana, wahyu, yanti}. Diketahui slice siswa dari program diatas adalah udin, malik, lana, wahu, dan yanti. Untuk menambahkan siswa baru bernama lisa pada irisan siswa dapat menggunakan fungsi dari?",
      options: ["append", "copy", "return", "add"],
      answer: "append",
      isCode: false,
    },
    {
      id: 15,
      question:
        "Deklarasi multi variabel memungkinkan untuk memuat banyak data secara bersamaan. Tentukan tipe data dari deklarasi berikut var x, y, z = 12, 1.6, “Lebar”?",
      options: [
        "x string, y int, z boolean",
        "x float, y string, z byte",
        "x string, y string, z string",
        "x int, y float, z string",
      ],
      answer: "x int, y float, z string",
      isCode: false,
    },
    {
      id: 16,
      question:
        "Berikut ini merupakan jenis-jenis operator pada Go, kecuali...",
      options: ["+", "/", "%", "$"],
      answer: "$",
      isCode: false,
    },
    {
      id: 17,
      question: "Apa fungsi “%d” pada fmt.Printf",
      options: [
        "Untuk menampilkan nilai tipe data integer",
        "Untuk menampilkan nilai tipe data string",
        "Untuk menampilkan nilai Boolean",
        "Tidak ada dipilihan",
      ],
      answer: "Untuk menampilkan nilai tipe data integer",
      isCode: false,
    },
    {
      id: 18,
      question: "Bentuk umum dari pernyataan perulangan for adalah...",
      options: [
        "for (kondisi; increment_atau_decrement) nilai_awal;",
        "for (increment_atau_decrement;kondisi) pernyataan;",
        "for (Inisialisasi awal; kondisi; post - statement)",
        "for (nilai_awal; kondisi; increment_atau_decrement) pernyataan;",
      ],
      answer: "for (Inisialisasi awal; kondisi; post - statement)",
      isCode: false,
    },
    {
      id: 19,
      question:
        "Di bawah ini merupakan tipe data yang ada pada pemrograman Go, kecuali",
      options: ["byte", "struct", "float", "double"],
      answer: "double",
      isCode: false,
    },
    {
      id: 20,
      question:
        "Apa yang terjadi ketika kita tidak mendefinisikan kondisi pada sebuah looping?",
      options: [
        "Infinity looping",
        "Looping tidak akan berjalan",
        "Looping akan berjalan satu kali setelah itu akan muncul error",
        "Looping akan dilewati",
      ],
      answer: "Infinity looping",
      isCode: false,
    },
  ],
}
