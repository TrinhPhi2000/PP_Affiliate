// Click input Email or Phone Number
const radioPhone = document.querySelector('#inputPhoneNumber');
const radioEmail = document.querySelector('#inputEmail');


radioPhone.addEventListener('click', function () {
    const radioPhonenew = document.querySelector('#formEmailOrPhone');
    radioPhonenew.placeholder = "Enter Phone Number";
    radioPhonenew.type = "text";
});

radioEmail.addEventListener('click', function () {
    const radioEmailNew = document.querySelector('#formEmailOrPhone');
    radioEmailNew.placeholder = "Enter Email";
    radioEmailNew.type = "email";
});
//End  Click input Email or Phone Number


// Hide-show password
const togglePassword = document.querySelector('#icon__eye-password');
const password = document.querySelector('#formCreatePassWord');

togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});
// End hide-show password



// Hide-show confirmpassword
const toggleConfirmPassword = document.querySelector('#icon__eye-confirmpassword');
const confirmpassword = document.querySelector('#formConfirmPassWord');

toggleConfirmPassword.addEventListener('click', function () {
    const type = confirmpassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmpassword.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});
// End hide-show confirmpassword


// Form validation code will come here.
const validatefullName =  document.querySelector("#formFullName");
const validateEmailOrPhone =  document.querySelector("#formEmailOrPhone");
const validatepassword =  document.querySelector("#formCreatePassWord");
const validateconfirmpassword =  document.querySelector("#formConfirmPassWord");
const validateVerifyCode =  document.querySelector("#formVerifyCode");
const formcheckPolicy =  document.querySelector("#formCheckPolicy");


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

function checkEmptyEroor(listInput) {
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

function checkMatchPassWordError(passwordInput, cfPasswordInput) {
    if(passwordInput.value !== cfPasswordInput.value) {
        showError(cfPasswordInput, 'Mật khẩu không trùng khớp!');
        return true;
    }
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

  let isEmptyError = checkEmptyEroor([validatefullName,validateEmailOrPhone, validatepassword,validateconfirmpassword, validateVerifyCode ]);
   let isEmailError = checkEmailError(validateEmailOrPhone);
  let isUserNameLengthErrorpassword = checkLengthError(validatepassword, 6, 100);
  let isUserNameLengthErrorconfirmpassword = checkLengthError(validateconfirmpassword, 6, 100);
  let isMatchError = checkMatchPassWordError(validatepassword, validateconfirmpassword);
  let ischeckCheckBoxes = checkCheckBoxes(form);

  const messageError =  document.querySelector(".message-error");
  if(isEmptyError || isUserNameLengthErrorpassword || isUserNameLengthErrorconfirmpassword || isMatchError|| ischeckCheckBoxes ) {
    
    messageError.classList.add('show');
  } 

  if(!isEmptyError && !isUserNameLengthErrorpassword && !isUserNameLengthErrorconfirmpassword && !isMatchError && !ischeckCheckBoxes ) {
    messageError.classList.remove('show');

  } 
});