// API base URL
const API_BASE_URL = 'https://api.example.com';

// Format date
function formatDate(dateString) {
  if (!dateString) return '';
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Format datetime
function formatDateTime(dateString) {
  if (!dateString) return '';
  const options = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Set active nav item based on current page
function setActiveNavItem() {
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'retrieval';
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.page === currentPage) {
      item.classList.add('active');
    }
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavItem();
});