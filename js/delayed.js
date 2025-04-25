// Fetch delayed devices from API
async function fetchDelayedDevices() {
  try {
    // Show loading state
    const tableBody = document.querySelector('#delayed-table tbody');
    tableBody.innerHTML = '<tr class="loading"><td colspan="10"></td></tr>';
    
    // Mock data for demonstration
    const mockDelayedDevices = [
      {
        id: "DEV-2023-1459",
        assignedTo: "Robert Chen",
        dateIssued: "2025-04-20T00:00:00Z",
        expectedReturn: "2025-04-23T00:00:00Z",
        daysOverdue: 0,
        agency: "Harbor Patrol",
        escalationLevel: "Level 1",
        lastNotification: "2025-04-23T09:15:00Z"
      },
      {
        id: "DEV-2023-1445",
        assignedTo: "Elena Rodriguez",
        dateIssued: "2025-04-17T00:00:00Z",
        expectedReturn: "2025-04-20T00:00:00Z",
        daysOverdue: 3,
        agency: "Customs",
        escalationLevel: "Level 2",
        lastNotification: "2025-04-22T14:30:00Z"
      },
      {
        id: "DEV-2023-1437",
        assignedTo: "David Wong",
        dateIssued: "2025-04-15T00:00:00Z",
        expectedReturn: "2025-04-18T00:00:00Z",
        daysOverdue: 5,
        agency: "Security",
        escalationLevel: "Level 3",
        lastNotification: "2025-04-22T09:00:00Z"
      }
    ];
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockDelayedDevices;
  } catch (error) {
    console.error('Error fetching delayed devices:', error);
    throw error;
  }
}

// Populate delayed devices table
async function populateDelayedDevicesTable() {
  try {
    const devices = await fetchDelayedDevices();
    const tableBody = document.querySelector('#delayed-table tbody');
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Add new rows from API data
    devices.forEach(device => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td class="checkbox-cell">
          <input type="checkbox">
        </td>
        <td><a href="#" class="device-id">${device.id}</a></td>
        <td>${device.assignedTo}</td>
        <td>${formatDate(device.dateIssued)}</td>
        <td>${formatDate(device.expectedReturn)}</td>
        <td>${device.daysOverdue}</td>
        <td>${device.agency}</td>
        <td>${device.escalationLevel}</td>
        <td>${formatDateTime(device.lastNotification)}</td>
        <td>
          <button class="action-button">
            <i class="fas fa-eye"></i>
            <span>View</span>
          </button>
        </td>
      `;
      
      tableBody.appendChild(row);
    });
  } catch (error) {
    const tableBody = document.querySelector('#delayed-table tbody');
    tableBody.innerHTML = `
      <tr>
        <td colspan="10" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          Error loading delayed devices. Please try again later.
        </td>
      </tr>
    `;
  }
}

// Add search functionality
function setupDelayedSearch() {
  const searchInput = document.getElementById('delayed-search');
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#delayed-table tbody tr');
    
    rows.forEach(row => {
      if (row.classList.contains('loading')) return;
      
      const deviceId = row.querySelector('.device-id')?.textContent.toLowerCase() || '';
      const assignedTo = row.cells[2]?.textContent.toLowerCase() || '';
      const shouldShow = deviceId.includes(searchTerm) || assignedTo.includes(searchTerm);
      row.style.display = shouldShow ? '' : 'none';
    });
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  populateDelayedDevicesTable();
  setupDelayedSearch();
});