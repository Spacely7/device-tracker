// Function to fetch report data from API
async function fetchReports() {
  try {
    // In a real app, you would fetch from your API
    // const response = await fetch(`${API_BASE_URL}/reports`);
    // const data = await response.json();
    
    // Mock data for demonstration
    const mockReports = [
      {
        id: 1,
        title: "Device Issued vs Returned",
        description: "Comparative analysis of devices issued and returned within the selected time period, broken down by day/week.",
        type: "standard",
        icon: "chart-line",
        iconColor: "#3498db"
      },
      {
        id: 2,
        title: "Late Returns Summary",
        description: "Detailed breakdown of late device returns by department, severity, and frequency.",
        type: "standard",
        icon: "clock",
        iconColor: "#e74c3c"
      },
      {
        id: 3,
        title: "Device Usage by Department",
        description: "Analysis of device allocation and utilization patterns across different departments.",
        type: "standard",
        icon: "users",
        iconColor: "#8e44ad"
      },
      {
        id: 4,
        title: "Return Condition Reports",
        description: "Summary of device conditions upon return, highlighting maintenance needs and damage patterns.",
        type: "standard",
        icon: "tools",
        iconColor: "#27ae60"
      }
    ];
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockReports;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
}

// Function to populate reports
async function populateReports() {
  try {
    const reports = await fetchReports();
    const reportsContainer = document.querySelector('.content');
    
    // Clear existing content after the filters
    const filters = document.querySelector('.report-filters');
    reportsContainer.innerHTML = '';
    reportsContainer.appendChild(filters);
    
    // Add report cards
    reports.forEach(report => {
      const reportCard = document.createElement('div');
      reportCard.className = 'report-card';
      
      reportCard.innerHTML = `
        <div class="report-icon" style="background-color: ${report.iconColor}">
          <i class="fas fa-${report.icon}"></i>
        </div>
        <div class="report-content">
          <h3 class="report-title">${report.title}</h3>
          <p class="report-description">${report.description}</p>
          <div class="report-actions">
            <button class="action-button">
              <i class="fas fa-eye"></i>
              <span>Preview</span>
            </button>
            <button class="action-button export">
              <i class="fas fa-file-pdf"></i>
              <span>Export PDF</span>
            </button>
            <button class="action-button export">
              <i class="fas fa-file-excel"></i>
              <span>Export Excel</span>
            </button>
          </div>
        </div>
      `;
      
      reportsContainer.appendChild(reportCard);
    });
  } catch (error) {
    const reportsContainer = document.querySelector('.content');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      Error loading reports. Please try again later.
    `;
    reportsContainer.appendChild(errorMessage);
  }
}

// Function to handle tab switching
function setupReportTabs() {
  const tabs = document.querySelectorAll('.tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // In a real app, you would fetch different report types here
      // For now, we'll just show a message
      const reportType = tab.textContent.trim();
      console.log(`Switched to ${reportType} tab`);
    });
  });
}

// Function to handle filter changes
function setupReportFilters() {
  const filterInputs = document.querySelectorAll('.report-filters select');
  
  filterInputs.forEach(input => {
    input.addEventListener('change', () => {
      // In a real app, you would refetch reports with new filters
      console.log('Filter changed:', input.value);
    });
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  populateReports();
  setupReportTabs();
  setupReportFilters();
});