/**
 * School ERP — Services Data & Feature Specifications
 * Represents supported core capabilities, integrated tools, and modular configuration.
 */

export const SERVICES_LIST = [
  {
    id: 'student-info',
    title: 'Student Information Management',
    shortDesc: 'Manage student profiles, admission records, class assignments, contact details, and academic information in one place.',
    category: 'administration',
    badge: 'Core Module',
    badgeType: 'core',
    details: [
      'Comprehensive student digital dossier with personal, guardian, and health records',
      'Digital admission management with document upload and roll number generation',
      'Class & section assignment with automatic batch promotion history',
      'Emergency contact repository accessible by authorized school staff'
    ]
  },
  {
    id: 'attendance',
    title: 'Attendance Management',
    shortDesc: 'Help authorized school staff record and monitor student attendance and review attendance reports.',
    category: 'administration',
    badge: 'Core Module',
    badgeType: 'core',
    details: [
      'Daily class-wise and subject-wise digital attendance recording for teachers',
      'Instant absent notifications sent automatically to registered parent contacts',
      'Monthly, term, and annual attendance summary registers for official compliance',
      'Configurable support for biometric and RFID reader hardware integration'
    ]
  },
  {
    id: 'academics-exams',
    title: 'Academic & Examination Management',
    shortDesc: 'Manage examination schedules, marks entry, academic performance, results, and report cards.',
    category: 'academics',
    badge: 'Core Module',
    badgeType: 'core',
    details: [
      'Configurable exam scheduling, hall ticket generation, and seating plans',
      'Secure marks and grade entry portal with validation against maximum scoring limits',
      'Automated standardized report card compilation following CBSE, ICSE, or State board rules',
      'Subject-level performance charts and student academic trend analysis'
    ]
  },
  {
    id: 'homework',
    title: 'Homework & Assignment Management',
    shortDesc: 'Help teachers share homework and assignments while students and parents access the relevant academic information.',
    category: 'academics',
    badge: 'Integrated Feature',
    badgeType: 'standard',
    details: [
      'Daily homework broadcasting with rich text instructions and document attachments',
      'Submission status tracking for teachers with review remarks',
      'Parent visibility into pending and completed assignments via web and app',
      'Subject-wise assignment history organized by academic term'
    ]
  },
  {
    id: 'fee-finance',
    title: 'Fee & Finance Management',
    shortDesc: 'Organize student fee records, payment status, outstanding dues, and fee-related reports.',
    category: 'finance',
    badge: 'Core Module',
    badgeType: 'core',
    details: [
      'Customizable fee head structures, concessions, and installment timelines',
      'Instant digital fee receipt generation with school seal and transaction IDs',
      'Automated dues tracking with configurable SMS and email reminder alerts',
      'Daily collection registers, category-wise ledger summaries, and reconciliation'
    ]
  },
  {
    id: 'parent-student-app',
    title: 'Parent & Student Mobile App',
    shortDesc: 'Provide convenient mobile access to supported student information, attendance, academic results, homework, fee details, and announcements.',
    category: 'communication',
    badge: 'Mobile Companion',
    badgeType: 'addon',
    details: [
      'Mobile-responsive parent portal for Android and iOS devices',
      'Push notifications for urgent circulars, unexpected closures, and fee updates',
      'Convenient view of attendance records, digital report cards, and notices',
      'Direct communication channel between parents and assigned class teachers'
    ]
  },
  {
    id: 'teacher-staff',
    title: 'Teacher & Staff Management',
    shortDesc: 'Organize teacher and staff information, assigned classes, and relevant administrative records.',
    category: 'administration',
    badge: 'Standard Feature',
    badgeType: 'standard',
    details: [
      'Faculty profiles with subject qualifications, department assignments, and KYC records',
      'Class teacher allocations and proxy period substitution management',
      'Staff leave tracking, attendance recording, and basic payroll ledger support',
      'Role-based permissions ensuring secure, segregated data access'
    ]
  },
  {
    id: 'timetable',
    title: 'Timetable & Class Management',
    shortDesc: 'Present class schedules, subject allocations, and timetable information in a structured format.',
    category: 'academics',
    badge: 'Standard Feature',
    badgeType: 'standard',
    details: [
      'Conflict-free period allocations matching teacher workload and classroom capacity',
      'Interactive visual weekly timetable view for classes, teachers, and labs',
      'Quick substitution assignment when teachers are on sanctioned leave',
      'Printable and downloadable PDF timetables for classroom noticeboards'
    ]
  },
  {
    id: 'communication',
    title: 'Communication & Notifications',
    shortDesc: 'Help schools share announcements, reminders, and important updates with the relevant users.',
    category: 'communication',
    badge: 'Standard Feature',
    badgeType: 'standard',
    details: [
      'School-wide and section-targeted digital circulars and event announcements',
      'Automated notification engine for fee reminders, attendance alerts, and exam dates',
      'Emergency broadcast alerts for weather updates and schedule changes',
      'Archive of historical notices accessible by parents and staff anytime'
    ]
  },
  {
    id: 'reports-analytics',
    title: 'Reports & Analytics',
    shortDesc: 'Present available school data through useful reports that help administrators understand attendance, academics, fees, and other operational activities.',
    category: 'administration',
    badge: 'Comprehensive',
    badgeType: 'core',
    details: [
      'Administrative executive dashboard summarizing daily attendance and fee totals',
      'Term-wise academic pass percentage reports filtered by section, subject, and gender',
      'Outstanding fee age analysis to assist timely collection planning',
      'Exportable reports in Excel and PDF formats for board inspections and audits'
    ]
  }
]

export const BENEFITS_LIST = [
  {
    title: 'Less Manual Work',
    subtitle: 'Reduce repetitive administrative tasks.',
    desc: 'Automate attendance calculation, fee receipting, and report card compilation so staff can focus on educational priorities.'
  },
  {
    title: 'Better Coordination',
    subtitle: 'Improve information sharing.',
    desc: 'Bridge communication gaps between principals, teachers, and parents with instant digital updates and shared circulars.'
  },
  {
    title: 'Easy Access to Information',
    subtitle: 'Convenient records on demand.',
    desc: 'Authorized school staff and parents access student records, academic progress, and fee history securely from any browser.'
  },
  {
    title: 'Better Decision-Making',
    subtitle: 'Clear operational visibility.',
    desc: 'Use data-backed reports on student attendance, academic trends, and fee collections to guide school governance decisions.'
  }
]

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Understand Your School',
    desc: 'We learn about your school’s student strength, board affiliation, administrative workflows, and priority management requirements.'
  },
  {
    step: '02',
    title: 'Configure the Solution',
    desc: 'We identify relevant ERP modules, map class structures and fee heads, and configure supported features to align with your school.'
  },
  {
    step: '03',
    title: 'Get Started',
    desc: 'We assist with student data onboarding, orient administrative staff and teachers, and provide dependable operational guidance.'
  }
]

export const SUPPORT_BLOCKS = [
  {
    title: 'ERP Setup & Onboarding',
    desc: 'Assistance with importing student dossiers, setting up class structures, fee installments, and role-based permissions.'
  },
  {
    title: 'Staff Training & Guidance',
    desc: 'Hands-on orientation sessions for administrators and educators on taking daily attendance, publishing homework, and entering marks.'
  },
  {
    title: 'Technical Assistance',
    desc: 'Prompt assistance during institution working hours for software guidance, data queries, and feature configuration assistance.'
  }
]
