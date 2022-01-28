def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """

    out = phrase[0].upper()
    i = 1

    while i < len(phrase):
        if phrase[i-1] == ' ':
            out += phrase[i].upper()
        else:
            out += phrase[i].lower()
        i += 1
        
    return out
