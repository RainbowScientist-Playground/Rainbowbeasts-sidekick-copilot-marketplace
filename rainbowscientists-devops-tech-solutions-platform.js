// Tech Solutions Marketplace Platform
// Full-stack application with React frontend and Node.js backend

// ----- FRONTEND (React with TypeScript) -----

// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import MedicalSpa from './components/solutions/MedicalSpa';
import SolarEnergyCRM from './components/solutions/SolarEnergyCRM';
import WoundCareTech from './components/solutions/WoundCareTech';
import DevPlatform from './components/solutions/DevPlatform';
import Marketplace from './components/Marketplace';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserProfile from './components/users/UserProfile';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './styles/App.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/medical-spa" 
                element={
                  <ProtectedRoute>
                    <MedicalSpa />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/solar-crm" 
                element={
                  <ProtectedRoute>
                    <SolarEnergyCRM />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/wound-care" 
                element={
                  <ProtectedRoute>
                    <WoundCareTech />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dev-platform" 
                element={
                  <ProtectedRoute>
                    <DevPlatform />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
              </div>
            </div>
          );
        };
        
        export default DevPlatform;
      </BrowserRouter>
    </AuthProvider>
  );
};


// src/components/Marketplace.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Solution } from '../types';
import '../styles/Marketplace.css';

/**
 * Marketplace component displays a searchable and filterable list of tech solutions.
 *
 * Features:
 * - Fetches solutions from an API on mount.
 * - Allows searching solutions by name or description.
 * - Filters solutions by category.
 * - Displays a grid of solution cards with image, name, description, category, and price.
 * - Shows featured solutions with quick links.
 * - Handles loading and empty states.
 *
 * @component
 * @returns {JSX.Element} The rendered Marketplace component.
 */
function Marketplace() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await api.get('/solutions');
        setSolutions(response.data);
      } catch (error) {
        console.error('Error fetching solutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const filteredSolutions = solutions.filter(solution => {
    const matchesSearch = solution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solution.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || solution.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'medical', label: 'Medical & Healthcare' },
    { value: 'energy', label: 'Energy Solutions' },
    { value: 'development', label: 'Development Tools' },
    { value: 'technology', label: 'Advanced Technology' }
  ];

  if (loading) return <div className="loading">Loading solutions...</div>;

  return (
    <div className="marketplace-container">
      <h1>Tech Solutions Marketplace</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search solutions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input" />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div className="solutions-grid">
        {filteredSolutions.length > 0 ? (
          filteredSolutions.map(solution => (
            <div key={solution.id} className="solution-card">
              <img src={solution.imageUrl} alt={solution.name} />
              <div className="solution-info">
                <h3>{solution.name}</h3>
                <p className="solution-description">{solution.description}</p>
                <div className="solution-meta">
                  <span className="solution-category">{solution.category}</span>
                  <span className="solution-price">${solution.price}</span>
                </div>
                <Link to={solution.path} className="view-button">View Details</Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No solutions found matching your criteria</div>
        )}
      </div>

      <div className="featured-solutions">
        <h2>Featured Solutions</h2>
        <div className="featured-cards">
          <div className="featured-card">
            <h3>Medical Spa Management</h3>
            <p>Complete solution for spa management, appointments, and client tracking</p>
            <Link to="/medical-spa" className="featured-link">Learn More</Link>
          </div>
          <div className="featured-card">
            <h3>Solar Energy CRM</h3>
            <p>Customer management tailored for solar energy companies</p>
            <Link to="/solar-crm" className="featured-link">Learn More</Link>
          </div>
          <div className="featured-card">
            <h3>Advanced Wound Care</h3>
            <p>Cutting-edge wound treatment tracking and management</p>
            <Link to="/wound-care" className="featured-link">Learn More</Link>
          </div>
          <div className="featured-card">
            <h3>Developer Platform</h3>
            <p>Tools and resources for tech developers</p>
            <Link to="/dev-platform" className="featured-link">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Marketplace };

// src/components/solutions/MedicalSpa.tsx
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../../styles/MedicalSpa.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MedicalSpa = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: 'Facial Treatment - John Doe',
      start: new Date(2025, 1, 28, 10, 0),
      end: new Date(2025, 1, 28, 11, 0),
    },
    {
      id: 2,
      title: 'Massage - Jane Smith',
      start: new Date(2025, 1, 28, 14, 0),
      end: new Date(2025, 1, 28, 15, 30),
    },
  ]);
  
  const [clients, setClients] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-123-4567', lastVisit: '2025-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-987-6543', lastVisit: '2025-02-01' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '555-456-7890', lastVisit: '2025-02-10' },
  ]);

  const [treatments, setTreatments] = useState([
    { id: 1, name: 'Facial Treatment', duration: 60, price: 85 },
    { id: 2, name: 'Deep Tissue Massage', duration: 90, price: 120 },
    { id: 3, name: 'Laser Therapy', duration: 45, price: 150 },
    { id: 4, name: 'Skin Rejuvenation', duration: 75, price: 200 },
  ]);

  return (
    <div className="medical-spa-container">
      <h1>Medical Spa Management Solution</h1>
      
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Today's Appointments</h3>
          <p className="summary-number">8</p>
        </div>
        <div className="summary-card">
          <h3>Active Clients</h3>
          <p className="summary-number">127</p>
        </div>
        <div className="summary-card">
          <h3>Monthly Revenue</h3>
          <p className="summary-number">$12,450</p>
        </div>
        <div className="summary-card">
          <h3>Treatment Options</h3>
          <p className="summary-number">{treatments.length}</p>
        </div>
      </div>
      
      <div className="spa-main-content">
        <div className="calendar-section">
          <h2>Appointment Calendar</h2>
          <Calendar
            localizer={localizer}
            events={appointments}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
        
        <div className="client-section">
          <h2>Client Management</h2>
          <table className="client-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Last Visit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.lastVisit}</td>
                  <td>
                    <button className="action-button edit">Edit</button>
                    <button className="action-button book">Book</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-client-button">Add New Client</button>
        </div>
        
        <div className="treatments-section">
          <h2>Treatment Options</h2>
          <div className="treatments-grid">
            {treatments.map(treatment => (
              <div key={treatment.id} className="treatment-card">
                <h3>{treatment.name}</h3>
                <p>Duration: {treatment.duration} minutes</p>
                <p>Price: ${treatment.price}</p>
                <button className="edit-treatment">Edit</button>
              </div>
            ))}
          </div>
          <button className="add-treatment-button">Add New Treatment</button>
        </div>
      </div>
    </div>
  );
};

