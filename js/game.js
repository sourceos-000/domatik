// Mengambil elemen dengan class 'pemain1'
var pemain1Div = document.querySelector(".pemain1");
var nilaiDiv = document.querySelector(".nilaiKartu");
// Menyembunyikan elemen dengan mengatur style display menjadi 'none'
if (pemain1Div) {
  pemain1Div.style.display = "none";
  nilaiDiv.style.display = "none";
}

const mulai = document.querySelector(".mulai");
mulai.addEventListener("click", function () {
  mulai.style.display = "none";
  // bagian pertama : memunculkan kartu tiap tiap pemain ketika halaman pertamakali dimuat
  // memanggil element html
  const kartu = document.querySelector(".kartu");
  const pemain1 = document.querySelector(".pemain1");
  // audio
  const benar = new Audio();
  benar.src = "assets/audio/benar.mp3";
  const salah = new Audio();
  salah.src = "assets/audio/salah.mp3";
  const playing = new Audio();
  playing.src = "assets/audio/playing.mp3";
  playing.loop = true;
  const menangis = new Audio();
  menangis.src = "assets/audio/menang.mp3";

  playing.play();

  //variable data kartu
  const dataKartu = {
    kartu0: { kiri: 1, kanan: 1, nilai: 25 },
    kartu1: { kiri: 1, kanan: 1, nilai: 1 },
    kartu2: { kiri: 1, kanan: 1, nilai: 2 },
    kartu3: { kiri: 1, kanan: 1, nilai: 3 },
    kartu4: { kiri: 1, kanan: 1, nilai: 4 },
    kartu5: { kiri: 1, kanan: 1, nilai: 5 },
    kartu6: { kiri: 1, kanan: 1, nilai: 6 },
    kartu7: { kiri: 1, kanan: 1, nilai: 2 },
    kartu8: { kiri: 1, kanan: 1, nilai: 3 },
    kartu9: { kiri: 1, kanan: 1, nilai: 4 },
    kartu10: { kiri: 1, kanan: 1, nilai: 5 },
    kartu11: { kiri: 1, kanan: 1, nilai: 6 },
  };

  // masukkan kartu ke data kartu
  for (let i = 0; i < 12; i++) {
    const kartu = document.createElement("img");

    kartu.setAttribute("src", `assets/gambar/kartu/${i}.png`);
    kartu.setAttribute("id", "kartu" + i);
    kartu.setAttribute("draggable", "true");
    kartu.addEventListener("drag", pilihKartu);
    dataKartu[`kartu${i}`]["info"] = kartu;
  }

  // variable untuk kota kartu dengan kartu yang telah diacak
  const kotakKartu = Object.keys(dataKartu).filter(key => key !== "kartu0").sort(() => Math.random() - 0.5);

  // variable untuk menampung kartu para pemain
  const kartuPemain1 = {};

  //masukan kartu untuk tiap tiap pemain
  for (let i = 0; i < 11; i++) {
    if (Object.keys(kartuPemain1).length < 11) {
      kartuPemain1[kotakKartu[0]] = dataKartu[kotakKartu[0]].info;
      kartu.appendChild(dataKartu[kotakKartu[0]].info);
      kotakKartu.splice(0, 1);
    }
  }

  // bagian kedua: menampilkan kartu pilihan pemain ke papan

  // mengambil id papan
  const papan = document.getElementById("papan");
  const context = papan.getContext("2d");
  papan.width = 1092;
  papan.height = 450;

  papan.addEventListener("dragover", dragOver);
  papan.addEventListener("drop", lemparKartu);
  // variable global untuk menampung kartu pilihan pemain
  let kartuPilihanPemain;

  // variable untuk posisi kartu
  const sumbuX = 77;
  const sumbuY = 132;
  const lebar = 80;
  const tinggi = 120;

  // function untuk rotasi kartu
  function rotasiKartu(gambar, sumbuX, sumbuY, lebar, tinggi, rotasi) {
    let radian = (rotasi * Math.PI) / 180;
    context.translate(sumbuX + lebar / 2, sumbuY + tinggi / 2);
    context.rotate(radian);
    context.drawImage(
      gambar,
      (lebar / 2) * -1,
      (tinggi / 2) * -1,
      lebar,
      tinggi
    );
    context.rotate(radian * -1);
    context.translate((sumbuX + lebar / 2) * -1, (sumbuY + tinggi / 2) * -1);
  }

  // function pilih kartu
  function pilihKartu(e) {
    kartuPilihanPemain = e.target.id;
    console.log(kartuPilihanPemain);
    console.log(xKanan.length);
  }

  // function dragOver
  function dragOver(e) {
    e.preventDefault();
    console.log(e.offsetX);
  }

  // bantuan untuk pengali sumbu x dan y
  const xKiri = [];
  const xKanan = [];

  // untuk nilai kartu di papan
  const nilaiKiriPapan = document.querySelector(".nilaiKiri");
  const nilaiKananPapan = document.querySelector(".nilaiKanan");
  const jarakAntarKartu = 25;

  const kartuUrutanBenar = [
    "kartu0",
    "kartu1",
    "kartu2",
    "kartu3",
    "kartu4",
    "kartu5",
    "kartu6",
    "kartu7",
    "kartu8",
    "kartu9",
    "kartu10",
    "kartu11",
  ]; // Urutan yang benar
  let urutanKartuDiPapan = ["kartu0"]; // Untuk menyimpan urutan kartu yang sudah diletakkan

  // Menampilkan kartu pertama di canvas
  const gambarPertama = new Image();
  gambarPertama.src = `assets/gambar/kartu/0.png`; // Pastikan path dan file tepat
  gambarPertama.onload = function () {
    rotasiKartu(gambarPertama, sumbuX, sumbuY + 150, lebar, tinggi, 0);
  };

  //function drop, atau jika kartu yang berada di atas papan dilepas
  function lemparKartu(e) {
    const gambar = dataKartu[kartuPilihanPemain].info;

   
    // cek posisi offset kartu
    if (e.offsetX < 1000) {
      // turn ke dua dan selanjutnya
      // cek pertama, nilai kartu kiri di papan dengan kartu kiri pemain
      if (kartuPilihanPemain === kartuUrutanBenar[urutanKartuDiPapan.length]) {

        urutanKartuDiPapan.push(kartuPilihanPemain);
        xKanan.push(gambar);
        //cek pengali kiri
        if (xKanan.length < 2) {
          const posisiY =
            sumbuY + 150 - xKanan.length * (tinggi + jarakAntarKartu);
          rotasiKartu(
            gambar,
            sumbuX, // Posisi X untuk kartu ke-3
            posisiY, // Posisi Y untuk kartu ke-3
            lebar,
            tinggi,
            0 // Rotasi 180 derajat
          );
        } else if (xKanan.length < 8) {
          console.log(tinggi + jarakAntarKartu);
          const posisiX =
            141 + (xKanan.length - 2) * (tinggi + jarakAntarKartu); // Menghitung posisi X dengan gap 25px
          const posisiY = sumbuY - 124; // Posisi Y yang sama untuk semua kartu ke-4 hingga ke-7
          rotasiKartu(
            gambar,
            posisiX,
            posisiY,
            lebar,
            tinggi,
            90 // Rotasi normal
          );
        } else if (xKanan.length < 10) {
          const kartuKe = xKanan.length; // Indeks kartu yang sedang diposisikan
          // Menghitung posisi X dengan gap 25px
          const posisiY = sumbuY + (kartuKe - 8) * (tinggi + jarakAntarKartu);
          rotasiKartu(
            gambar,
            934, // Posisi X untuk kartu ke-3
            posisiY + 7, // Posisi Y untuk kartu ke-3
            lebar,
            tinggi,
            0 // Rotasi 180 derajat
          );
        } else if (xKanan.length < 12) {
          const kartuKe = xKanan.length; // Indeks kartu yang sedang diposisikan
          // Menghitung posisi X dengan gap 25px
          const posisiX = 807 - (kartuKe - 10) * (tinggi + jarakAntarKartu);
          rotasiKartu(
            gambar,
            posisiX, // Posisi X untuk kartu ke-3
            sumbuY + 185, // Posisi Y untuk kartu ke-3
            lebar,
            tinggi,
            270 // Rotasi 180 derajat
          );
        }
        benar.play();
        // hilangkan kartu yang dibuang pemain
        kartuPemain1[kartuPilihanPemain].style.display = "none";
        delete kartuPemain1[kartuPilihanPemain];

        menang();
        return;
      } else {
        salah.play();
        alert("Kamu memasukkan kartu yang salah");
      }
      // cek kedua, nilai kartu kiri di papan dengan kartu kanan pemain
    }
  }

  // bagian ke-tiga
  //button html
  const btnP4 = document.querySelector("#btnP4");
  const btnP1 = document.querySelector("#btnP1");
  const btnP2 = document.querySelector("#btnP2");

  //button untuk lewat
  pemain1.children[2].addEventListener("click", function () {
    //cek status pemain
    if (pemain1.children[0].innerHTML === "1") {
      for (let i = 0; i < Object.keys(kartuPemain1).length; i++) {
        kartuPilihanPemain = Object.keys(kartuPemain1)[i];
        // cek pertama
        if (nilaiKiriPapan.innerHTML == dataKartu[kartuPilihanPemain].kiri) {
          break;
        }
        // cek kedua
        else if (
          nilaiKiriPapan.innerHTML == dataKartu[kartuPilihanPemain].kanan
        ) {
          break;
        }
        // cek ketiga
        else if (
          nilaiKananPapan.innerHTML == dataKartu[kartuPilihanPemain].kiri
        ) {
          break;
        }
        // cek keempat
        else if (
          nilaiKananPapan.innerHTML == dataKartu[kartuPilihanPemain].kanan
        ) {
          break;
        }
        // jika tidak ada kartu yang sesuai
        else if (i + 1 == Object.keys(kartuPemain1).length) {
          // ubah status pemain menjadi 0
          pemain1.children[0].innerHTML = "0";
          pemain1.children[0].style.backgroundColor = "red";
          pemain1.children[1].innerHTML = "lewat";
          lewat.play();
          return;
        }
      }
    }
  });

  //kondisi menang
  const modalMenang = document.getElementById("menang");
  function menang() {
    if (Object.keys(kartuPemain1).length == 0) {
      modalMenang.style.display = "block";
      modalMenang.children[1].innerHTML = "Yay!! Kamu berhasil";
      // Hentikan audio latar belakang saat menang
      menangis.play();

      playing.pause();
      playing.currentTime = 0; // Reset audio ke awal
      return;
    }
  }

  // main lagi
  modalMenang.children[2].addEventListener("click", function () {
    window.location.reload();
  });
});
