import { PortfolioData } from '../core/models/portfolio.model';

// PORTFOLIO DATA — Edit this file to update your content

export const PORTFOLIO_DATA: PortfolioData = {

    // ── PERSONAL INFO ──────────────────────────────────────────
    personal: {
        name: 'Kausik Basak',
        title: 'Java Backend Developer',
        tagline: 'Building secure, scalable enterprise systems with Java & Spring Boot',
        email: 'kausikbasak1999@gmail.com',
        phone: '+91 99034 11822',
        location: 'Kolkata, India',
        linkedin: 'https://linkedin.com/in/basak-kausik',
        github: 'https://github.com/kbasak/',     // Add your GitHub URL here
        profilePhoto: 'assets/images/MyImg.jpg',
        resumeLink: 'assets/resume/Kausik_Resume.pdf',
    },

    // ── SKILL GROUPS ───────────────────────────────────────────
    skillGroups: [
        {
            groupName: 'Backend',
            icon: '⚙️',
            category: 'backend',
            skills: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'JDBC', 'Microservices', 'RESTful APIs'],
        },
        {
            groupName: 'Frontend',
            icon: '🎨',
            category: 'frontend',
            skills: ['HTML', 'CSS', 'JavaScript', 'Angular', 'Thymeleaf'],
        },
        {
            groupName: 'Testing',
            icon: '🧪',
            category: 'testing',
            skills: ['JUnit', 'Mockito', 'Lombok'],
        },
        {
            groupName: 'Database',
            icon: '🗄️',
            category: 'database',
            skills: ['MySQL', 'LDAP', 'SQL Developer'],
        },
        {
            groupName: 'Cloud & DevOps',
            icon: '☁️',
            category: 'cloud',
            skills: ['AWS', 'OpenShift', 'Docker', 'Maven', 'Git'],
        },
        {
            groupName: 'Tools',
            icon: '🛠️',
            category: 'tools',
            skills: ['IntelliJ IDEA', 'VS Code', 'Postman', 'JIRA', 'GitHub Copilot'],
        },
    ],

    // ── EXPERIENCE ─────────────────────────────────────────────
    experience: [
        {
            company: 'Infosys Limited',
            role: 'Associate Consultant',
            duration: 'August 2024 – Present',
            location: 'Kolkata, India',
            isCurrent: true,
            highlights: [
                'Designed, developed, and enhanced RESTful APIs using Java and Spring Boot to support enterprise banking and financial workflows.',
                'Collaborated closely with business analysts and stakeholders to understand new requirements, feature enhancements, and ensure continuous delivery.',
                'Worked extensively on legacy system maintenance, resolving defects, improving application stability, and supporting post-production issues.',
                'Implemented secure authentication and authorization using LDAP and Spring Security, while contributing to UI enhancements using Thymeleaf and Angular.',
            ],
            techStack: ['Java', 'Spring Boot', 'Spring Security', 'LDAP', 'Angular', 'Thymeleaf', 'RESTful APIs'],
        },
        {
            company: 'Cognizant Technology Solutions',
            role: 'Programmer Analyst',
            duration: 'July 2022 – July 2024',
            location: 'Kolkata, India',
            isCurrent: false,
            highlights: [
                'Developed and enhanced backend services using Spring Boot and RESTful APIs, improving application scalability and maintainability.',
                'Created and executed unit and integration test cases using JUnit and Mockito, reducing regression issues and improving code quality.',
                'Contributed to UI development by building reusable components and supporting frontend–backend integration.',
                'Participated in Agile sprint activities, managing version control with Git and supporting debugging, testing, and deployment.',
            ],
            techStack: ['Java', 'Spring Boot', 'RESTful APIs', 'JUnit', 'Mockito', 'Git', 'Agile'],
        },
    ],

    // ── PROJECTS ───────────────────────────────────────────────
    projects: [
        {
            name: 'Credit Card Customer Care Application',
            client: 'Global Financial Services Provider',
            domain: 'Banking',
            description: 'Enterprise banking customer care application used by multiple banks across EMEA and APAC regions.',
            highlights: [
                'Implemented business role management and function-level configuration with Maker–Checker (user–manager) approval workflows.',
                'Designed and implemented RESTful APIs using Java, Spring, JDBC, and SQL.',
                'Enhanced and stabilized a legacy system by resolving critical defects and contributing to Angular UI improvements.',
            ],
            techStack: ['Java', 'Spring', 'JDBC', 'SQL', 'Angular'],
        },
        {
            name: 'Customizable Paystub Application',
            client: 'Global Financial Services Provider',
            domain: 'Fintech',
            description: 'Redesigned and migrated a customizable Paystub application as part of a legacy system modernization.',
            highlights: [
                'Redesigned as microservices using Spring Boot as part of a full legacy system migration.',
                'Implemented multi-organizational support with data persistence using Spring Data JPA and Hibernate.',
                'Developed secure admin and user portals using Thymeleaf with Spring Security authentication.',
            ],
            techStack: ['Spring Boot', 'Microservices', 'Spring Data JPA', 'Hibernate', 'Thymeleaf', 'Spring Security'],
        },
        {
            name: 'Healthcare Claim Settlement Portal',
            client: 'U.S.-based Healthcare & Financial Wellness Provider',
            domain: 'Healthcare',
            description: 'Digital portal automating healthcare claim settlement workflows for Health Savings and reimbursement accounts.',
            highlights: [
                'Developed backend automation for claim settlement using Spring Boot REST APIs.',
                'Consolidated Health Savings and reimbursement account data into a unified claim submission interface.',
                'Ensured reliable data persistence and transaction handling using Spring Data JPA and Hibernate.',
            ],
            techStack: ['Spring Boot', 'REST APIs', 'Spring Data JPA', 'Hibernate'],
        },
    ],

    // ── EDUCATION ──────────────────────────────────────────────
    education: {
        degree: 'Bachelor of Technology – Computer Science Engineering',
        institution: 'Bengal Institute of Technology (Techno India)',
        duration: 'August 2018 – June 2022',
        cgpa: '9.16',
        location: 'Kolkata, India',
    },

    // ── CERTIFICATIONS ─────────────────────────────────────────
    certifications: [
        {
            name: 'AWS Certified Cloud Practitioner',
            issuer: 'Amazon Web Services',
            year: '2024',
        },
        {
            name: 'Spring Security Fundamentals',
            issuer: 'Udemy',
            year: '2023',
        },
    ],

    // ── ACHIEVEMENTS ───────────────────────────────────────────
    achievements: [
        {
            title: 'Infosys Insta Award',
            description: 'Recognized for effective execution and critical support on a high-priority client project.',
            icon: '🏆',
        },
        {
            title: 'Client Appreciation Certificate',
            description: 'Awarded for timely delivery and strong collaboration during a critical project phase.',
            icon: '🎖️',
        },
    ],
};