// ============================================
// Event Attendance Management System - JavaScript
// ============================================

// ===== MOCK DATA =====

// Mock Users
const MOCK_USERS = {
    'attendee@test.com': {
        id: 'A001',
        name: 'John Doe',
        email: 'attendee@test.com',
        password: 'password123',
        role: 'attendee'
    },
    'organizer@test.com': {
        id: 'O001',
        name: 'Jane Smith',
        email: 'organizer@test.com',
        password: 'password123',
        role: 'organizer'
    }
};

// Mock Events Data
const MOCK_EVENTS = [
    {
        id: 'EVT001',
        name: 'Cloud Computing Summit 2026',
        type: 'conference',
        date: '2026-03-15',
        time: '09:00',
        venue: 'Tech Convention Center, Hall A',
        capacity: 500,
        registered: 387,
        description: 'Annual summit on cloud technologies and trends',
        organizerId: 'O001',
        status: 'upcoming'
    },
    {
        id: 'EVT002',
        name: 'Rock Night Music Festival',
        type: 'concert',
        date: '2026-02-20',
        time: '18:00',
        venue: 'City Stadium',
        capacity: 2000,
        registered: 1850,
        description: 'Featuring top rock bands',
        organizerId: 'O001',
        status: 'upcoming'
    },
    {
        id: 'EVT003',
        name: 'AI & Machine Learning Workshop',
        type: 'workshop',
        date: '2026-02-10',
        time: '10:00',
        venue: 'Innovation Lab, Building 3',
        capacity: 50,
        registered: 48,
        description: 'Hands-on workshop on ML algorithms',
        organizerId: 'O001',
        status: 'completed'
    },
    {
        id: 'EVT004',
        name: 'Annual Art Exhibition',
        type: 'exhibition',
        date: '2026-04-01',
        time: '11:00',
        venue: 'National Gallery',
        capacity: 300,
        registered: 156,
        description: 'Contemporary art showcase',
        organizerId: 'O001',
        status: 'upcoming'
    },
    {
        id: 'EVT005',
        name: 'Cybersecurity Seminar',
        type: 'seminar',
        date: '2026-01-28',
        time: '14:00',
        venue: 'Virtual Event',
        capacity: 1000,
        registered: 823,
        description: 'Latest trends in cybersecurity',
        organizerId: 'O001',
        status: 'completed'
    }
];

// Mock Attendance Data (for attendee A001)
const MOCK_ATTENDANCE = [
    { eventId: 'EVT001', attendeeId: 'A001', status: 'NOT_CHECKED_IN', timestamp: null },
    { eventId: 'EVT002', attendeeId: 'A001', status: 'NOT_CHECKED_IN', timestamp: null },
    { eventId: 'EVT003', attendeeId: 'A001', status: 'CHECKED_IN', timestamp: '2026-02-10T10:15:00' },
    { eventId: 'EVT005', attendeeId: 'A001', status: 'CHECKED_IN', timestamp: '2026-01-28T14:05:00' }
];

// Mock Attendees for Organizer View
const MOCK_ATTENDEES = [
    {
        id: 'A001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-0101',
        registeredEvents: ['EVT001', 'EVT002', 'EVT003', 'EVT005']
    },
    {
        id: 'A002',
        name: 'Alice Johnson',
        email: 'alice.j@example.com',
        phone: '+1-555-0102',
        registeredEvents: ['EVT001', 'EVT002', 'EVT004']
    },
    {
        id: 'A003',
        name: 'Bob Williams',
        email: 'bob.w@example.com',
        phone: '+1-555-0103',
        registeredEvents: ['EVT001', 'EVT003', 'EVT005']
    },
    {
        id: 'A004',
        name: 'Carol Martinez',
        email: 'carol.m@example.com',
        phone: '+1-555-0104',
        registeredEvents: ['EVT002', 'EVT004']
    },
    {
        id: 'A005',
        name: 'David Lee',
        email: 'david.lee@example.com',
        phone: '+1-555-0105',
        registeredEvents: ['EVT001', 'EVT002', 'EVT003', 'EVT004', 'EVT005']
    }
];

