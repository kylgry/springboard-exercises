const { BadRequestError } = require("../expressError");

// given data, returns string to follow SET in SQL UPDATE query
// and array of associated values
// jsToSql is object to map js variable names to SQL variable names
// (.e.g, numEmployees --> num_employees)

function sqlForPartialUpdate(dataToUpdate, jsToSql) {

  // extracts keys from input data
  const keys = Object.keys(dataToUpdate);

  // if no keys are extracted, throws an error
  if (keys.length === 0) throw new BadRequestError("No data");

  // creates array of strings for sql query,
  // and maps js variable names to sql variable names if given
  // e.g. {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );


  // returns sql SET strings to single comma separated string
  // and also returns values in an array
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
