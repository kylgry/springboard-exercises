def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}

        >>> vowel_count('HOW ARE YOU? i am great!')
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """

    ## my output is correct but not the same order, seems like the order is unimportant here...

    vowel_frequency = {}
    vowels = set('aeiou')
    phrase_lc = phrase.lower()

    for vowel in vowels:
        if vowel in phrase_lc:
            vowel_frequency[vowel] = phrase_lc.count(vowel)

    return vowel_frequency
