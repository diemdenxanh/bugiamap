document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const moonIcon = darkModeToggle.querySelector('i');
    
    // Kiểm tra theme đã lưu
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme === 'dark');

    // Xử lý sự kiện click
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Thêm hiệu ứng fade
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme === 'dark');
            document.body.style.opacity = '1';
        }, 300);
    });

    // Cập nhật icon với animation
    function updateIcon(isDark) {
        moonIcon.style.opacity = '0';
        setTimeout(() => {
            moonIcon.classList.remove(isDark ? 'fa-moon' : 'fa-sun');
            moonIcon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
            moonIcon.style.opacity = '1';
        }, 150);
    }
}); 