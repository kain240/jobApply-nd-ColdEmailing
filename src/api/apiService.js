// API service for handling all backend requests
// This file will include mock data for development and can be replaced with real API calls later

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Mock data for development
const MOCK_JOBS = [
    {
        id: '1',
        title: 'Frontend Developer',
        company: 'Tech Solutions Inc.',
        location: 'San Francisco, CA',
        salary: '$90,000 - $120,000',
        type: 'Full-time',
        description: 'We are looking for a skilled Frontend Developer proficient in React.js to join our dynamic team...',
        requirements: [
            'Proficiency in JavaScript, HTML5, and CSS3',
            '3+ years of experience with React.js',
            'Experience with state management (Redux, Context API)',
            'Knowledge of responsive design and cross-browser compatibility',
            'Strong problem-solving skills and attention to detail',
        ],
        postedDate: '2025-04-20',
        applicationDeadline: '2025-05-15',
        contactEmail: 'jobs@techsolutions.com',
    },
    {
        id: '2',
        title: 'Backend Engineer',
        company: 'DataStream',
        location: 'Remote',
        salary: '$100,000 - $140,000',
        type: 'Full-time',
        description: 'DataStream is seeking a Backend Engineer to develop and maintain our scalable API services...',
        requirements: [
            'Strong knowledge of Python and Flask/Django',
            'Experience with SQL databases and ORM frameworks',
            'Understanding of RESTful API design principles',
            'Familiarity with cloud platforms (AWS, GCP)',
            'Knowledge of containerization tools like Docker',
        ],
        postedDate: '2025-04-18',
        applicationDeadline: '2025-05-20',
        contactEmail: 'careers@datastream.io',
    },
    {
        id: '3',
        title: 'Full Stack Developer',
        company: 'Web Innovators',
        location: 'New York, NY',
        salary: '$110,000 - $150,000',
        type: 'Full-time',
        description: 'Join our team as a Full Stack Developer to build cutting-edge web applications...',
        requirements: [
            'Experience with JavaScript/TypeScript and React.js',
            'Backend experience with Node.js or Python',
            'Database knowledge (MongoDB, PostgreSQL)',
            'Understanding of CI/CD pipelines',
            'Excellent communication and teamwork skills',
        ],
        postedDate: '2025-04-22',
        applicationDeadline: '2025-05-30',
        contactEmail: 'hr@webinnovators.com',
    },
    {
        id: '4',
        title: 'UX/UI Designer',
        company: 'Creative Digital',
        location: 'Austin, TX',
        salary: '$85,000 - $110,000',
        type: 'Full-time',
        description: 'Creative Digital is looking for a talented UX/UI Designer to create exceptional user experiences...',
        requirements: [
            'Portfolio demonstrating UX/UI design skills',
            'Proficiency in design tools (Figma, Adobe XD)',
            'Understanding of user-centered design processes',
            'Experience with wireframing and prototyping',
            'Knowledge of current design trends and best practices',
        ],
        postedDate: '2025-04-15',
        applicationDeadline: '2025-05-25',
        contactEmail: 'design@creativedigital.com',
    },
    {
        id: '5',
        title: 'DevOps Engineer',
        company: 'CloudScale',
        location: 'Seattle, WA',
        salary: '$120,000 - $160,000',
        type: 'Full-time',
        description: 'CloudScale is seeking an experienced DevOps Engineer to optimize our infrastructure and deployment processes...',
        requirements: [
            'Experience with cloud platforms (AWS, Azure, GCP)',
            'Knowledge of infrastructure as code (Terraform, CloudFormation)',
            'Proficiency in containerization and orchestration (Docker, Kubernetes)',
            'Understanding of CI/CD pipelines and automation',
            'Strong scripting skills (Bash, Python)',
        ],
        postedDate: '2025-04-21',
        applicationDeadline: '2025-05-28',
        contactEmail: 'jobs@cloudscale.tech',
    },
];

const MOCK_SAVED_JOBS = [
    {
        id: '1',
        title: 'Frontend Developer',
        company: 'Tech Solutions Inc.',
        location: 'San Francisco, CA',
        salary: '$90,000 - $120,000',
        savedDate: '2025-04-25',
    },
    {
        id: '3',
        title: 'Full Stack Developer',
        company: 'Web Innovators',
        location: 'New York, NY',
        salary: '$110,000 - $150,000',
        savedDate: '2025-04-26',
    },
];

const MOCK_APPLICATIONS = [
    {
        id: '1',
        jobId: '1',
        jobTitle: 'Frontend Developer',
        company: 'Tech Solutions Inc.',
        status: 'Applied',
        applicationDate: '2025-04-27',
        notes: 'Applied through company website. Followed up with hiring manager on LinkedIn.',
    },
    {
        id: '2',
        jobId: '3',
        jobTitle: 'Full Stack Developer',
        company: 'Web Innovators',
        status: 'Interview Scheduled',
        applicationDate: '2025-04-26',
        interviewDate: '2025-05-10',
        notes: 'First round interview scheduled with technical team.',
    },
];

