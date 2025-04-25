document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation items
  const navItems = document.querySelectorAll('.nav-item');
  
  // Add click event listener to each navigation item
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Get the page attribute
      const page = this.getAttribute('data-page');
      
      // Handle navigation
      navigateTo(page);
      
      // Update active state
      setActiveNavItem(this);
    });
  });
  
  // Set the initial active item based on current page
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop().replace('.html', '') || 'index';
  const currentNavItem = document.querySelector(`.nav-item[data-page="${currentPage}"]`);
  if (currentNavItem) {
    setActiveNavItem(currentNavItem);
  } else {
    // Default to dashboard if no matching page is found
    setActiveNavItem(document.querySelector('.nav-item[data-page="index"]'));
  }
  
  // Function to navigate to different pages
  function navigateTo(page) {
    if (page === 'index') {
      // For the index/dashboard page
      window.location.href = 'index.html';
    } else {
      // For other pages
      window.location.href = page + '.html';
    }
  }
  
  // Function to set active navigation item
  function setActiveNavItem(activeItem) {
    // Remove active class from all items
    navItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Add active class to the clicked item
    activeItem.classList.add('active');
    
    // Update page title based on the active navigation
    const pageName = activeItem.querySelector('span').textContent;
    document.querySelector('.page-title').textContent = pageName;
  }
});
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
