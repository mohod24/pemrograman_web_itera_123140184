from abc import ABC, abstractmethod

class LibraryItem(ABC):
    """
    Abstract Base Class: Kerangka dasar untuk item perpustakaan.
    """
    def __init__(self, item_id, title):
        self._item_id = item_id
        self._title = title

    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, new_title):
        if new_title:
            self._title = new_title
        else:
            print("Judul tidak boleh kosong!")

    @property
    def item_id(self):
        return self._item_id

    @abstractmethod
    def get_details(self):
        pass