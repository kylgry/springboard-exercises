const express = require('express');

const app = express();

app.get('/mean', function(req, res) {
  const nums = validRequest(req,res);
  return res.json({operation: "mean", value: mean(nums)});
});


app.get('/median', function(req, res) {
  const nums = validRequest(req,res);
  return res.json({operation: "median", value: median(nums)});
});


app.get('/mode', function(req, res) {
  const nums = validRequest(req, res);
  return res.json({operation: "mode", value: mode(nums)})
});


function validRequest(req, res) {
  if (!(req.query.nums)) return res.status(400)
  .json('Error: request must be in the form ?nums=1,2...');
  const nums = req.query.nums.split(',').map(Number);
  if (nums.some((a) => isNaN(a))) return res.status(400)
  .json('Error: one more numbers is invalid!')
  nums.sort(function(a, b) {return a - b});
  return nums;
}

function mean(nums) {
  return nums.reduce((a,b)=>a+b)/nums.length
}

function median(nums) {
  if (nums.length % 2 == 0) { return (nums[nums.length/2-1]+nums[nums.length/2])/2 }
  else if (nums.length % 2 == 1) { return nums[Math.floor(nums.length/2)] }
}

function mode(nums) {
  const modes = {};
  for (const num of nums) { modes[num] = modes[num] ? modes[num] + 1 : 1 };
  return Object.keys(modes).reduce((a, b) => modes[a] > modes[b] ? a : b);
}

app.listen(3000, function () {
  console.log('App running on port 3000');
})

module.exports = {mean, median, mode};
