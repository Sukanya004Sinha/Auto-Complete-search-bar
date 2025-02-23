let counter = 0;

const getData = () => {
  //  calls an API and gets Data
  console.log("Fetching Data....", counter++);
}

const deBounce = function (fn, d){
  let timer;
  return function () {
    let context = this,
    args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args); // Pass the arguments to the function
    }, d)
  }
}

const betterFunction = deBounce(getData, 900);  // Create the debounced version
