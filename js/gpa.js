// listen for form Submit
document.getElementById('gpaForm').addEventListener('submit', addClass);

function addClass(e) {
  let courseName = document.getElementById('courseName').value;
  let creditHours = document.getElementById('creditHours').value;
  let gradeLetter = document.getElementById('gradeLetter').value;

  if (!validateForm(courseName)) {
    return false;
  }

  let gpa = getClassGpaFromLetter(gradeLetter);

  let course = {
    className: courseName,
    hours: creditHours,
    letter: gradeLetter,
    grade: gpa,
    colour: getColorFromGpa(gpa),
  };

  //test if localStorage is null
  if (localStorage.getItem('classes') === null) {
    //initialize array
    let classes = [];

    //add and set classId
    course.classId = 'c' + 0;

    //add to array
    classes.push(course);

    //set to local storage
    localStorage.setItem('classes', JSON.stringify(classes));
  }else {

    //fetch classes from local local storage
    let classes = JSON.parse(localStorage.getItem('classes'));

    //add and set classId
    course.classId = 'c' + classes.length;

    //add course to array
    classes.push(course);

    //re-set back to local storage
    localStorage.setItem('classes', JSON.stringify(classes));

  }

  //clear form
  document.getElementById('gpaForm').reset();

  fetchClasses();

  //prevent form from submitting
  e.preventDefault();
}

//fetch classes
function fetchClasses() {//start fetchClasses
  let classes = JSON.parse(localStorage.getItem('classes'));

  //get output ID
  let courseContainer = document.getElementById('courseContainer');

  //Build output
  courseContainer.innerHTML = '';

  for (let i = 0; i < classes.length; i++) {//start for
    let className = classes[i].className;
    let letter = classes[i].letter;
    let num = classes[i].grade;
    let colour = classes[i].colour;
    let id = classes[i].classId;

    courseContainer.innerHTML += '<div class="course">' +
                                  '<h3>' +
                                  className + ': &nbsp;' +
                                  ' <span style="color:' + colour + '"">' + letter + '</span>' +
                                  ' <span style="color:' + colour + '"">' + num + '</span>' +
                                  '<a onClick="deleteClass(\'' + id +
                                  '\')" class="btn btn-danger" href="">remove</a>' +
                                  '</h3>' +
                                  '<hr>' +
                                  '</div>';
  }//end for

  calculateGpa();
}//end fetchClasses

function deleteClass(idNum) {
  let classes = JSON.parse(localStorage.getItem('classes'));

  //remove specified class
  for (let i = 0; i < classes.length; i++) {
    if (classes[i].classId == idNum) {
      classes.splice(i, 1);
    }
  }

  //reset the localStorage
  localStorage.setItem('classes', JSON.stringify(classes));

  //refetch the classes
  fetchClasses();
}

function calculateGpa() {
  let x = 0;
  let y = 0;
  let overAllGPA = 0;

  let classes = JSON.parse(localStorage.getItem('classes'));

  if (classes[0] !== undefined) {
    for (let i = 0; i < classes.length; i++) {
      let tempH = parseFloat(classes[i].hours);
      y += tempH;
      x += parseFloat(classes[i].grade) * tempH;
    }

    overAllGPA = x / y;
    document.getElementById('your-gpa').innerHTML = overAllGPA.toFixed(3);
    document.getElementById('form-box').style.backgroundColor = getColorFromGpa(overAllGPA);
  }
}

function getClassGpaFromLetter(gpaLetter) {
  let letterGradeTable = {
    'A+': 4.5,
    A: 4.25,
    'A-': 4.0,
    'B+': 3.5,
    B: 3.0,
    'C+': 2.5,
    C: 2.0,
    D: 1.0,
    F: 0,
  };
  return letterGradeTable[gpaLetter];
}

function getColorFromGpa(gpa) {
  if (gpa >= 4.5) {//A+
    return '#0ABF00';
  }else if (gpa >= 4.25) {//A
    return '#40C300';
  }else if (gpa >= 4.0) {
    return '#77C800';
  }else if (gpa >= 3.5) {
    return '#B2CD00';
  }else if (gpa >= 3.0) {
    return '#D2B500';
  }else if (gpa >= 2.5) {
    return '#D67F00';
  }else if (gpa >= 2.0) {
    return '#DB4600';
  }else if (gpa >= 1.0) {
    return '#E00B00';
  }else {
    return '#E50031';
  }
}

function validateForm(cN) {
  if (!cN) {
    alert('please fill in the form');
    return false;
  }

  let classes = JSON.parse(localStorage.getItem('classes'));

  // for (let i = 0; i < classes.length; i++) {
  //   if (classes.className.toLowerCase() == cN.toLowerCase) {
  //     alert('You already have an entry for this course');
  //     return false;
  //   }
  // }

  return true;
}
