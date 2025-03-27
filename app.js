// Application State
let state = {
    courseOutcomes: [],
    programOutcomes: [],
    mappings: [],
    justifications: [],
    attainmentData: {},
    bloomLevels: [
        {
            name: 'Create',
            description: 'Design, construct, produce, invent',
            keywords: ['design', 'construct', 'produce', 'invent', 'develop', 'formulate', 'generate', 'plan'],
            color: '#2ecc71'
        },
        {
            name: 'Evaluate',
            description: 'Judge, critique, justify, support',
            keywords: ['judge', 'critique', 'justify', 'support', 'assess', 'appraise', 'determine', 'validate'],
            color: '#27ae60'
        },
        {
            name: 'Analyze',
            description: 'Compare, contrast, examine, investigate',
            keywords: ['compare', 'contrast', 'examine', 'investigate', 'analyze', 'differentiate', 'distinguish', 'examine'],
            color: '#3498db'
        },
        {
            name: 'Apply',
            description: 'Use, implement, execute, demonstrate',
            keywords: ['use', 'implement', 'execute', 'demonstrate', 'apply', 'employ', 'utilize', 'practice'],
            color: '#2980b9'
        },
        {
            name: 'Understand',
            description: 'Explain, interpret, summarize, classify',
            keywords: ['explain', 'interpret', 'summarize', 'classify', 'describe', 'discuss', 'identify', 'recognize'],
            color: '#e74c3c'
        },
        {
            name: 'Remember',
            description: 'Recall, list, define, identify',
            keywords: ['recall', 'list', 'define', 'identify', 'memorize', 'repeat', 'state', 'recognize'],
            color: '#c0392b'
        }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadInitialData();
    setupEventListeners();
    showMappingSection();
    checkExistingSession();
});

// Load initial data
function loadInitialData() {
    // Sample data - In a real application, this would come from an API
    state.courseOutcomes = [
        { id: 1, description: 'Understand fundamental programming concepts', bloomLevel: 'Understand' },
        { id: 2, description: 'Apply object-oriented programming principles', bloomLevel: 'Apply' },
        { id: 3, description: 'Analyze and solve complex programming problems', bloomLevel: 'Analyze' }
    ];

    state.programOutcomes = [
        { id: 1, description: 'Engineering knowledge' },
        { id: 2, description: 'Problem analysis' },
        { id: 3, description: 'Design/development of solutions' }
    ];
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('href').substring(1);
            showSection(section);
        });
    });
}

// Show different sections
function showSection(section) {
    const sections = ['mapping', 'bloom', 'justification', 'attainment', 'reports', 'dashboard'];
    sections.forEach(s => {
        if (s === section) {
            document.querySelector(`#${s}`).classList.add('active');
        } else {
            document.querySelector(`#${s}`).classList.remove('active');
        }
    });

    switch(section) {
        case 'mapping':
            showMappingSection();
            break;
        case 'bloom':
            showBloomSection();
            break;
        case 'justification':
            showJustificationSection();
            break;
        case 'attainment':
            showAttainmentSection();
            break;
        case 'reports':
            showReportsSection();
            break;
        case 'dashboard':
            showDashboardSection();
            break;
    }
}

