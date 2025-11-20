from .base import LibraryItem # Type hinting

class Library:
    def __init__(self):
        # Encapsulation: List private
        self.__items = []

    def add_item(self, item: LibraryItem):
        self.__items.append(item)
        print(f"\n[Sukses] Berhasil menambahkan: {item.title}")

    def show_items(self):
        print("\n--- Daftar Koleksi Perpustakaan ---")
        if not self.__items:
            print("Koleksi masih kosong.")
        else:
            for item in self.__items:
                # Polymorphism berjalan di sini
                print(item.get_details())

    def search_item(self, keyword):
        print(f"\n--- Hasil Pencarian: '{keyword}' ---")
        found = False
        for item in self.__items:
            if (keyword.lower() in item.title.lower()) or (keyword == item.item_id):
                print(item.get_details())
                found = True
        
        if not found:
            print("Item tidak ditemukan.")