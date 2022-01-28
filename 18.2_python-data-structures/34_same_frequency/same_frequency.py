def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?

        >>> same_frequency(551122, 221515)
        True

        >>> same_frequency(321142, 3212215)
        False

        >>> same_frequency(1212, 2211)
        True
    """
    list1 = list(str(num1))
    list2 = list(str(num2))
    list1set = set(list1)
    list2set = set(list2)

    if not list1set == list2set:
        return False
    else:
        for val in list1set:
            if not list1.count(val) == list1.count(val):
                return False

    return True
