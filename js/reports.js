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

// Function to fetch device tracking data
async function fetchDeviceTrackingData() {
  try {
    // In a real app, you would fetch from your API
    // const response = await fetch(`${API_BASE_URL}/device-tracking`);
    // const data = await response.json();
    
    // Mock data for device tracking demonstration
    const mockDeviceTracking = [
      {
        id: 1,
        date: "2025-04-20",
        agencyName: "Agency Alpha",
        destination: "Location X",
        regime: "Standard",
        devicesRequested: 30,
        devicesRetrieved: 28,
        devicesLeft: 2
      },
      {
        id: 2,
        date: "2025-04-18",
        agencyName: "Agency Beta",
        destination: "Location Y",
        regime: "Premium",
        devicesRequested: 45,
        devicesRetrieved: 40,
        devicesLeft: 5
      },
      {
        id: 3,
        date: "2025-04-15",
        agencyName: "Agency Gamma",
        destination: "Location Z",
        regime: "Standard",
        devicesRequested: 20,
        devicesRetrieved: 20,
        devicesLeft: 0
      },
      {
        id: 4,
        date: "2025-04-12",
        agencyName: "Agency Delta",
        destination: "Location X",
        regime: "Premium",
        devicesRequested: 60,
        devicesRetrieved: 55,
        devicesLeft: 5
      },
      {
        id: 5,
        date: "2025-04-10",
        agencyName: "Agency Alpha",
        destination: "Location Z",
        regime: "Standard",
        devicesRequested: 25,
        devicesRetrieved: 20,
        devicesLeft: 5
      }
    ];
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockDeviceTracking;
  } catch (error) {
    console.error('Error fetching device tracking data:', error);
    throw error;
  }
}

// Function to populate the device tracking table
async function populateDeviceTrackingTable() {
  try {
    const deviceTrackingData = await fetchDeviceTrackingData();
    const tableBody = document.getElementById('device-tracking-data');
    
    // Clear existing content
    tableBody.innerHTML = '';
    
    // Format date function
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    };
    
    // Add device tracking rows
    deviceTrackingData.forEach(item => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${formatDate(item.date)}</td>
        <td>${item.agencyName}</td>
        <td>${item.destination}</td>
        <td>${item.regime}</td>
        <td>${item.devicesRequested}</td>
        <td>${item.devicesRetrieved}</td>
        <td>${item.devicesLeft > 0 ? `<span class="status-badge status-delayed">${item.devicesLeft}</span>` : 
             `<span class="status-badge status-retrieved">0</span>`}</td>
        <td>
          <button class="action-button" title="View Details">
            <i class="fas fa-eye"></i>
          </button>
          <button class="action-button export" title="Export">
            <i class="fas fa-download"></i>
          </button>
        </td>
      `;
      
      tableBody.appendChild(row);
    });
  } catch (error) {
    const tableBody = document.getElementById('device-tracking-data');
    const errorRow = document.createElement('tr');
    errorRow.innerHTML = `
      <td colspan="8" class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        Error loading device tracking data. Please try again later.
      </td>
    `;
    tableBody.appendChild(errorRow);
  }
}

// Function to populate report cards
async function populateReportCards() {
  try {
    const reports = await fetchReports();
    const reportsContainer = document.getElementById('report-cards-container');
    
    // Clear existing content
    reportsContainer.innerHTML = '';
    
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
    const reportsContainer = document.getElementById('report-cards-container');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      Error loading report cards. Please try again later.
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
  const applyFilterButton = document.querySelector('.report-filters .action-button');
  
  applyFilterButton.addEventListener('click', () => {
    // Get all filter values
    const filterValues = {};
    filterInputs.forEach(input => {
      const label = input.previousElementSibling.textContent;
      filterValues[label] = input.value;
    });
    
    console.log('Applying filters:', filterValues);
    
    // In a real app, this would refetch data with the new filters
    // For now, we'll just reload the current data
    populateDeviceTrackingTable();
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  populateDeviceTrackingTable();
  populateReportCards();
  setupReportTabs();
  setupReportFilters();
});
