const togglePassword = document.querySelector('#icon__eye');
  const passwordHide = document.querySelector('#formPassWord');

  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = passwordHide.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordHide.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

// Form validation code will come here.
const email =  document.querySelector("#formEmailAndPhone");
const password =  document.querySelector("#formPassWord");
const checkPolicy =  document.querySelector("#formcheckPolicy");



var form = document.querySelector('form')

function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector('small');

  parent.classList.add('error');
  small.innerText = message;
}

function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector('small');

  parent.classList.remove('error');
  small.innerText = '';
}

function checkEmptyError(listInput) {
  let isEmptyError = false;
  listInput.forEach( input => {
      input.value = input.value.trim();

      if(!input.value) {
        isEmptyError = true;
        showError(input, 'Không được để trống')
      }else {
        showSuccess(input);
      }
  });
  return isEmptyError;
}

function checkEmailError(input) {
  var regexEmail = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/i;
  input.value = input.value.trim()

  let isEmailError = !regexEmail.test(input.value);
  if(regexEmail.test(input.value)) {
    showSuccess(input);
  }
  else{
    showError(input, 'Email không chính xác')
  }
  return isEmailError;
}

function checkLengthError(input , min, max) {
  input.value = input.value.trim()

  if(input.value.length < min) {
    showError(input, `Phải ít nhất ${min} ký tự`);
    return true;
  }
  if (input.value.length > max){
    showError(input, `Không được quá ${max} ký tự`);
    return true;

  }
  showSuccess(input);
  return false;
}

function checkCheckBoxes(form) {
  let ischeckCheckBoxes = false;
  const messCheckError =  document.querySelector(".checked-error");
  if (form.checkbox.checked == false) 
  {
    messCheckError.classList.add('show');
    ischeckCheckBoxes = true;
  } 
  else {    
    messCheckError.classList.remove('show');
  }
  return ischeckCheckBoxes;
}



form.addEventListener('submit', function(e) {
  e.preventDefault()

  let isEmptyError = checkEmptyError([email, password]);
  let isEmailError = checkEmailError(email);
  let isUserNameLengthError = checkLengthError(password, 6, 100);
  let ischeckCheckBoxes = checkCheckBoxes(form);

  
  const messageError =  document.querySelector(".message-error");
  if(isEmptyError || isEmailError || isUserNameLengthError || ischeckCheckBoxes ) {
    messageError.classList.add('show');
  } 

  if(!isEmptyError && !isEmailError && !isUserNameLengthError && !ischeckCheckBoxes ) {
    messageError.classList.remove('show');
  } 

});