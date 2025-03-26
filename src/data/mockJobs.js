export const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    company_slug: "techcorp-inc",
    company_logo: "/assets/images/company/techcorp.png",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description: "We are looking for an experienced Frontend Developer to join our team...",
    requirements: [
      "5+ years of experience with React",
      "Strong knowledge of TypeScript",
      "Experience with modern build tools",
      "Excellent problem-solving skills"
    ],
    benefits: [
      "Health Insurance",
      "401(k) matching",
      "Remote work options",
      "Professional development"
    ],
    easy_apply: true,
    remote: true,
    created_at: "2024-03-15",
    applicants_count: 245,
    company_details: {
      name: "TechCorp Inc.",
      description: "Leading technology company specializing in web development...",
      size: "1000-5000",
      industry: "Technology",
      founded: 2010,
      headquarters: "San Francisco, CA",
      website: "https://techcorp.com",
      reviews: [
        {
          id: 1,
          rating: 4.5,
          title: "Great place to work",
          content: "Excellent work-life balance and growth opportunities...",
          author: "John Doe",
          date: "2024-02-15"
        },
        {
          id: 2,
          rating: 4.0,
          title: "Good company culture",
          content: "Friendly environment and supportive management...",
          author: "Jane Smith",
          date: "2024-01-20"
        }
      ]
    }
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "DataFlow Systems",
    company_slug: "dataflow-systems",
    company_logo: "/assets/images/company/dataflow.png",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    description: "Join our backend team to build scalable solutions...",
    requirements: [
      "3+ years of Node.js experience",
      "Experience with PostgreSQL",
      "Knowledge of microservices architecture",
      "Strong debugging skills"
    ],
    benefits: [
      "Competitive salary",
      "Flexible hours",
      "Remote work",
      "Learning budget"
    ],
    easy_apply: false,
    remote: true,
    created_at: "2024-03-14",
    applicants_count: 189,
    company_details: {
      name: "DataFlow Systems",
      description: "Data processing and analytics company...",
      size: "500-1000",
      industry: "Data Analytics",
      founded: 2015,
      headquarters: "New York, NY",
      website: "https://dataflow.com",
      reviews: [
        {
          id: 3,
          rating: 4.2,
          title: "Fast-paced environment",
          content: "Great for learning and growth...",
          author: "Mike Johnson",
          date: "2024-02-10"
        }
      ]
    }
  },
  // Add more mock jobs here...
];

export const mockCompanies = [
  {
    id: 1,
    name: "TechCorp Inc.",
    slug: "techcorp-inc",
    logo: "/assets/images/company/techcorp.png",
    description: "Leading technology company specializing in web development...",
    size: "1000-5000",
    industry: "Technology",
    founded: 2010,
    headquarters: "San Francisco, CA",
    website: "https://techcorp.com",
    jobs_count: 45,
    reviews: [
      {
        id: 1,
        rating: 4.5,
        title: "Great place to work",
        content: "Excellent work-life balance and growth opportunities...",
        author: "John Doe",
        date: "2024-02-15"
      }
    ]
  },
  // Add more mock companies here...
]; 