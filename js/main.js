/**
 * DeviceTrack - Main JavaScript File
 * Handles core functionality across all pages
 */

// API Configuration
const API_BASE_URL = 'https://api.example.com';
const APP_PAGES = {
  dashboard: 'index.html',
  retrieval: 'retrieval.html',
  delayed: 'delayed.html',
  reports: 'reports.html',
  analytics: 'analytics.html'
};

// DOM Elements
const elements = {
  sidebar: document.querySelector('.sidebar'),
  navItems: document.querySelectorAll('.nav-item'),
  navLinks: document.querySelectorAll('.nav-link'),
  userMenu: document.querySelector('.user-menu'),
  mainContent: document.querySelector('.main-content')
};

// Utility Functions
const utils = {
  /**
   * Format date to readable string
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  formatDate: (dateString) => {
    if (!dateString) return '';
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  },

  /**
   * Format datetime to readable string
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted datetime
   */
  formatDateTime: (dateString) => {
    if (!dateString) return '';
    const options = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  },

  /**
   * Show loading spinner in specified element
   * @param {HTMLElement} element - Element to show spinner in
   */
  showLoading: (element) => {
    element.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    `;
  },

  /**
   * Show error message in specified element
   * @param {HTMLElement} element - Element to show error in
   * @param {string} message - Error message to display
   */
  showError: (element, message = 'An error occurred') => {
    element.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
      </div>
    `;
  }
};

// Navigation Controller
const navigation = {
  /**
   * Set active state for current page in sidebar
   */
  setActiveNavItem: () => {
    const currentPage = window.location.pathname.split('/').pop() || APP_PAGES.dashboard;
    
    elements.navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      if (link.getAttribute('href') === currentPage) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  },

  /**
   * Handle navigation between pages
   */
  setupNavigation: () => {
    elements.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // You could add pre-loading logic here if needed
        // For SPA behavior, you would prevent default and load content dynamically
        // e.preventDefault();
        // app.loadPage(link.getAttribute('href'));
      });
    });
  }
};

// API Controller
const api = {
  /**
   * Fetch devices from API
   * @returns {Promise<Array>} Array of devices
   */
  fetchDevices: async () => {
    try {
      // In a real implementation:
      // const response = await fetch(`${API_BASE_URL}/devices`);
      // return await response.json();
      
      // Mock data for demonstration
      return [
        {
          id: "DEV-2023-1457",
          assignedTo: "John Smith",
          dateIssued: "2025-04-22T00:00:00Z",
          expectedReturn: "2025-04-25T00:00:00Z",
          agency: "Port Authority",
          destination: "North Terminal",
          regime: "Standard",
          status: "issued"
        }
      ];
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

// Main Application
const app = {
  /**
   * Initialize the application
   */
  init: () => {
    // Set up navigation
    navigation.setActiveNavItem();
    navigation.setupNavigation();

    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
      case APP_PAGES.retrieval:
        // Initialization for retrieval page
        if (typeof retrievalPage !== 'undefined') {
          retrievalPage.init();
        }
        break;
      case APP_PAGES.delayed:
        // Initialization for delayed page
        if (typeof delayedPage !== 'undefined') {
          delayedPage.init();
        }
        break;
      // Add cases for other pages as needed
    }

    // Add any global event listeners
    app.setupGlobalEvents();
  },

  /**
   * Set up global event listeners
   */
  setupGlobalEvents: () => {
    // Example: Logout button handler
    const logoutBtn = document.querySelector('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        // Handle logout logic
      });
    }
  }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', app.init);

// Export for testing/modularity (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    utils,
    navigation,
    api,
    app
  };
}
