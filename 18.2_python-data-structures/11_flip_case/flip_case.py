def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """

    new_str = ""
    upper = to_swap.upper()
    lower = to_swap.lower()

    for letter in phrase :
        if letter == upper :
            new_str += lower
        elif letter == lower :
            new_str += upper
        else :
            new_str += letter

    return new_str
