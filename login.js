document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault(); // ป้องกันการรีเฟรชหน้า

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'password') {
    alert('Login successful!');
    window.location.href = 'menu.html'; // เปลี่ยนไปยังหน้าเมนู
  } else {
    alert('Invalid username or password!');
  }
});