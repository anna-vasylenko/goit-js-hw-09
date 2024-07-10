const formEl = document.querySelector('.feedback-form');
const FEEDBACK_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

formEl.addEventListener('input', e => {
  formData.email = e.currentTarget.elements.email.value.trim();
  formData.message = e.currentTarget.elements.message.value.trim();
  saveToLS(FEEDBACK_KEY, formData);
});

document.addEventListener('DOMContentLoaded', e => {
  const userData = getFromLS(FEEDBACK_KEY);
  formEl.elements.email.value = userData?.email || '';
  formEl.elements.message.value = userData?.message || '';
});

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;
  if (email === '' || message === '') {
    return alert('Fill please all fields');
  }
  console.log(formData);
  localStorage.removeItem(FEEDBACK_KEY);
  e.target.reset();
});

function saveToLS(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

function getFromLS(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return json;
  }
}
