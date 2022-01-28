def find_greater_numbers(nums):
    """Return # of times a number is followed by a greater number.

    For example, for [1, 2, 3], the answer is 3:
    - the 1 is followed by the 2 *and* the 3
    - the 2 is followed by the 3

    Examples:

        >>> find_greater_numbers([1, 2, 3])
        3

        >>> find_greater_numbers([6, 1, 2, 7])
        4

        >>> find_greater_numbers([5, 4, 3, 2, 1])
        0

        >>> find_greater_numbers([])
        0
    """

    i = 0
    times = 0
    l = len(nums)

    while i < l - 1:
        j = i + 1
        while j < l:
            if nums[j] > nums[i]:
                #print(str(nums[j])+" is greater than "+str(nums[i]))
                times += 1
            j += 1
        i += 1

    return times
