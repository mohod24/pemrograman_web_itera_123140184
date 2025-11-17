import os
from tabulate import tabulate

# --- GLOBAL VARIABLE (DATABASE SEMENTARA) ---
# Memenuhi syarat: Minimal 5 data dictionary dalam list
data_mahasiswa = [
    {"nama": "Mohd Musyaffa", "nim": "123140184", "uts": 80, "uas": 85, "tugas": 90},
    {"nama": "Aleif Athallah", "nim": "123140185", "uts": 70, "uas": 75, "tugas": 70},
    {"nama": "Mohod Dohom", "nim": "123140300", "uts": 95, "uas": 90, "tugas": 95},
    {"nama": "Habbi Widagdo", "nim": "123140204", "uts": 60, "uas": 50, "tugas": 60},
    {"nama": "Revolusi Al-Ghifari", "nim": "123140199", "uts": 65, "uas": 40, "tugas": 50},
]

# --- FUNGSI LOGIKA BISNIS ---

def hitung_nilai_akhir(uts, uas, tugas):
    """Menghitung nilai akhir berdasarkan bobot: 30% UTS, 40% UAS, 30% Tugas"""
    return (0.3 * uts) + (0.4 * uas) + (0.3 * tugas)

def tentukan_grade(nilai_akhir):
    """Menentukan grade huruf berdasarkan nilai akhir"""
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

def proses_data_untuk_tabel(data_list):
    """Helper function untuk merapikan data agar siap masuk tabulate"""
    tabel_siap = []
    for mhs in data_list:
        na = hitung_nilai_akhir(mhs['uts'], mhs['uas'], mhs['tugas'])
        grade = tentukan_grade(na)
        tabel_siap.append([
            mhs['nama'], 
            mhs['nim'], 
            mhs['uts'], 
            mhs['uas'], 
            mhs['tugas'], 
            f"{na:.2f}",
            grade
        ])
    return tabel_siap

# --- FUNGSI FITUR UTAMA ---

def tampilkan_data(data=None):
    """Menampilkan data dalam format tabel menggunakan tabulate"""
    target_data = data if data is not None else data_mahasiswa
    
    if not target_data:
        print("\n[!] Data kosong.")
        return

    headers = ["Nama", "NIM", "UTS", "UAS", "Tugas", "Nilai Akhir", "Grade"]
    data_tabel = proses_data_untuk_tabel(target_data)
    
    print("\n=== DAFTAR NILAI MAHASISWA ===")
    print(tabulate(data_tabel, headers=headers, tablefmt="fancy_grid"))

def tambah_mahasiswa():
    """Fitur input data mahasiswa baru"""
    print("\n=== INPUT DATA MAHASISWA ===")
    try:
        nama = input("Masukkan Nama  : ")
        nim = input("Masukkan NIM   : ")
        uts = float(input("Nilai UTS      : "))
        uas = float(input("Nilai UAS      : "))
        tugas = float(input("Nilai Tugas    : "))
        
        data_baru = {
            "nama": nama,
            "nim": nim,
            "uts": uts,
            "uas": uas,
            "tugas": tugas
        }
        data_mahasiswa.append(data_baru)
        print("\n[v] Data berhasil ditambahkan!")
    except ValueError:
        print("\n[x] Error: Nilai harus berupa angka!")

def cari_ekstrem(mode):
    """Mencari mahasiswa dengan nilai tertinggi atau terendah"""
    if not data_mahasiswa:
        print("Data kosong.")
        return

    # Menggunakan lambda function untuk sort key
    # Sort berdasarkan nilai akhir hasil hitungan on-the-fly
    data_sorted = sorted(
        data_mahasiswa, 
        key=lambda x: hitung_nilai_akhir(x['uts'], x['uas'], x['tugas']),
        reverse=(mode == 'tertinggi')
    )
    
    # Ambil urutan pertama setelah disortir
    mhs = data_sorted[0]
    na = hitung_nilai_akhir(mhs['uts'], mhs['uas'], mhs['tugas'])
    
    print(f"\n=== Mahasiswa Nilai {mode.upper()} ===")
    print(f"Nama  : {mhs['nama']}")
    print(f"Nilai : {na:.2f} (Grade {tentukan_grade(na)})")

def filter_by_grade():
    """Fitur tambahan: Filter mahasiswa berdasarkan grade"""
    target = input("\nMasukkan Grade yang dicari (A/B/C/D/E): ").upper()
    
    hasil_filter = []
    for mhs in data_mahasiswa:
        na = hitung_nilai_akhir(mhs['uts'], mhs['uas'], mhs['tugas'])
        grade = tentukan_grade(na)
        if grade == target:
            hasil_filter.append(mhs)
            
    if hasil_filter:
        tampilkan_data(hasil_filter)
    else:
        print(f"\n[!] Tidak ada mahasiswa dengan grade {target}")

def info_kelas():
    """Fitur tambahan: Hitung rata-rata kelas"""
    if not data_mahasiswa:
        return
    
    total_nilai = 0
    for mhs in data_mahasiswa:
        total_nilai += hitung_nilai_akhir(mhs['uts'], mhs['uas'], mhs['tugas'])
    
    rata_rata = total_nilai / len(data_mahasiswa)
    print(f"\n[i] Rata-rata Nilai Akhir Kelas: {rata_rata:.2f}")

# --- MENU UTAMA (INTERFACE) ---

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def main():
    while True:
        print("\n=== APLIKASI PENGELOLAAN NILAI ===")
        print("1. Tampilkan Semua Data")
        print("2. Tambah Data Mahasiswa")
        print("3. Cari Nilai Tertinggi")
        print("4. Cari Nilai Terendah")
        print("5. Filter Berdasarkan Grade")
        print("6. Info Rata-rata Kelas")
        print("0. Keluar")
        
        pilihan = input("Pilih menu (0-6): ")
        
        if pilihan == '1':
            tampilkan_data()
        elif pilihan == '2':
            tambah_mahasiswa()
        elif pilihan == '3':
            cari_ekstrem('tertinggi')
        elif pilihan == '4':
            cari_ekstrem('terendah')
        elif pilihan == '5':
            filter_by_grade()
        elif pilihan == '6':
            info_kelas()
        elif pilihan == '0':
            print("Terima kasih!")
            break
        else:
            print("Pilihan tidak valid.")
        
        input("\nTekan Enter untuk kembali ke menu..")
        clear_screen()

if __name__ == "__main__":
    main()