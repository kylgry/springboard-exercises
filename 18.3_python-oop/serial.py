"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        self.start = start
        self.sn = self.start-1

    def generate(self):
        "increments serial number by one and returns value"
        self.sn+=1
        return self.sn

    def reset(self):
        "resets generator to start"
        self.sn = self.start-1
