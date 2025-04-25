// Function to fetch analytics data from API
async function fetchAnalyticsData() {
  try {
    // In a real app, you would fetch from your API
    // const response = await fetch(`${API_BASE_URL}/analytics`);
    // const data = await response.json();
    
    // Mock data for demonstration
    const mockAnalytics = {
      kpis: {
        totalIssued: 247,
        totalRetrieved: 215,
        delayedReturns: 32,
        avgReturnTime: 2.7,
        issuedTrend: 12,
        retrievedTrend: 8,
        delayedTrend: -5,
        returnTimeTrend: 0.3
      },
      charts: {
        issuanceTrend: 'https://via.placeholder.com/600x300?text=Issuance+Trend+Chart',
        statusDistribution: 'https://via.placeholder.com/600x300?text=Status+Distribution+Chart',
        delayedReturns: 'https://via.placeholder.com/1200x300?text=Delayed+Returns+Chart'
      }
    };
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockAnalytics;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
}

// Function to update KPIs
function updateKPIs(data) {
  document.querySelector('.kpi-container').innerHTML = `
    <div class="kpi-card">
      <p class="kpi-label">Total Devices Issued</p>
      <div class="kpi-value">${data.kpis.totalIssued}</div>
      <div class="kpi-trend ${data.kpis.issuedTrend > 0 ? 'trend-up' : 'trend-down'}">
        <i class="fas fa-arrow-${data.kpis.issuedTrend > 0 ? 'up' : 'down'}"></i>
        <span>${Math.abs(data.kpis.issuedTrend)}% from last period</span>
      </div>
    </div>
    <div class="kpi-card">
      <p class="kpi-label">Devices Retrieved</p>
      <div class="kpi-value">${data.kpis.totalRetrieved}</div>
      <div class="kpi-trend ${data.kpis.retrievedTrend > 0 ? 'trend-up' : 'trend-down'}">
        <i class="fas fa-arrow-${data.kpis.retrievedTrend > 0 ? 'up' : 'down'}"></i>
        <span>${Math.abs(data.kpis.retrievedTrend)}% from last period</span>
      </div>
    </div>
    <div class="kpi-card">
      <p class="kpi-label">Delayed Returns</p>
      <div class="kpi-value">${data.kpis.delayedReturns}</div>
      <div class="kpi-trend ${data.kpis.delayedTrend > 0 ? 'trend-up' : 'trend-down'}">
        <i class="fas fa-arrow-${data.kpis.delayedTrend > 0 ? 'up' : 'down'}"></i>
        <span>${Math.abs(data.kpis.delayedTrend)}% from last period</span>
      </div>
    </div>
    <div class="kpi-card">
      <p class="kpi-label">Avg. Return Time</p>
      <div class="kpi-value">${data.kpis.avgReturnTime}</div>
      <div class="kpi-trend ${data.kpis.returnTimeTrend > 0 ? 'trend-up' : 'trend-down'}">
        <i class="fas fa-arrow-${data.kpis.returnTimeTrend > 0 ? 'up' : 'down'}"></i>
        <span>${Math.abs(data.kpis.returnTimeTrend)} days from last period</span>
      </div>
    </div>
  `;
}

// Function to update charts
function updateCharts(data) {
  document.querySelector('.charts-grid').innerHTML = `
    <div class="chart-container">
      <div class="chart-header">
        <h3 class="chart-title">Device Issuance Trend</h3>
        <div class="chart-options">
          <button class="filter-button">Daily</button>
          <button class="filter-button active">Weekly</button>
          <button class="filter-button">Monthly</button>
        </div>
      </div>
      <div class="chart">
        <img src="${data.charts.issuanceTrend}" alt="Issuance Trend Chart" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
    </div>
    
    <div class="chart-container">
      <div class="chart-header">
        <h3 class="chart-title">Return Status Distribution</h3>
      </div>
      <div class="chart">
        <img src="${data.charts.statusDistribution}" alt="Status Distribution Chart" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
    </div>
    
    <div class="chart-container full-width">
      <div class="chart-header">
        <h3 class="chart-title">Delayed Returns by Department</h3>
      </div>
      <div class="chart">
        <img src="${data.charts.delayedReturns}" alt="Delayed Returns Chart" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
    </div>
  `;
  
  // Add event listeners to chart options
  const chartOptions = document.querySelectorAll('.chart-options .filter-button');
  chartOptions.forEach(option => {
    option.addEventListener('click', () => {
      chartOptions.forEach(btn => btn.classList.remove('active'));
      option.classList.add('active');
      console.log('Time period changed:', option.textContent.trim());
    });
  });
}

// Function to handle filter changes
function setupAnalyticsFilters() {
  const filterButtons = document.querySelectorAll('.toolbar .filter-button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // In a real app, you would refetch analytics with new filters
      console.log('Filter changed:', button.textContent.trim());
    });
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await fetchAnalyticsData();
    updateKPIs(data);
    updateCharts(data);
    setupAnalyticsFilters();
  } catch (error) {
    const content = document.querySelector('.content');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      Error loading analytics data. Please try again later.
    `;
    content.appendChild(errorMessage);
  }
});