const MOCK_EMAIL_TEMPLATES = [
    {
        id: '1',
        title: 'Initial Connection Request',
        subject: 'Connecting with {{CompanyName}} - {{JobTitle}} Position',
        body: `Dear {{RecipientName}},

I hope this email finds you well. My name is {{UserName}} and I recently came across the {{JobTitle}} position at {{CompanyName}}. I am particularly impressed with your company's work on {{CompanyProject}} and believe my background in {{UserSkill}} aligns well with what you're looking for.

I'd love to learn more about this opportunity and how my experience could benefit your team. Would you be available for a brief call next week to discuss?

Thank you for your time and consideration.

Best regards,
{{UserName}}
{{UserEmail}}
{{UserPhone}}`,
        tags: ['connection', 'networking', 'initial contact'],
    },
    {
        id: '2',
        title: 'Follow-up After Application',
        subject: 'Following Up: {{JobTitle}} Application - {{UserName}}',
        body: `Dear {{RecipientName}},

I hope you're doing well. I recently submitted my application for the {{JobTitle}} position at {{CompanyName}} on {{ApplicationDate}} and wanted to follow up to express my continued interest.

After researching more about {{CompanyName}}'s recent {{CompanyAchievement}}, I'm even more excited about the possibility of joining your team and contributing to your ongoing success.

I'd be happy to provide any additional information that might be helpful in your decision-making process. Please don't hesitate to contact me if you have any questions.

Thank you for your consideration.

Best regards,
{{UserName}}
{{UserEmail}}
{{UserPhone}}`,
        tags: ['follow-up', 'application'],
    },
];

