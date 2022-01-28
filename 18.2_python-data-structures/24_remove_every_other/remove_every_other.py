def remove_every_other(lst):
    """Return a new list of other item.

        >>> lst = [1, 2, 3, 4, 5]

        >>> remove_every_other(lst)
        [1, 3, 5]

    This should return a list, not mutate the original:

        >>> lst
        [1, 2, 3, 4, 5]
    """

    i = 0
    new_lst = []

    while i < len(lst):
        new_lst.append(lst[i])
        i = i+2

    return new_lst
