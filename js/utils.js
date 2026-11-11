//others shared functions

export async function timeOutTest(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("using set timeout fn to " + milliseconds + " ms");
      resolve();
    }, milliseconds);
  });
}