// Helper function to simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API service object
const apiService = {
    // Job search API
    searchJobs: async (query = '', filters = {}) => {
        try {
            // Replace with actual API call when backend is ready
            await delay(500); // Simulate network delay

            // Mock filtering logic
            let filteredJobs = [...MOCK_JOBS];

            if (query) {
                const lowerQuery = query.toLowerCase();
                filteredJobs = filteredJobs.filter(job =>
                    job.title.toLowerCase().includes(lowerQuery) ||
                    job.company.toLowerCase().includes(lowerQuery) ||
                    job.description.toLowerCase().includes(lowerQuery)
                );
            }

            if (filters.location) {
                filteredJobs = filteredJobs.filter(job =>
                    job.location.toLowerCase().includes(filters.location.toLowerCase())
                );
            }

            if (filters.jobType) {
                filteredJobs = filteredJobs.filter(job =>
                    job.type === filters.jobType
                );
            }

            return { success: true, jobs: filteredJobs };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Get job by ID
    getJobById: async (id) => {
        try {
            // Replace with actual API call when backend is ready
            await delay(300); // Simulate network delay

            const job = MOCK_JOBS.find(job => job.id === id);

            if (!job) {
                throw new Error('Job not found');
            }

            return { success: true, job };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Saved jobs API
    getSavedJobs: async () => {
        try {
            // Replace with actual API call when backend is ready
            await delay(300); // Simulate network delay

            return { success: true, savedJobs: MOCK_SAVED_JOBS };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    saveJob: async (jobId) => {
        try {
            // Replace with actual API call when backend is ready
            await delay(300); // Simulate network delay

            const job = MOCK_JOBS.find(job => job.id === jobId);

            if (!job) {
                throw new Error('Job not found');
            }

            // Check if already saved
            const alreadySaved = MOCK_SAVED_JOBS.some(saved => saved.id === jobId);

            if (!alreadySaved) {
                const savedJob = {
                    id: job.id,
                    title: job.title,
                    company: job.company,
                    location: job.location,
                    salary: job.salary,
                    savedDate: new Date().toISOString().split('T')[0],
                };

                MOCK_SAVED_JOBS.push(savedJob);
            }

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    unsaveJob: async (jobId) => {
        try {
            // Replace with actual API call when backend is ready
            await delay(300); // Simulate network delay

            const index = MOCK_SAVED_JOBS.findIndex(job => job.id === jobId);

            if (index !== -1) {
                MOCK_SAVED_JOBS.splice(index, 1);
            }

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Applications API
    getApplications: async () => {
        try {
            // Replace with actual API call when backend is ready
            await delay(300); // Simulate network delay

            return { success: true, applications: MOCK_APPLICATIONS };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    addApplication: async (applicationData) => {
        try {
            // Replace with actual API call when backend is ready
            await delay(300); // Simulate network delay

            const newApplication = {
                id: String(MOCK_APPLICATIONS.length + 1),
                ...applicationData,
                applicationDate: new Date().toISOString().split('T')[0],
            };

            MOCK_APPLICATIONS.push(newApplication);

            return { success: true, application: newApplication };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    updateApplication: async (id, applicationData) => {
        try {
            // Replace with actual API call when backend is ready
            await delay(300); // Simulate network delay

            const index = MOCK_APPLICATIONS.findIndex(app => app.id === id);

            if (index === -1) {
                throw new Error('Application not found');
            }

            MOCK_APPLICATIONS[index] = {
                ...MOCK_APPLICATIONS[index],
                ...applicationData,
            };

            return { success: true, application: MOCK_APPLICATIONS[index] };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deleteApplication: async (id) => {
        try {
            // Replace with actual API call when backend is ready
            await delay(300); // Simulate network delay

            const index = MOCK_APPLICATIONS.findIndex(app => app.id === id);

            if (index !== -1) {
                MOCK_APPLICATIONS.splice(index, 1);
            }

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Email templates API
    getEmailTemplates: async () => {
        try {
            // Replace with actual API call when backend is ready
            await delay(300); // Simulate network delay

            return { success: true, templates: MOCK_EMAIL_TEMPLATES };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    createEmailTemplate: async (templateData) => {
        try {
            // Replace with actual API call when backend is ready
            await delay(300); // Simulate network delay

            const newTemplate = {
                id: String(MOCK_EMAIL_TEMPLATES.length + 1),
                ...templateData,
            };

            MOCK_EMAIL_TEMPLATES.push(newTemplate);

            return { success: true, template: newTemplate };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    updateEmailTemplate: async (id, templateData) => {
        try {
            // Replace with actual API call when backend is ready
            await delay(300); // Simulate network delay

            const index = MOCK_EMAIL_TEMPLATES.findIndex(template => template.id === id);

            if (index === -1) {
                throw new Error('Template not found');
            }

            MOCK_EMAIL_TEMPLATES[index] = {
                ...MOCK_EMAIL_TEMPLATES[index],
                ...templateData,
            };

            return { success: true, template: MOCK_EMAIL_TEMPLATES[index] };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deleteEmailTemplate: async (id) => {
        try {
            // Replace with actual API call when backend is ready
            await delay(300); // Simulate network delay

            const index = MOCK_EMAIL_TEMPLATES.findIndex(template => template.id === id);

            if (index !== -1) {
                MOCK_EMAIL_TEMPLATES.splice(index, 1);
            }

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Generate cold email
    generateColdEmail: async (jobData, templateId = null) => {
        try {
            // Replace with actual API call when backend is ready
            await delay(800); // Simulate network delay

            // If templateId is provided, use that template as a base
            let emailTemplate = {
                subject: '',
                body: '',
            };

            if (templateId) {
                const template = MOCK_EMAIL_TEMPLATES.find(template => template.id === templateId);
                if (template) {
                    emailTemplate = {
                        subject: template.subject,
                        body: template.body,
                    };
                }
            } else {
                // Default template
                emailTemplate = {
                    subject: `Regarding the {{JobTitle}} position at {{CompanyName}}`,
                    body: `Dear {{RecipientName}},

I hope this email finds you well. My name is {{UserName}} and I am reaching out to express my interest in the {{JobTitle}} position at {{CompanyName}}.

With my background in {{UserSkill}} and experience in {{UserExperience}}, I believe I can contribute significantly to your team. I am particularly impressed with {{CompanyName}}'s work on {{CompanyProject}} and would love to be part of your innovative team.

I would appreciate the opportunity to discuss how my skills and experience align with your needs. Please let me know if you would be available for a brief conversation.

Thank you for your time and consideration.

Best regards,
{{UserName}}
{{UserEmail}}
{{UserPhone}}`,
                };
            }

            // Replace placeholders with actual data
            let processedSubject = emailTemplate.subject;
            let processedBody = emailTemplate.body;

            const replacements = {
                '{{JobTitle}}': jobData.jobTitle || '[Job Title]',
                '{{CompanyName}}': jobData.companyName || '[Company Name]',
                '{{RecipientName}}': jobData.recipientName || '[Recipient Name]',
                '{{UserName}}': jobData.userName || '[Your Name]',
                '{{UserEmail}}': jobData.userEmail || '[Your Email]',
                '{{UserPhone}}': jobData.userPhone || '[Your Phone]',
                '{{UserSkill}}': jobData.userSkill || '[Your Key Skill]',
                '{{UserExperience}}': jobData.userExperience || '[Your Relevant Experience]',
                '{{CompanyProject}}': jobData.companyProject || '[Company Project/Achievement]',
                '{{ApplicationDate}}': jobData.applicationDate || '[Application Date]',
                '{{CompanyAchievement}}': jobData.companyAchievement || '[Company Achievement]',
            };

            for (const [placeholder, value] of Object.entries(replacements)) {
                processedSubject = processedSubject.replace(new RegExp(placeholder, 'g'), value);
                processedBody = processedBody.replace(new RegExp(placeholder, 'g'), value);
            }

            return {
                success: true,
                email: {
                    subject: processedSubject,
                    body: processedBody,
                }
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
};

export default apiService;