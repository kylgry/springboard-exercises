describe("payments", function() {
  beforeEach(function () {
    // initialization logic
    billAmtInput.value = '1000';
    tipAmtInput.value = '300';
    submitPaymentInfo();
  });

  it('should create current payment', function () {
    const payment = {billAmt: '1000',tipAmt: '300',tipPercent: 30};
    billAmtInput.value = '1000';
    tipAmtInput.value = '300';
    expect(createCurPayment()).toEqual(payment);
  });

  it('should add a new payment to allPayments on submitPaymentInfo()', function () {

    expect(Object.keys(allPayments).length).toEqual(1);
    expect(allPayments['payment' + paymentId].billAmt).toEqual('1000');
    expect(allPayments['payment' + paymentId].tipAmt).toEqual('300');
  });

  it('should update payment table on appendPaymentTable()', function () {
    let storedPayments = [];
    let displayedPayments = [];
    const displayedPaymentElements = document.querySelectorAll('#paymentTable tbody tr td');
    for (let i = 0; i < displayedPaymentElements.length; i=i+3) {
      displayedPayments.push([displayedPaymentElements[i].innerText,displayedPaymentElements[i+1].innerText]);
    }
    for (let key in allPayments) {
      let curPayment = allPayments[key];
      storedPayments.push(["$"+curPayment.billAmt,"$"+curPayment.tipAmt]);
    }
    expect(storedPayments).toEqual(displayedPayments);
  });

  it('should update summary on updateSummary()', function () {
    let displayedSummary = [];
    const displayedSummaryElements = document.querySelectorAll("#summaryTable tbody tr td");
    for (element of displayedSummaryElements) {
      displayedSummary.push(element.innerText);
    }
    expect(displayedSummary).toEqual(['$1000','$300','30%']);
  });

  afterEach(function() {
    // teardown logic
    allPayments = {};
    paymentId = 0;
    document.querySelector("#paymentTable tbody").innerHTML = '';
    updateSummary();
  });
});
