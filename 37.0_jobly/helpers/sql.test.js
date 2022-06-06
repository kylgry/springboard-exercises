
const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
  test("transforms data successfully", function () {
    const data = {
        name: "General Electric",
        description: "Just another company",
        numEmployees: 10 }
    const jsToSql = { numEmployees: "num_employees" }
    const out = sqlForPartialUpdate(data, jsToSql)
    const expected_out = {
      setCols: `\"name\"=$1, \"description\"=$2, \"num_employees\"=$3`,
      values: ["General Electric", "Just another company", 10]
    }
    expect(out).toEqual(expected_out);
  });


});