export { MedicalSpa };

// src/components/solutions/SolarEnergyCRM.tsx
import React, { useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/SolarCRM.css';

const SolarEnergyCRM = () => {
  const [leads, setLeads] = useState([
    { id: 1, name: 'Michael Brown', email: 'michael@example.com', phone: '555-111-2222', status: 'New', source: 'Website' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '555-333-4444', status: 'Contacted', source: 'Referral' },
    { id: 3, name: 'David Miller', email: 'david@example.com', phone: '555-555-6666', status: 'Qualified', source: 'Trade Show' },
    { id: 4, name: 'Lisa Garcia', email: 'lisa@example.com', phone: '555-777-8888', status: 'Proposal', source: 'Google Ads' },
    { id: 5, name: 'James Taylor', email: 'james@example.com', phone: '555-999-0000', status: 'Closed Won', source: 'Facebook' },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, client: 'Brown Residence', location: '123 Main St', systemSize: '8.5kW', status: 'In Progress', completionDate: '2025-05-15' },
    { id: 2, client: 'Wilson Building', location: '456 Oak Ave', systemSize: '25kW', status: 'Scheduled', completionDate: '2025-06-20' },
    { id: 3, client: 'Miller Farm', location: '789 Rural Rd', systemSize: '40kW', status: 'Completed', completionDate: '2025-02-10' },
  ]);

  const salesData = [
    { month: 'Jan', sales: 65000 },
    { month: 'Feb', sales: 78000 },
    { month: 'Mar', sales: 90000 },
    { month: 'Apr', sales: 81000 },
    { month: 'May', sales: 95000 },
    { month: 'Jun', sales: 110000 },
  ];

  const leadStatusData = [
    { name: 'New', value: 25 },
    { name: 'Contacted', value: 30 },
    { name: 'Qualified', value: 20 },
    { name: 'Proposal', value: 15 },
    { name: 'Closed Won', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="solar-crm-container">
      <h1>Solar Energy CRM Solution</h1>
      
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Leads</h3>
          <p className="summary-number">52</p>
        </div>
        <div className="summary-card">
          <h3>Active Projects</h3>
          <p className="summary-number">8</p>
        </div>
        <div className="summary-card">
          <h3>This Month's Sales</h3>
          <p className="summary-number">$95,000</p>
        </div>
        <div className="summary-card">
          <h3>Completed Installations</h3>
          <p className="summary-number">127</p>
        </div>
      </div>
      
      <div className="crm-main-content">
        <div className="analytics-section">
          <h2>Sales Analytics</h2>
          <div className="charts-container">
            <div className="chart-card">
              <h3>Monthly Sales</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart-card">
              <h3>Lead Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leadStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {leadStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="leads-section">
          <h2>Lead Management</h2>
          <table className="leads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Source</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>
                    <span className={`status-badge ${lead.status.toLowerCase().replace(' ', '-')}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>{lead.source}</td>
                  <td>
                    <button className="action-button edit">Edit</button>
                    <button className="action-button convert">Convert</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-lead-button">Add New Lead</button>
        </div>
        
        <div className="projects-section">
          <h2>Solar Projects</h2>
          <table className="projects-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Location</th>
                <th>System Size</th>
                <th>Status</th>
                <th>Completion Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td>{project.client}</td>
                  <td>{project.location}</td>
                  <td>{project.systemSize}</td>
                  <td>
                    <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>{project.completionDate}</td>
                  <td>
                    <button className="action-button view">View</button>
                    <button className="action-button update">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-project-button">Add New Project</button>
        </div>
      </div>
    </div>
  );
};

export { SolarEnergyCRM };

// src/components/solutions/WoundCareTech.tsx
import React, { useState } from 'react';
import '../../styles/WoundCare.css';

const WoundCareTech = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Thomas Anderson', age: 65, woundType: 'Diabetic Ulcer', location: 'Lower Right Leg', status: 'Treatment' },
    { id: 2, name: 'Eleanor Martinez', age: 78, woundType: 'Pressure Ulcer', location: 'Sacrum', status: 'Healing' },
    { id: 3, name: 'Robert Chen', age: 45, woundType: 'Surgical Wound', location: 'Abdomen', status: 'Monitoring' },
  ]);

  const [treatments, setTreatments] = useState([
    { id: 1, name: 'Negative Pressure Therapy', description: 'Uses vacuum to promote healing in acute/chronic wounds', suitableFor: ['Diabetic Ulcer', 'Surgical Wound'] },
    { id: 2, name: 'Hydrocolloid Dressing', description: 'Creates moist environment to promote healing', suitableFor: ['Pressure Ulcer', 'Minor Burns'] },
    { id: 3, name: 'Advanced Antimicrobial', description: 'Fights infection while supporting tissue repair', suitableFor: ['Infected Wounds', 'Diabetic Ulcer'] },
    { id: 4, name: 'Bioengineered Skin', description: 'Provides growth factors and cellular elements to chronic wounds', suitableFor: ['Venous Ulcers', 'Chronic Non-healing Wounds'] },
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Mock wound tracking data
  const woundProgressData = [
    { week: 1, size: 5.2, inflammation: 'High', tissue: 'Necrotic' },
    { week: 2, size: 4.8, inflammation: 'High', tissue: 'Slough' },
    { week: 3, size: 4.1, inflammation: 'Medium', tissue: 'Granulation' },
    { week: 4, size: 3.5, inflammation: 'Low', tissue: 'Granulation' },
    { week: 5, size: 2.8, inflammation: 'Low', tissue: 'Epithelialization' },
    { week: 6, size: 2.0, inflammation: 'Minimal', tissue: 'Epithelialization' },
  ];

  return (
    <div className="wound-care-container">
      <h1>Advanced Wound Care Technology</h1>
      
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Active Patients</h3>
          <p className="summary-number">28</p>
        </div>
        <div className="summary-card">
          <h3>Treatment Plans</h3>
          <p className="summary-number">42</p>
        </div>
        <div className="summary-card">
          <h3>Success Rate</h3>
          <p className="summary-number">87%</p>
        </div>
        <div className="summary-card">
          <h3>Avg. Healing Time</h3>
          <p className="summary-number">5.2 Weeks</p>
        </div>
      </div>
      
      <div className="wound-care-main-content">
        <div className="patients-section">
          <h2>Patient Management</h2>
          <table className="patients-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Wound Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.woundType}</td>
                  <td>{patient.location}</td>
                  <td>
                    <span className={`status-badge ${patient.status.toLowerCase()}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="action-button view"
                      onClick={() => setSelectedPatient(patient.id === selectedPatient ? null : patient.id)}
                    >
                      {patient.id === selectedPatient ? 'Hide Details' : 'View Details'}
                    </button>
                    <button className="action-button update">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-patient-button">Add New Patient</button>
        </div>
        
        {selectedPatient && (
          <div className="patient-details">
            <h2>Wound Progression Tracking</h2>
            <div className="wound-tracking-container">
              <div className="wound-images">
                <h3>Wound Imagery</h3>
                <div className="image-gallery">
                  <div className="wound-image">
                    <p>Week 1</p>
                    <div className="image-placeholder">Image</div>
                  </div>
                  <div className="wound-image">
                    <p>Week 3</p>
                    <div className="image-placeholder">Image</div>
                  </div>
                  <div className="wound-image">
                    <p>Week 6</p>
                    <div className="image-placeholder">Image</div>
                  </div>
                </div>
              </div>
              
              <div className="wound-metrics">
                <h3>Healing Metrics</h3>
                <table className="metrics-table">
                  <thead>
                    <tr>
                      <th>Week</th>
                      <th>Size (cm²)</th>
                      <th>Inflammation</th>
                      <th>Tissue Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {woundProgressData.map((week, index) => (
                      <tr key={index}>
                        <td>{week.week}</td>
                        <td>{week.size}</td>
                        <td>{week.inflammation}</td>
                        <td>{week.tissue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <h3>Treatment Plan</h3>
            <div className="treatment-plan">
              <div className="treatment-schedule">
                <h4>Current Treatment Schedule</h4>
                <ul className="schedule-list">
                  <li>
                    <span className="treatment-name">Negative Pressure Therapy</span>
                    <span className="treatment-frequency">Daily dressing change</span>
                  </li>
                  <li>
                    <span className="treatment-name">Antimicrobial Solution</span>
                    <span className="treatment-frequency">Applied twice daily</span>
                  </li>
                  <li>
                    <span className="treatment-name">Compression Therapy</span>
                    <span className="treatment-frequency">Continuous wear</span>
                  </li>
                </ul>
              </div>
              
              <div className="treatment-notes">
                <h4>Clinical Notes</h4>
                <div className="notes-content">
                  <p><strong>Week 3 Update:</strong> Patient showing good signs of healing. Granulation tissue forming. Reduced exudate. Continue current treatment plan.</p>
                  <p><strong>Week 6 Follow-up:</strong> Significant improvement. Consider switching to hydrocolloid dressing for final healing phase.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="treatments-section">
          <h2>Treatment Technologies</h2>
          <div className="treatments-grid">
            {treatments.map(treatment => (
              <div key={treatment.id} className="treatment-card">
                <h3>{treatment.name}</h3>
                <p>{treatment.description}</p>
                <div className="suitable-for">
                  <h4>Suitable For:</h4>
                  <ul>
                    {treatment.suitableFor.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                </div>
                <button className="view-treatment-details">View Details</button>
              </div>
            ))}
          </div>
          <button className="add-treatment-button">Add New Treatment</button>
        </div>
      </div>
    </div>
  );
};

export default WoundCareTech;

// src/components/solutions/DevPlatform.tsx
import React, { useState } from 'react';
import '../../styles/DevPlatform.css';

const DevPlatform = () => {
  const [activeTab, setActiveTab] = useState('projects');
  
  const [projects, setProjects] = useState([
    { id: 1, name: 'Medical Records API', language: 'Node.js', status: 'In Progress', completion: 65 },
    { id: 2, name: 'Patient Portal', language: 'React', status: 'Planning', completion: 15 },
    { id: 3, name: 'Solar Analytics Dashboard', language: 'Python/Django', status: 'Completed', completion: 100 },
    { id: 4, name: 'Wound Image Recognition', language: 'Python/TensorFlow', status: 'In Progress', completion: 80 },
  ]);

  const [apis, setApis] = useState([
    { id: 1, name: 'Patient Records API', version: '2.3.1', endpoint: '/api/v2/patients', status: 'Active' },
    { id: 2, name: 'Medical Imaging API', version: '1.5.0', endpoint: '/api/v1/images', status: 'Active' },
    { id: 3, name: 'Solar System Metrics API', version: '3.0.1', endpoint: '/api/v3/solar-metrics', status: 'Active' },
    { id: 4, name: 'Wound Analysis API', version: '1.2.4', endpoint: '/api/v1/wound-analysis', status: 'Beta' },
  ]);

  return (
    <div className="dev-platform-container">
      <h1>Developer Platform</h1>
      
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Active Projects</h3>
          <p className="summary-number">12</p>
        </div>
      </div>