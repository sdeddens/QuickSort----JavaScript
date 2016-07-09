/*Quicksort implementation using JavaScript; and random pivots;
July 2016 Leap Internship Homework Assignment.
Written by SDeddens

Main function has three arguments and mutably sorts a passed in array (on the first dimension only). 
Parameters passed:

  a: Array to be sorted. If not a valid array do nothing and return.
  s: Starting index (0 based) 
    if ! a number || < 0 || omitted set to 0
    if > a.length-1 set to a.length-1
  e: Ending index 
    if ! a number || => a.length || omitted set to a.length -1
    if < 0 the set to 0
  if s = e, return the original string
  if s < e, sort from low to high else sort from high to low
*/

var a = [9,2,3,7,0,5,8,1,6,4]; // small test sample.
//var a = [9,300,2,3,7,0,5,8,1,6,4,9,2,3,7,0,5,8,1,6,4,100];
//var a = [9,300,2,3,7,0,5,8,1,6,4,9,2,3,7,0,5,8,1,6,4,100,9,300,2,3,7,0,5,8,1,6,4,9,2,3,7,0,5,8,1,6,4,100,9,300,2,3,7,0,5,8,1,6,4,9,2,3,7,0,5,8,1,6,4,100,9,300,2,3,7,0,5,8,1,6,4,9,2,3,7,0,5,8,1,6,4,100];

function quickSort(aIn, sIn, eIn){

//if aIn is not an array then die and return quietly.
  if (!Array.isArray(aIn)) return;
  let a = aIn;

  let s = sIn || 0; // if falsy, ie; 0, Null, false, an object; set to 0;
  if (typeof s != "number" || s < 0 ) {
    s = 0;
  } else if (s > a.length-1) s = a.length-1;
  s = Math.floor(s); // make sure it is an integer else we will crash for sure! 

  if (eIn === 0) { // trap falsy 0;
    e = 0;
  } else {
    let e = eIn || a.length-1;
  };
  if (typeof e != "number" || e > a.length-1 ) {
    e = a.length-1;
  console.log ("e: ",e);
  } else if (e < 0) e = 0;
  e = Math.floor(e); // make sure it is an integer else we will crash for sure! 

  let iterations = 0;

  function sortOnPivot(s, e) {

    if (e == s) return; // obviously nothing to sort so we can just return but, it
    // is important to note that this is a necessary because if both = 0 then 
    // recursion will grab the other side and sort the entire array!

    ++iterations;
    let i;
    let moveMe;

    let p = s + Math.floor(Math.random() * (e - s  + (e >= s ? 1 : -1)));

    function moveValueToRightOfPivot() {
      // value is left of the pivot; move value to the right side of the pivot
      moveMe  = a[i];  // save off the value we want to move
      a[i]    = a[p-1];
      a[p-1]  = a[p];
      a[p]    = moveMe;
      --p;    // move the pivot left one space
      --i;    // re-index i, we need to evaluate the value we just swapped in.;
    };

    function moveValueToLeftOfPivot() {
      // value is right of the pivot; move value to the left side of the pivot
      moveMe  = a[i];  // save off the value we want to move
      a[i]    = a[p+1];
      a[p+1]  = a[p];
      a[p]    = moveMe;
      ++p;    // move the pivot right one space
              // do not look at a[i] again...
              // it has already been evaluated or it is the pivot.
    };

    console.log("aStart: ", a, " s: ", s, " e: ", e, " pStart: ", p);
    if (s < e) {

      for (i=s; i<=e; ++i) { // walk across the range
        if (i < p && a[i] > a[p]) {
          moveValueToRightOfPivot();
        } else if (i > p && a[i] < a[p]) {
          moveValueToLeftOfPivot();
        };
      };
      console.log("  aEnd: ", a, " s: ", s, " e: ", e, "   pEnd: ", p, "iteration: ", iterations);
      if (p > s) sortOnPivot(s, p-1); // do the left side
      if (p < e) sortOnPivot(p+1, e); // do the right side

    } else { // we need to invert the sort.

      for (i=e; i<=s; ++i) { // walk across the range
        if (i < p && a[i] < a[p]) {
          moveValueToRightOfPivot();
        } else if (i > p && a[i] > a[p]) {
          moveValueToLeftOfPivot();
        };
      };
      console.log("  aEnd: ", a, " s: ", s, " e: ", e, "   pEnd: ", p, "iteration: ", iterations);
      if (p < s) sortOnPivot(s, p+1); // do the left side
      if (p > e) sortOnPivot(p-1, e); // do the right side

    };
  };

  sortOnPivot(s, e); // start with the whole array

};

quickSort(a, 0, 9); 