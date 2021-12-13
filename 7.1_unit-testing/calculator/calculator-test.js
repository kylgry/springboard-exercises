
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({amount:300000,years:30,rate:3})).toEqual("1264.81");
  expect(calculateMonthlyPayment({amount:100000,years:10,rate:1})).toEqual("876.04");
  expect(calculateMonthlyPayment({amount:200000,years:20,rate:2})).toEqual("1011.77");
});


it("should return a result with 2 decimal places", function() {
  const payment = calculateMonthlyPayment({amount:200000,years:20,rate:2});
  const decimals = ((payment.split('.')[1]) || [0]).length;
  expect(decimals).toEqual(2);
});

/// etc
