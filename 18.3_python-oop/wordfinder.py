"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:

    def __init__(self,file):
        """initializes object and creates wordlist"""
        self.file = file
        self.wordlist = []
        self.importfromfile()
        self.numwords = len(self.wordlist)

    def importfromfile(self):
        """reads text file into wordlist"""
        with open(self.file, "r") as file:
            for line in file:
                self.wordlist.append(line[:-1])

    def random(self):
        """returns a random word from wordlist"""
        return self.wordlist[random.randint(0,self.numwords)]

class SpecialWordFinder(WordFinder):

    def __init__(self, file):
        """inherits wordlist from parent and cleans list"""
        super().__init__(file)
        self.wordlist = self.remove_spaces_and_hashes()

    def remove_spaces_and_hashes(self):
        """returns wordlist stripped of spaces and lines beginning with #"""
        new_wordlist = []
        for word in self.wordlist:
            if word != '' and word[0] != "#":
                new_wordlist.append(word)
        return new_wordlist
