'use strict';

const tbody = document.querySelector('tbody');

tbody.addEventListener('click', (e) => {
  const row = e.target.closest('tr');

  if (!row) {
    return;
  }

  const active = tbody.querySelector('.active');

  if (active) {
    active.classList.remove('active');
  }
});

const form = document.createElement('form');

form.className = 'new-employee-form';

form.innerHTML = `
  <label>Name: <input name="name" type="text" data-qa="name"></label>
  <label>Position: <input name="position" type="text" data-qa="position"></label>
  <label>Age: <input name="age" type="number" data-qa="age"></label>
  <label>Salary: <input name="salary" type="number" data-qa="salary"></label>
  <label>Office:
    <select name="office" data-qa="office">
      <option value="Tokyo">Tokyo</option>
      <option value="Singapore">Singapore</option>
      <option value="London">London</option>
      <option value="New York">New York</option>
      <option value="Edinburgh">Edinburgh</option>
      <option value="San Francisco">San Francisco</option>
    </select>
  </label>
  <button type="submit">Save to table</button>
`;

const container = document.querySelector('.container') || document.body;

container.append(form);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const employeeName = form.elements.name.value;
  const position = form.elements.position.value;
  const age = +form.elements.age.value;
  const salary = +form.elements.salary.value;
  const office = form.elements.office.value;

  if (employeeName.length < 4) {
    showNotification(
      'error',
      'Error',
      'Name must be at least 4 characters long',
    );

    return;
  }

  if (age < 18 || age > 90) {
    showNotification('error', 'Invalid Age', 'Age must be between 18 and 90');

    return;
  }

  showNotification('success', 'Success', 'Employee added successfully');

  const tr = document.createElement('tr');

  tr.innerHTML = `
  <td>${employeeName}</td>
  <td>${position}</td>
  <td>${office}</td>
  <td>${age}</td>
  <td>$${salary.toLocaleString('en-US')}</td>
`;

  tbody.append(tr);
  form.reset();
});

function showNotification(type, title, message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('notification', type);

  notification.innerHTML = `
  <strong>${title}</strong>
  <p>${message}</p>
  `;

  document.body.append(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
