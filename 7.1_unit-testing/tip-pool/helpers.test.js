describe("helpers", function() {
  beforeEach(function () {

  });

  it('should sum total of given type', function () {
    allPayments = {
      payment1: {
        billAmt: '1000',
        tipAmt: '400',
        tipPercent: '40'
      }
    }
    expect(sumPaymentTotal('billAmt')).toEqual(1000);
    expect(sumPaymentTotal('tipAmt')).toEqual(400);
    expect(sumPaymentTotal('tipPercent')).toEqual(40);
  });

  it('should calculate tip percentage',function () {
    expect(calculateTipPercent('1000','100')).toEqual(10);
  });

  it('should append a td',function () {
    const newTr = document.createElement('tr');
    appendTd(newTr,'new tr');
    expect(newTr.children[0].innerText).toEqual('new tr');
  });


  afterEach(function() {
    allPayments = {};
  });
});
