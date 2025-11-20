from .base import LibraryItem  # Import class induk dari file base.py

class Book(LibraryItem):
    def __init__(self, item_id, title, author, isbn):
        super().__init__(item_id, title)
        self.__author = author
        self.__isbn = isbn

    def get_details(self):
        return (f"[Buku] ID: {self._item_id} | Judul: {self._title} | "
                f"Penulis: {self.__author} | ISBN: {self.__isbn}")

class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue, month):
        super().__init__(item_id, title)
        self.__issue = issue
        self.__month = month

    def get_details(self):
        return (f"[Majalah] ID: {self._item_id} | Judul: {self._title} | "
                f"Edisi: {self.__issue} | Bulan: {self.__month}")