// Mock Event-Attendee Status
const MOCK_EVENT_ATTENDANCE = {
    'EVT001': [
        { attendeeId: 'A001', status: 'NOT_CHECKED_IN', registrationDate: '2026-01-10', checkInTime: null },
        { attendeeId: 'A002', status: 'NOT_CHECKED_IN', registrationDate: '2026-01-12', checkInTime: null },
        { attendeeId: 'A003', status: 'NOT_CHECKED_IN', registrationDate: '2026-01-15', checkInTime: null },
        { attendeeId: 'A005', status: 'NOT_CHECKED_IN', registrationDate: '2026-01-08', checkInTime: null }
    ],
    'EVT002': [
        { attendeeId: 'A001', status: 'NOT_CHECKED_IN', registrationDate: '2026-01-20', checkInTime: null },
        { attendeeId: 'A002', status: 'NOT_CHECKED_IN', registrationDate: '2026-01-22', checkInTime: null },
        { attendeeId: 'A004', status: 'NOT_CHECKED_IN', registrationDate: '2026-01-25', checkInTime: null },
        { attendeeId: 'A005', status: 'NOT_CHECKED_IN', registrationDate: '2026-01-18', checkInTime: null }
    ],
    'EVT003': [
        { attendeeId: 'A001', status: 'CHECKED_IN', registrationDate: '2026-02-01', checkInTime: '2026-02-10T10:15:00' },
        { attendeeId: 'A003', status: 'CHECKED_IN', registrationDate: '2026-02-02', checkInTime: '2026-02-10T10:20:00' },
        { attendeeId: 'A005', status: 'CHECKED_IN', registrationDate: '2026-02-01', checkInTime: '2026-02-10T10:10:00' }
    ],
    'EVT004': [
        { attendeeId: 'A002', status: 'NOT_CHECKED_IN', registrationDate: '2026-03-01', checkInTime: null },
        { attendeeId: 'A004', status: 'NOT_CHECKED_IN', registrationDate: '2026-03-05', checkInTime: null },
        { attendeeId: 'A005', status: 'NOT_CHECKED_IN', registrationDate: '2026-03-02', checkInTime: null }
    ],
    'EVT005': [
        { attendeeId: 'A001', status: 'CHECKED_IN', registrationDate: '2026-01-15', checkInTime: '2026-01-28T14:05:00' },
        { attendeeId: 'A003', status: 'CHECKED_IN', registrationDate: '2026-01-18', checkInTime: '2026-01-28T14:10:00' },
        { attendeeId: 'A005', status: 'NOT_CHECKED_IN', registrationDate: '2026-01-20', checkInTime: null }
    ]
};

// ===== AUTHENTICATION FUNCTIONS =====

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.querySelector('input[name="role"]:checked').value;
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing in...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Validate credentials
        const user = MOCK_USERS[email];
        
        if (user && user.password === password && user.role === role) {
            // Store user data in localStorage (simulating JWT token)
            localStorage.setItem('authToken', btoa(JSON.stringify(user)));
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userName', user.name);
            
            // Show success message
            showAlert('success', 'Login successful! Redirecting...', 'alertContainer');
            
            // Redirect to appropriate dashboard
            setTimeout(() => {
                if (role === 'attendee') {
                    window.location.href = 'attendee-dashboard.html';
                } else {
                    window.location.href = 'organizer-dashboard.html';
                }
            }, 1000);
        } else {
            // Show error message
            showAlert('danger', 'Invalid email, password, or role. Please try again.', 'alertContainer');
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }, 1000);
}

// Handle Logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear localStorage
        localStorage.clear();
        
        // Redirect to login page
        window.location.href = 'index.html';
    }
}

