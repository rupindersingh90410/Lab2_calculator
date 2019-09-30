const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

function validate(method, x, y) {
  const methodTypes = ['add', 'subtract', 'multiply', 'divide'];
  if (!methodTypes.includes(method) || !Number(x) || !Number(y)) {
    return false;
  }
  return true;
}

function calculate(method, x, y) {
  const intX = Number(x);
  const intY = Number(y);

  switch (method) {
    case 'add':
      return { methodSymbol: '+', result: intX + intY };
    case 'subtract':
      return { methodSymbol: '-', result: intX - intY };
    case 'multiply':
      return { methodSymbol: '*', result: intX * intY };
    case 'divide':
      return { methodSymbol: '/', result: intX / intY };
    default:
      return false;
  }
}

app.get('/:method/:x/:y', (req, res) => {
  const { method, x, y } = req.params;
  // validate method variable
  if (validate(method, x, y)) {
    // then call calculte function
    const { methodSymbol, result } = calculate(method, x, y);
    // res.send(`${x} ${methodSymbol} ${y} = ${result}`);
    res.render('calculate', { methodSymbol, result, x, y });
  } else {
    res.render('error');
  }
});

app.listen(3000, () => console.log('Server listening at port 3000'));
