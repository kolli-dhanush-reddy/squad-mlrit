export type SectionId =
  | "home"
  | "about"
  | "events"
  | "squad"
  | "gallery"
  | "contact"

export type TabId = SectionId

export type GalleryImage = {
  id: number
  src: string
  alt: string
  span: "tall" | "wide" | "square"
}

export const NAV_TABS: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
  { id: "squad", label: "Squad" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Get in Touch" },
]

export type TeamMember = {
  id: number
  name: string
  role: string
  avatar: string
}

export const CORE_TEAM: TeamMember[] = [
  { id: 1, name: "Aarav Sharma", role: "President", avatar: "/placeholder.svg?height=400&width=400" },
  { id: 2, name: "Diya Patel", role: "Vice President", avatar: "/placeholder.svg?height=400&width=400" },
  { id: 3, name: "Rohan Verma", role: "Technical Lead", avatar: "/placeholder.svg?height=400&width=400" },
  { id: 4, name: "Ananya Rao", role: "Design Lead", avatar: "/placeholder.svg?height=400&width=400" },
  { id: 5, name: "Karthik Nair", role: "Events Head", avatar: "/placeholder.svg?height=400&width=400" },
  { id: 6, name: "Isha Gupta", role: "Outreach Head", avatar: "/placeholder.svg?height=400&width=400" },
  { id: 7, name: "Vikram Singh", role: "Content Head", avatar: "/placeholder.svg?height=400&width=400" },
  { id: 8, name: "Meera Iyer", role: "Treasurer", avatar: "/placeholder.svg?height=400&width=400" },
]

export type EventContent = {
  id: string
  title: string
  tagline: string
  description: string
  highlights: string[]
  images: GalleryImage[]
}

function buildGallery(label: string, count: number): GalleryImage[] {
  const spans: GalleryImage["span"][] = ["square", "tall", "wide", "square", "square", "tall"]
  const dims: Record<string, { h: number; w: number }> = {
    tall: { h: 640, w: 480 },
    wide: { h: 420, w: 680 },
    square: { h: 520, w: 520 },
  }
  return Array.from({ length: count }).map((_, i) => {
    const span = spans[i % spans.length]
    const { h, w } = dims[span]
    const query = encodeURIComponent(`${label} event photo ${i + 1}`)
    return {
      id: i + 1,
      src: `/placeholder.svg?height=${h}&width=${w}&query=${query}`,
      alt: `${label} — photo ${i + 1}`,
      span,
    }
  })
}

export const EVENTS: Record<"codex" | "unplugged" | "outreach" | "project-expo", EventContent> = {
  codex: {
    id: "codex",
    title: "CodeX",
    tagline: "Algorithmic Thinking & Competitive Programming",
    description:
      "CodeX is SQUAD's premier coding competition designed to test programming mastery, logical reasoning, and speed under pressure. Featuring a technical aptitude round followed by intense algorithmic challenges, participants evaluate their problem-solving efficiency while preparing for technical interviews and national hackathons.",
    highlights: [
      "Technical Aptitude & Logic Assessment",
      "Time-Constrained Algorithmic Challenges",
      "Interview & Competitive Programming Preparation",
    ],
    images: buildGallery("CodeX coding competition", 12),
  },
  unplugged: {
    id: "unplugged",
    title: "Unplugged",
    tagline: "Technical Workshop",
    description:
      "Conducted by the SQUAD Technical Team under the guidance of Pujitha Ma'am, Unplugged was an intensive hands-on Power BI workshop. The session introduced participants to data visualization, dashboard creation, and interactive reporting using real-world business intelligence examples.",
    highlights: [
      "Guided by Pujitha Ma'am & SQUAD Tech Team",
      "Data Visualization & Dashboards",
      "Real-World Business Intelligence",
    ],
    images: buildGallery("power bi data workshop", 12),
  },
  outreach: {
    id: "outreach",
    title: "Outreach Program",
    tagline: "Community Empowerment",
    description:
      "As part of the SQUAD Outreach Program, our team visited ZPHS, Gundlapochampally to interact with school students and inspire them towards innovation, technology, and creative thinking. The session included discussions on problem-solving, teamwork, and building confidence in future aspirations.",
    highlights: [
      "School Visit to ZPHS Gundlapochampally",
      "STEM & Creative Thinking Awareness",
      "Mentorship & Student Empowerment",
    ],
    images: buildGallery("school outreach teaching students", 12),
  },
  "project-expo": {
    id: "project-expo",
    title: "Project Expo",
    tagline: "Prototype Showcase & Jury Pitching",
    description:
      "SQUAD organized a Project Expo providing students a platform to showcase technical projects. SQUAD members mentored participants beforehand in refining ideas and prototypes. Projects were evaluated by invited industry professionals who provided valuable feedback and practical exposure.",
    highlights: [
      "Pre-Expo Mentorship by Senior SQUAD Members",
      "Live Prototype Demonstrations",
      "Evaluation by Industry Judges",
    ],
    images: buildGallery("student project expo prototype", 12),
  },
}

export const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/squadmlrit?igsh=MTBleWo0Nmd3NXUzeQ==",
    handle: "@squadmlrit",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/squadclub?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    handle: "SQUAD — MLRIT",
  },
]

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: "/placeholder.svg?height=400&width=400&query=squad+event+1", alt: "SQUAD Event 1", span: "square" },
  { id: 2, src: "/placeholder.svg?height=640&width=480&query=squad+event+2", alt: "SQUAD Event 2", span: "tall" },
  { id: 3, src: "/placeholder.svg?height=420&width=680&query=squad+event+3", alt: "SQUAD Event 3", span: "wide" },
  { id: 4, src: "/placeholder.svg?height=400&width=400&query=squad+event+4", alt: "SQUAD Event 4", span: "square" },
  { id: 5, src: "/placeholder.svg?height=400&width=400&query=squad+event+5", alt: "SQUAD Event 5", span: "square" },
  { id: 6, src: "/placeholder.svg?height=640&width=480&query=squad+event+6", alt: "SQUAD Event 6", span: "tall" },
  { id: 7, src: "/placeholder.svg?height=420&width=680&query=squad+event+7", alt: "SQUAD Event 7", span: "wide" },
  { id: 8, src: "/placeholder.svg?height=400&width=400&query=squad+event+8", alt: "SQUAD Event 8", span: "square" },
]

export const CONTACT_EMAIL = "squadmlrit@gmail.com"