// Check Authentication
function checkAuthentication(requiredRole) {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!authToken || !userRole) {
        // Not authenticated, redirect to login
        window.location.href = 'index.html';
        return false;
    }
    
    if (requiredRole && userRole !== requiredRole) {
        // Wrong role, redirect to appropriate dashboard
        alert('Access denied. Redirecting to your dashboard.');
        if (userRole === 'attendee') {
            window.location.href = 'attendee-dashboard.html';
        } else {
            window.location.href = 'organizer-dashboard.html';
        }
        return false;
    }
    
    // Update user name in navbar
    const userName = localStorage.getItem('userName');
    const userNameElements = document.querySelectorAll('#userName, #userGreeting');
    userNameElements.forEach(el => {
        if (el.id === 'userGreeting') {
            el.textContent = userName.split(' ')[0]; // First name only for greeting
        } else {
            el.textContent = userName;
        }
    });
    
    return true;
}

// ===== UTILITY FUNCTIONS =====

// Show Alert
function showAlert(type, message, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    container.innerHTML = '';
    container.appendChild(alertDiv);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format Time
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Format DateTime
function formatDateTime(datetimeString) {
    if (!datetimeString) return 'N/A';
    const date = new Date(datetimeString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Get Event Status
function getEventStatus(eventDate) {
    const today = new Date();
    const event = new Date(eventDate);
    
    // Reset time to compare only dates
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    
    if (event > today) {
        return 'upcoming';
    } else if (event < today) {
        return 'completed';
    } else {
        return 'active';
    }
}

// Toggle Password Visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('bi-eye');
        toggleIcon.classList.add('bi-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('bi-eye-slash');
        toggleIcon.classList.add('bi-eye');
    }
}

// Fill Demo Credentials
function fillDemoCredentials(role) {
    const email = role === 'attendee' ? 'attendee@test.com' : 'organizer@test.com';
    const password = 'password123';
    
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
    
    // Select appropriate role
    if (role === 'attendee') {
        document.getElementById('roleAttendee').checked = true;
    } else {
        document.getElementById('roleOrganizer').checked = true;
    }
    
    // Show feedback
    const emailInput = document.getElementById('email');
    emailInput.style.borderColor = '#198754';
    setTimeout(() => {
        emailInput.style.borderColor = '';
    }, 1000);
}

// ===== ATTENDEE DASHBOARD FUNCTIONS =====

// Load Attendee Dashboard
function loadAttendeeDashboard() {
    const userId = localStorage.getItem('userId');
    
    // Get user's registered events
    const userAttendance = MOCK_ATTENDANCE.filter(a => a.attendeeId === userId);
    const userEvents = userAttendance.map(a => {
        const event = MOCK_EVENTS.find(e => e.id === a.eventId);
        return {
            ...event,
            attendanceStatus: a.status,
            checkInTime: a.timestamp
        };
    });
    
    // Calculate statistics
    const totalEvents = userEvents.length;
    const attendedEvents = userEvents.filter(e => e.attendanceStatus === 'CHECKED_IN').length;
    const upcomingEvents = userEvents.filter(e => getEventStatus(e.date) === 'upcoming').length;
    const attendanceRate = totalEvents > 0 ? Math.round((attendedEvents / totalEvents) * 100) : 0;
    
    // Update summary cards
    updateAttendeeSummary(totalEvents, attendedEvents, upcomingEvents, attendanceRate);
    
    // Load events table
    loadAttendeeEvents(userEvents);
    
    // Load recent activity
    loadRecentActivity(userEvents);
}

// Update Attendee Summary
function updateAttendeeSummary(total, attended, upcoming, rate) {
    // Update sidebar stats
    document.getElementById('totalEvents').textContent = total;
    document.getElementById('attendedEvents').textContent = attended;
    document.getElementById('upcomingEvents').textContent = upcoming;
    
    // Update main cards
    document.getElementById('cardTotalEvents').textContent = total;
    document.getElementById('cardAttended').textContent = attended;
    document.getElementById('cardUpcoming').textContent = upcoming;
    document.getElementById('cardAttendanceRate').textContent = rate + '%';
}

// Load Attendee Events
function loadAttendeeEvents(events) {
    const tbody = document.getElementById('eventsTableBody');
    if (!tbody) return;
    
    if (events.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-5">
                    <div class="no-data-state">
                        <i class="bi bi-calendar-x"></i>
                        <h4>No Events Found</h4>
                        <p>You haven't registered for any events yet.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = events.map(event => {
        const status = getEventStatus(event.date);
        const statusBadge = status === 'upcoming' ? 'status-upcoming' : 
                          status === 'active' ? 'status-active' : 'status-completed';
        
        const attendanceBadge = event.attendanceStatus === 'CHECKED_IN' ? 
            'status-checked-in' : 'status-not-checked-in';
        
        const attendanceText = event.attendanceStatus === 'CHECKED_IN' ? 
            '<i class="bi bi-check-circle-fill"></i> Checked In' : 
            '<i class="bi bi-x-circle-fill"></i> Not Checked In';
        
        return `
            <tr data-event-id="${event.id}" data-status="${status}">
                <td>
                    <strong>${event.name}</strong><br>
                    <small class="text-muted">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</small>
                </td>
                <td>
                    <i class="bi bi-calendar"></i> ${formatDate(event.date)}<br>
                    <small class="text-muted"><i class="bi bi-clock"></i> ${formatTime(event.time)}</small>
                </td>
                <td>
                    <i class="bi bi-geo-alt"></i> ${event.venue}
                </td>
                <td>
                    <span class="status-badge ${statusBadge}">
                        ${status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </td>
                <td>
                    <span class="status-badge ${attendanceBadge}">
                        ${attendanceText}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary btn-action" 
                            onclick="viewAttendanceDetails('${event.id}')">
                        <i class="bi bi-info-circle"></i> Details
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Filter Events (Attendee)
function filterEvents(filter) {
    const rows = document.querySelectorAll('#eventsTableBody tr[data-status]');
    
    rows.forEach(row => {
        const status = row.getAttribute('data-status');
        
        if (filter === 'all') {
            row.style.display = '';
        } else if (filter === 'upcoming' && status === 'upcoming') {
            row.style.display = '';
        } else if (filter === 'past' && (status === 'completed' || status === 'active')) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// View Attendance Details
function viewAttendanceDetails(eventId) {
    const userId = localStorage.getItem('userId');
    const event = MOCK_EVENTS.find(e => e.id === eventId);
    const attendance = MOCK_ATTENDANCE.find(a => a.eventId === eventId && a.attendeeId === userId);
    
    if (!event || !attendance) return;
    
    const modalContent = document.getElementById('modalContent');
    const status = attendance.status === 'CHECKED_IN';
    
    modalContent.innerHTML = `
        <div class="text-center mb-4">
            <div class="event-type-icon event-type-${event.type} mb-3" style="width: 80px; height: 80px; margin: 0 auto; font-size: 2rem;">
                <i class="bi bi-calendar-event"></i>
            </div>
            <h3>${event.name}</h3>
            <p class="text-muted">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</p>
        </div>
        
        <hr>
        
        <div class="row">
            <div class="col-6 mb-3">
                <strong>Date:</strong><br>
                <i class="bi bi-calendar"></i> ${formatDate(event.date)}
            </div>
            <div class="col-6 mb-3">
                <strong>Time:</strong><br>
                <i class="bi bi-clock"></i> ${formatTime(event.time)}
            </div>
            <div class="col-12 mb-3">
                <strong>Venue:</strong><br>
                <i class="bi bi-geo-alt"></i> ${event.venue}
            </div>
            <div class="col-12 mb-3">
                <strong>Description:</strong><br>
                ${event.description}
            </div>
        </div>
        
        <hr>
        
        <div class="text-center">
            <h5>Your Attendance Status</h5>
            <div class="status-badge ${status ? 'status-checked-in' : 'status-not-checked-in'}" style="font-size: 1.1rem; padding: 15px 30px; margin: 20px 0;">
                ${status ? '<i class="bi bi-check-circle-fill"></i> Checked In' : '<i class="bi bi-x-circle-fill"></i> Not Checked In'}
            </div>
            ${status ? `<p class="text-muted">Check-in time: ${formatDateTime(attendance.timestamp)}</p>` : ''}
        </div>
    `;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('attendanceModal'));
    modal.show();
}

// Load Recent Activity
function loadRecentActivity(events) {
    const timeline = document.getElementById('activityTimeline');
    if (!timeline) return;
    
    // Sort events by date (most recent first)
    const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Take only the 5 most recent
    const recentEvents = sortedEvents.slice(0, 5);
    
    if (recentEvents.length === 0) {
        timeline.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="bi bi-clock-history"></i>
                <p>No recent activity</p>
            </div>
        `;
        return;
    }
    
    timeline.innerHTML = recentEvents.map(event => {
        const isCheckedIn = event.attendanceStatus === 'CHECKED_IN';
        const iconClass = isCheckedIn ? 'bg-success' : 'bg-warning';
        const icon = isCheckedIn ? 'bi-check-circle-fill' : 'bi-clock-history';
        
        return `
            <div class="activity-item">
                <div class="activity-icon ${iconClass}">
                    <i class="bi ${icon}"></i>
                </div>
                <div class="activity-content">
                    <h6>${event.name}</h6>
                    <p>${isCheckedIn ? 'You checked in to this event' : 'You registered for this event'}</p>
                    <div class="activity-time">
                        <i class="bi bi-calendar"></i> ${formatDate(event.date)}
                        ${isCheckedIn ? ` • Checked in at ${formatDateTime(event.checkInTime)}` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Refresh Dashboard
function refreshDashboard() {
    const userRole = localStorage.getItem('userRole');
    
    // Show loading state
    const btn = event.target;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
    btn.disabled = true;
    
    // Simulate refresh delay
    setTimeout(() => {
        if (userRole === 'attendee') {
            loadAttendeeDashboard();
        } else {
            loadOrganizerDashboard();
        }
        
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        
        // Show success toast
        showAlert('success', 'Dashboard refreshed successfully!', 'alertContainer');
    }, 500);
}

// ===== ORGANIZER DASHBOARD FUNCTIONS =====

// Load Organizer Dashboard
function loadOrganizerDashboard() {
    const organizerId = localStorage.getItem('userId');
    
    // Get organizer's events
    const organizerEvents = MOCK_EVENTS.filter(e => e.organizerId === organizerId);
    
    // Calculate statistics
    const totalEvents = organizerEvents.length;
    const activeEvents = organizerEvents.filter(e => getEventStatus(e.date) !== 'completed').length;
    const totalAttendees = organizerEvents.reduce((sum, e) => sum + e.registered, 0);
    
    // Calculate average attendance
    let totalCapacity = 0;
    let totalRegistered = 0;
    organizerEvents.forEach(e => {
        totalCapacity += e.capacity;
        totalRegistered += e.registered;
    });
    const avgAttendance = totalCapacity > 0 ? Math.round((totalRegistered / totalCapacity) * 100) : 0;
    
    // Update summary
    updateOrganizerSummary(totalEvents, activeEvents, totalAttendees, avgAttendance);
    
    // Load events table
    loadOrganizerEvents(organizerEvents);
    
    // Populate event selector
    populateEventSelector(organizerEvents);
    
    // Load charts
    loadAnalyticsCharts(organizerEvents);
}

// Update Organizer Summary
function updateOrganizerSummary(total, active, attendees, avg) {
    // Update sidebar stats
    document.getElementById('totalEventsCreated').textContent = total;
    document.getElementById('totalAttendees').textContent = attendees;
    document.getElementById('activeEvents').textContent = active;
    
    // Update main cards
    document.getElementById('cardTotalEvents').textContent = total;
    document.getElementById('cardActiveEvents').textContent = active;
    document.getElementById('cardTotalAttendees').textContent = attendees;
    document.getElementById('cardAvgAttendance').textContent = avg + '%';
}

// Load Organizer Events
function loadOrganizerEvents(events) {
    const tbody = document.getElementById('organizerEventsTableBody');
    if (!tbody) return;
    
    if (events.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-5">
                    <div class="no-data-state">
                        <i class="bi bi-calendar-x"></i>
                        <h4>No Events Created</h4>
                        <p>Create your first event to get started!</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = events.map(event => {
        const status = getEventStatus(event.date);
        const statusBadge = status === 'upcoming' ? 'status-upcoming' : 
                          status === 'active' ? 'status-active' : 'status-completed';
        
        const capacityPercent = (event.registered / event.capacity) * 100;
        const capacityClass = capacityPercent >= 80 ? 'capacity-high' : 
                            capacityPercent >= 50 ? 'capacity-medium' : 'capacity-low';
        
        return `
            <tr data-event-id="${event.id}" data-status="${status}">
                <td>
                    <strong>${event.name}</strong><br>
                    <small class="text-muted">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</small>
                </td>
                <td>
                    <i class="bi bi-calendar"></i> ${formatDate(event.date)}<br>
                    <small class="text-muted"><i class="bi bi-clock"></i> ${formatTime(event.time)}</small>
                </td>
                <td>
                    <i class="bi bi-geo-alt"></i> ${event.venue}
                </td>
                <td>${event.capacity}</td>
                <td>
                    <span class="capacity-indicator ${capacityClass}">
                        ${event.registered} (${Math.round(capacityPercent)}%)
                    </span>
                </td>
                <td>
                    <div class="progress" style="height: 20px;">
                        <div class="progress-bar" role="progressbar" 
                             style="width: ${capacityPercent}%"
                             aria-valuenow="${capacityPercent}" aria-valuemin="0" aria-valuemax="100">
                            ${Math.round(capacityPercent)}%
                        </div>
                    </div>
                </td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" onclick="viewEventDetails('${event.id}')">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-outline-secondary" onclick="editEvent('${event.id}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Filter Organizer Events
function filterOrganizerEvents(filter) {
    const rows = document.querySelectorAll('#organizerEventsTableBody tr[data-status]');
    
    rows.forEach(row => {
        const status = row.getAttribute('data-status');
        
        if (filter === 'all') {
            row.style.display = '';
        } else if (filter === 'active' && (status === 'upcoming' || status === 'active')) {
            row.style.display = '';
        } else if (filter === 'completed' && status === 'completed') {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Populate Event Selector
function populateEventSelector(events) {
    const selector = document.getElementById('selectEvent');
    if (!selector) return;
    
    selector.innerHTML = '<option value="">Choose an event...</option>' + 
        events.map(event => `
            <option value="${event.id}">${event.name} - ${formatDate(event.date)}</option>
        `).join('');
}

// Load Event Attendance
function loadEventAttendance() {
    const eventId = document.getElementById('selectEvent').value;
    const tbody = document.getElementById('attendanceTableBody');
    
    if (!eventId) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">
                    <i class="bi bi-info-circle"></i> Select an event to view attendance
                </td>
            </tr>
        `;
        return;
    }
    
    const attendance = MOCK_EVENT_ATTENDANCE[eventId] || [];
    
    if (attendance.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4">
                    <div class="no-data-state">
                        <i class="bi bi-people"></i>
                        <h5>No Attendees</h5>
                        <p>No one has registered for this event yet.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = attendance.map(att => {
        const attendee = MOCK_ATTENDEES.find(a => a.id === att.attendeeId);
        if (!attendee) return '';
        
        const statusBadge = att.status === 'CHECKED_IN' ? 'status-checked-in' : 'status-not-checked-in';
        const statusText = att.status === 'CHECKED_IN' ? 
            '<i class="bi bi-check-circle-fill"></i> Checked In' : 
            '<i class="bi bi-x-circle-fill"></i> Not Checked In';
        
        return `
            <tr>
                <td><strong>${attendee.name}</strong></td>
                <td>${attendee.email}</td>
                <td><small>${formatDate(att.registrationDate)}</small></td>
                <td><span class="status-badge ${statusBadge}">${statusText}</span></td>
                <td>${att.checkInTime ? formatDateTime(att.checkInTime) : 'N/A'}</td>
                <td>
                    <button class="btn btn-sm ${att.status === 'CHECKED_IN' ? 'btn-danger' : 'btn-success'} btn-action"
                            onclick="toggleAttendance('${eventId}', '${att.attendeeId}', '${att.status}')">
                        <i class="bi bi-${att.status === 'CHECKED_IN' ? 'x-circle' : 'check-circle'}"></i>
                        ${att.status === 'CHECKED_IN' ? 'Undo' : 'Check In'}
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Toggle Attendance
function toggleAttendance(eventId, attendeeId, currentStatus) {
    const newStatus = currentStatus === 'CHECKED_IN' ? 'NOT_CHECKED_IN' : 'CHECKED_IN';
    
    // Update mock data
    const attendance = MOCK_EVENT_ATTENDANCE[eventId].find(a => a.attendeeId === attendeeId);
    if (attendance) {
        attendance.status = newStatus;
        attendance.checkInTime = newStatus === 'CHECKED_IN' ? new Date().toISOString() : null;
    }
    
    // Show success message
    const attendee = MOCK_ATTENDEES.find(a => a.id === attendeeId);
    const message = newStatus === 'CHECKED_IN' ? 
        `${attendee.name} marked as checked in successfully!` :
        `${attendee.name} check-in status removed.`;
    
    showAlert('success', message, 'alertContainer');
    
    // Reload attendance table
    loadEventAttendance();
}

// Search Attendees
function searchAttendees() {
    const searchTerm = document.getElementById('searchAttendee').value.toLowerCase();
    const rows = document.querySelectorAll('#attendanceTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Handle Create Event
function handleCreateEvent(event) {
    event.preventDefault();
    
    const eventData = {
        id: 'EVT' + String(MOCK_EVENTS.length + 1).padStart(3, '0'),
        name: document.getElementById('eventName').value,
        type: document.getElementById('eventType').value,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        venue: document.getElementById('eventVenue').value,
        capacity: parseInt(document.getElementById('eventCapacity').value),
        registered: 0,
        description: document.getElementById('eventDescription').value,
        organizerId: localStorage.getItem('userId'),
        status: 'upcoming'
    };
    
    // Add to mock data
    MOCK_EVENTS.push(eventData);
    
    // Show success alert
    const alertDiv = document.getElementById('createEventAlert');
    alertDiv.style.display = 'block';
    
    // Reset form after 2 seconds
    setTimeout(() => {
        document.getElementById('createEventForm').reset();
        alertDiv.style.display = 'none';
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createEventModal'));
        modal.hide();
        
        // Reload dashboard
        loadOrganizerDashboard();
        
        // Show main success message
        showAlert('success', `Event "${eventData.name}" created successfully!`, 'alertContainer');
    }, 2000);
}

// View Event Details
function viewEventDetails(eventId) {
    const event = MOCK_EVENTS.find(e => e.id === eventId);
    if (!event) return;
    
    alert(`Event Details:\n\nName: ${event.name}\nType: ${event.type}\nDate: ${formatDate(event.date)}\nTime: ${formatTime(event.time)}\nVenue: ${event.venue}\nCapacity: ${event.capacity}\nRegistered: ${event.registered}\n\nDescription: ${event.description}`);
}

// Edit Event (Dummy)
function editEvent(eventId) {
    alert('Edit functionality will be implemented with backend integration.\n\nEvent ID: ' + eventId);
}

// Load Analytics Charts
function loadAnalyticsCharts(events) {
    // This is a dummy implementation - charts would be rendered with actual data
    // For now, just log that charts would be loaded
    console.log('Analytics charts would be loaded here with Chart.js');
    console.log('Events data:', events);
    
    // You can implement Chart.js charts here if needed
}

// ===== PAGE INITIALIZATION =====

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for event creation to today
    const eventDateInput = document.getElementById('eventDate');
    if (eventDateInput) {
        const today = new Date().toISOString().split('T')[0];
        eventDateInput.setAttribute('min', today);
    }
});
