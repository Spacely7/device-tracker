// Fetch devices from API
async function fetchDevices() {
  try {
    // Show loading state
    const tableBody = document.querySelector('#devices-table tbody');
    tableBody.innerHTML = '<tr class="loading"><td colspan="10"></td></tr>';
    
    // In a real app, you would fetch from your API
    // const response = await fetch(`${API_BASE_URL}/devices`);
    // const data = await response.json();
    
    // Mock data for demonstration
    const mockDevices = [
      {
        id: "DEV-2023-1457",
        assignedTo: "John Smith",
        dateIssued: "2025-04-22T00:00:00Z",
        expectedReturn: "2025-04-25T00:00:00Z",
        agency: "Port Authority",
        destination: "North Terminal",
        regime: "Standard",
        status: "issued"
      },
      {
        id: "DEV-2023-1458",
        assignedTo: "Sarah Johnson",
        dateIssued: "2025-04-21T00:00:00Z",
        expectedReturn: "2025-04-24T00:00:00Z",
        agency: "Customs",
        destination: "South Terminal",
        regime: "Express",
        status: "issued"
      },
      {
        id: "DEV-2023-1459",
        assignedTo: "Robert Chen",
        dateIssued: "2025-04-20T00:00:00Z",
        expectedReturn: "2025-04-23T00:00:00Z",
        agency: "Harbor Patrol",
        destination: "West Terminal",
        regime: "Standard",
        status: "delayed"
      }
    ];
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockDevices;
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error;
  }
}

// Populate devices table
async function populateDevicesTable() {
  try {
    const devices = await fetchDevices();
    const tableBody = document.querySelector('#devices-table tbody');
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Add new rows from API data
    devices.forEach(device => {
      const row = document.createElement('tr');
      
      // Determine status badge class based on device status
      let statusClass = 'status-issued';
      if (device.status === 'delayed') statusClass = 'status-delayed';
      if (device.status === 'retrieved') statusClass = 'status-retrieved';
      
      row.innerHTML = `
        <td class="checkbox-cell">
          <input type="checkbox">
        </td>
        <td><a href="#" class="device-id">${device.id}</a></td>
        <td>${device.assignedTo}</td>
        <td>${formatDate(device.dateIssued)}</td>
        <td>${formatDate(device.expectedReturn)}</td>
        <td>${device.agency}</td>
        <td>${device.destination}</td>
        <td>${device.regime}</td>
        <td><span class="status-badge ${statusClass}">${device.status}</span></td>
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
    const tableBody = document.querySelector('#devices-table tbody');
    tableBody.innerHTML = `
      <tr>
        <td colspan="10" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          Error loading devices. Please try again later.
        </td>
      </tr>
    `;
  }
}

// Add search functionality
function setupSearch() {
  const searchInput = document.getElementById('device-search');
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#devices-table tbody tr');
    
    rows.forEach(row => {
      if (row.classList.contains('loading')) return;
      
      const deviceId = row.querySelector('.device-id')?.textContent.toLowerCase() || '';
      const assignedTo = row.cells[2]?.textContent.toLowerCase() || '';
      const shouldShow = deviceId.includes(searchTerm) || assignedTo.includes(searchTerm);
      row.style.display = shouldShow ? '' : 'none';
    });
  });z
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  populateDevicesTable();
  setupSearch();
});