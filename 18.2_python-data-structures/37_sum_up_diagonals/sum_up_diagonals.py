def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """

    y = 0
    x = 0
    sum = 0

    while y < len(matrix):
        sum += matrix[y][x]
        x += 1
        y += 1

    y = len(matrix) - 1
    x = 0

    while y >= 0:
        sum += matrix[y][x]
        x += 1
        y += -1

    return sum