// CO-PO Mapping Section
function showMappingSection() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <h3 class="mb-4">CO-PO Mapping</h3>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Course Outcomes</th>
                        ${state.programOutcomes.map(po => `<th>PO${po.id}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${state.courseOutcomes.map(co => `
                        <tr>
                            <td>CO${co.id}: ${co.description}</td>
                            ${state.programOutcomes.map(po => `
                                <td>
                                    <select class="form-select mapping-select" 
                                            data-co="${co.id}" 
                                            data-po="${po.id}">
                                        <option value="">-</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </td>
                            `).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    // Add event listeners to mapping selects
    document.querySelectorAll('.mapping-select').forEach(select => {
        select.addEventListener('change', handleMappingChange);
    });
}

// Handle mapping changes
function handleMappingChange(e) {
    const coId = parseInt(e.target.dataset.co);
    const poId = parseInt(e.target.dataset.po);
    const value = parseInt(e.target.value);

    // Update state
    const mappingIndex = state.mappings.findIndex(m => m.coId === coId && m.poId === poId);
    if (mappingIndex === -1) {
        state.mappings.push({ coId, poId, value });
    } else {
        state.mappings[mappingIndex].value = value;
    }
}

// Generate CO-PO Mapping
function generateMapping() {
    // In a real application, this would use AI to suggest mappings
    alert('Generating AI-powered CO-PO mapping...');
}

// Generate Justifications
function generateJustification() {
    // In a real application, this would use AI to generate justifications
    alert('Generating AI-powered justifications...');
}

// Calculate Attainment
function calculateAttainment() {
    // In a real application, this would calculate attainment based on student performance
    alert('Calculating attainment levels...');
}

// Generate Report
function generateReport() {
    // In a real application, this would generate a formatted report
    alert('Generating accreditation report...');
}

// Show Justification Section
function showJustificationSection() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <h3 class="mb-4">CO Justifications</h3>
        <div class="row">
            ${state.courseOutcomes.map(co => `
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">CO${co.id}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${co.description}</p>
                            <div class="justification-content">
                                <p class="text-muted">AI-generated justification will appear here...</p>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Show Attainment Section
function showAttainmentSection() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <h3 class="mb-4">Attainment Analysis</h3>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">CO Attainment</h5>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="coAttainmentChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">PO Attainment</h5>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="poAttainmentChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize charts
    initializeCharts();
}

// Initialize Charts
function initializeCharts() {
    // CO Attainment Chart
    const coCtx = document.getElementById('coAttainmentChart').getContext('2d');
    new Chart(coCtx, {
        type: 'bar',
        data: {
            labels: state.courseOutcomes.map(co => `CO${co.id}`),
            datasets: [{
                label: 'Attainment Level',
                data: [0.75, 0.82, 0.68], // Sample data
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    });

    // PO Attainment Chart
    const poCtx = document.getElementById('poAttainmentChart').getContext('2d');
    new Chart(poCtx, {
        type: 'bar',
        data: {
            labels: state.programOutcomes.map(po => `PO${po.id}`),
            datasets: [{
                label: 'Attainment Level',
                data: [0.78, 0.85, 0.72], // Sample data
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    });
}

// Show Reports Section
function showReportsSection() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <h3 class="mb-4">Accreditation Reports</h3>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">NBA/NAAC Report</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Section</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>CO-PO Mapping Matrix</td>
                                        <td><span class="badge bg-success">Complete</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-primary">View</button>
                                            <button class="btn btn-sm btn-success">Export</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Attainment Analysis</td>
                                        <td><span class="badge bg-success">Complete</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-primary">View</button>
                                            <button class="btn btn-sm btn-success">Export</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Show Dashboard Section
function showDashboardSection() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <h3 class="mb-4">Analytics Dashboard</h3>
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Overall Performance</h5>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="performanceChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Key Metrics</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <div class="metric-card">
                                    <h6>Average CO Attainment</h6>
                                    <h3>75%</h3>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="metric-card">
                                    <h6>Average PO Attainment</h6>
                                    <h3>78%</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize performance chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'CO Attainment',
                data: [65, 70, 75, 80],
                borderColor: 'rgba(54, 162, 235, 1)',
                tension: 0.1
            }, {
                label: 'PO Attainment',
                data: [68, 72, 76, 78],
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Show Bloom's Taxonomy Section
function showBloomSection() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <h3 class="mb-4">Bloom's Taxonomy Analysis</h3>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Course Outcomes Analysis</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Course Outcome</th>
                                        <th>Bloom's Level</th>
                                        <th>Keywords</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${state.courseOutcomes.map(co => `
                                        <tr>
                                            <td>CO${co.id}: ${co.description}</td>
                                            <td>
                                                <span class="badge" style="background-color: ${getBloomColor(co.bloomLevel)}">
                                                    ${co.bloomLevel}
                                                </span>
                                            </td>
                                            <td>
                                                ${getBloomKeywords(co.bloomLevel).join(', ')}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Bloom's Level Distribution</h5>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="bloomDistributionChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Bloom's Level Guidelines</h5>
                    </div>
                    <div class="card-body">
                        <div class="bloom-guidelines">
                            ${state.bloomLevels.map(level => `
                                <div class="bloom-guideline-item">
                                    <h6 style="color: ${level.color}">${level.name}</h6>
                                    <p class="mb-1">${level.description}</p>
                                    <small class="text-muted">Keywords: ${level.keywords.join(', ')}</small>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize Bloom's distribution chart
    initializeBloomChart();
}

// Get Bloom's level color
function getBloomColor(level) {
    const bloomLevel = state.bloomLevels.find(l => l.name === level);
    return bloomLevel ? bloomLevel.color : '#6c757d';
}

// Get Bloom's level keywords
function getBloomKeywords(level) {
    const bloomLevel = state.bloomLevels.find(l => l.name === level);
    return bloomLevel ? bloomLevel.keywords : [];
}

// Initialize Bloom's distribution chart
function initializeBloomChart() {
    const ctx = document.getElementById('bloomDistributionChart').getContext('2d');
    const distribution = calculateBloomDistribution();

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: state.bloomLevels.map(level => level.name),
            datasets: [{
                data: state.bloomLevels.map(level => distribution[level.name] || 0),
                backgroundColor: state.bloomLevels.map(level => level.color),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// Calculate Bloom's level distribution
function calculateBloomDistribution() {
    const distribution = {};
    state.courseOutcomes.forEach(co => {
        distribution[co.bloomLevel] = (distribution[co.bloomLevel] || 0) + 1;
    });
    return distribution;
}

// Function to redirect to login page
function redirectToLogin(userType) {
    window.location.href = `login.html?type=${userType}`;
}

// Check if user is already logged in
function checkExistingSession() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || 'null');
    
    if (currentUser) {
        const redirectUrl = currentUser.userType === 'faculty' 
            ? 'faculty-dashboard.html' 
            : 'student-dashboard.html';
        window.location.href = redirectUrl;
    }
}

// Show Help
function showHelp() {
    alert('Help documentation will be displayed here...');
}