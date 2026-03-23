## Overview

The goal of this spec is to develop a homepage


## Approach (Plan Story) 🗺️✨

### Story Flow (High Level)
```
User Lands
    |
    v
[Hero Section] --"Who am I?"--> [Experience Timeline] --"What I did?"--> [Projects Grid]
    |
    v
  Footer (future)
```

### Layout Map (Low Level)
```
Page
└── PageLayout
    ├── HeroSection
    │   ├── ProfileImage (top)
    │   └── ShortIntroText
    ├── ExperienceSection
    │   └── ExperienceTimeline
    │       ├── TimelineRow
    │       │   ├── Left: ProjectThumbnail
    │       │   ├── Center: TimelineDot (fixed center)
    │       │   └── Right: WorkDescription + Skills
    └── ProjectsSection
        └── ProjectCardGrid
```

### Policy Candidates (Centralized Later) 🧰📍
- heroImageSize
- timelineDotSize
- sectionVerticalSpacing
- projectCardMinWidth

## Home Page Sections

 ### Hero Section:
 ### Experience Section:
 ### Projects Section:



## Implementation Plan:

### Phase 1. Hero Section

  A modern premium style

  Layout: 
    - Place for my image on top.
      - Use next.js image library and for not just put generic image.
    - Basic description.

### Phase 2. Experience Section:
    - A time line style UI where each row has three section
      Left: Project Thumbnail
      Center: A circle dot that always statys at the center of this section only like a visual guide
      Right: Description of work and skills used.

### Phase 3. Projects Section:
    - A simple grid of project cards for fast visual scan


