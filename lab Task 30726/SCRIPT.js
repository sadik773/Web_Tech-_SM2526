document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear previous errors
  clearErrors();

  let isValid = true;

  // 1. Full Name Validation
  const fullName = document.getElementById('fullName').value.trim();
  if (fullName === '') {
    showError('fullNameError', 'Full Name is required.');
    isValid = false;
  }

  // 2. Email Validation
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    showError('emailError', 'Email is required.');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError('emailError', 'Please enter a valid email address.');
    isValid = false;
  }

  // 3. Phone Validation
  const phone = document.getElementById('phone').value.trim();
  if (phone === '') {
    showError('phoneError', 'Phone Number is required.');
    isValid = false;
  }

  // 4. Student ID Validation
  const studentId = document.getElementById('studentId').value.trim();
  if (studentId === '') {
    showError('studentIdError', 'Student ID is required.');
    isValid = false;
  }

  // 5. Gender Validation
  const genderOption = document.querySelector('input[name="gender"]:checked');
  if (!genderOption) {
    showError('genderError', 'Please select a gender.');
    isValid = false;
  }

  // 6. Department Validation
  const department = document.getElementById('department').value;
  if (department === '') {
    showError('departmentError', 'Please select a department.');
    isValid = false;
  }

  // 7. Food Selection Validation & Pricing
  const selectedFoodNodes = document.querySelectorAll('input[name="food"]:checked');
  if (selectedFoodNodes.length === 0) {
    showError('foodError', 'Please select at least one food item.');
    isValid = false;
  }

  // 8. Quantity Validation
  const quantityInput = document.getElementById('quantity').value;
  const quantity = parseInt(quantityInput, 10);
  if (isNaN(quantity) || quantity <= 0) {
    showError('quantityError', 'Quantity must be greater than 0.');
    isValid = false;
  }

  // If validation passes, calculate bill and display dynamic output
  if (isValid) {
    let foodUnitPriceSum = 0;
    const selectedItemsList = [];

    selectedFoodNodes.forEach(item => {
      const name = item.value;
      const price = parseFloat(item.getAttribute('data-price'));
      foodUnitPriceSum += price;
      selectedItemsList.push({ name: name, price: price });
    });

    const totalBill = foodUnitPriceSum * quantity;

    // Display values in the DOM dynamically
    document.getElementById('resName').textContent = fullName;
    document.getElementById('resStudentId').textContent = studentId;
    document.getElementById('resDepartment').textContent = department;
    document.getElementById('resQuantity').textContent = quantity;
    document.getElementById('resTotal').textContent = totalBill;

    // Build selected items list dynamically
    const resItemsList = document.getElementById('resItemsList');
    resItemsList.innerHTML = '';
    selectedItemsList.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price}`;
      resItemsList.appendChild(li);
    });

    // Reveal receipt view
    const receiptSection = document.getElementById('orderReceipt');
    receiptSection.classList.remove('hidden');

    // Smooth scroll to the output receipt
    receiptSection.scrollIntoView({ behavior: 'smooth' });
  }
});

function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error-msg');
  errorElements.forEach(el => el.textContent = '');
  document.getElementById('orderReceipt').classList.add('hidden');
}