import os
# Import modul-modul yang sudah kita pecah tadi
from modules.items import Book, Magazine
from modules.library import Library

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def main():
    # Inisialisasi Library
    my_library = Library()
    
    while True:
        print("\n" + "="*41)
        print(" SISTEM MANAJEMEN PERPUSTAKAAN SEDERHANA")
        print("       Alief Athallah - 123140184")
        print("="*41)
        print("1. Tambah Buku")
        print("2. Tambah Majalah")
        print("3. Lihat Semua Koleksi")
        print("4. Cari Item")
        print("5. Keluar")
        
        choice = input("\nPilih menu (1-5): ")

        if choice == '1':
            uid = input("Masukkan ID Buku: ")
            title = input("Masukkan Judul Buku: ")
            author = input("Masukkan Nama Penulis: ")
            isbn = input("Masukkan ISBN: ")
            # Membuat objek Book
            book = Book(uid, title, author, isbn)
            my_library.add_item(book)

        elif choice == '2':
            uid = input("Masukkan ID Majalah: ")
            title = input("Masukkan Judul Majalah: ")
            issue = input("Masukkan Edisi: ")
            month = input("Masukkan Bulan: ")
            # Membuat objek Magazine
            magazine = Magazine(uid, title, issue, month)
            my_library.add_item(magazine)

        elif choice == '3':
            my_library.show_items()

        elif choice == '4':
            keyword = input("Cari (Judul/ID): ")
            my_library.search_item(keyword)

        elif choice == '5':
            print("Program Selesai.")
            break
        else:
            print("Input tidak valid.")

if __name__ == "__main__":
    main()