
import type { IconType } from 'react-icons'

import {
  SiReact,
  SiReactrouter,
  SiReactquery,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiVite,
  SiNextdotjs,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiFlask,
  SiFastapi,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiFirebase,
  SiSupabase,
  SiExpo,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiFigma,
  SiAndroid,
  SiGooglecolab,
  SiOpencv,
  SiNumpy,
  SiPandas,
} from 'react-icons/si'

import {
  TbApi,
  TbDeviceMobileCode,
  TbDatabase,
  TbCode,
} from 'react-icons/tb'

/* =========================================================
   TECHNOLOGY ICON REGISTRY
   ========================================================= */

/*
   Centralized mapping of technology names to icons.

   Used by:
   - TechnologyBadge.tsx
   - ProjectModal.tsx
   - Other portfolio components in the future

   Project data only needs technology names.
*/

/* ---------------------------------------------------------
   01. TECHNOLOGY ICON MAPPING
   --------------------------------------------------------- */

export const technologyIcons: Record<string, IconType> = {
  /* Frontend */
  'React': SiReact,
  'React Router': SiReactrouter,
  'TanStack Query': SiReactquery,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'HTML': SiHtml5,
  'HTML5': SiHtml5,
  'CSS': SiCss,
  'CSS3': SiCss,
  'Tailwind CSS': SiTailwindcss,
  'Vite': SiVite,
  'Next.js': SiNextdotjs,
  'Vue': SiVuedotjs,
  'Vue.js': SiVuedotjs,

  /* Backend */
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'Express.js': SiExpress,
  'Python': SiPython,
  'Flask': SiFlask,
  'FastAPI': SiFastapi,
  'REST API': TbApi,
  'RESTful API': TbApi,

  /* Databases and services */
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,
  'PostgreSQL': SiPostgresql,
  'SQLite': SiSqlite,
  'Firebase': SiFirebase,
  'Supabase': SiSupabase,
  'Database': TbDatabase,

  /* Mobile development */
  'React Native': SiReact,
  'Expo': SiExpo,
  'Android': SiAndroid,
  'Mobile Development': TbDeviceMobileCode,

  /* AI and data science */
  'PyTorch': SiPytorch,
  'TensorFlow': SiTensorflow,
  'TensorFlow Lite': SiTensorflow,
  'OpenCV': SiOpencv,
  'NumPy': SiNumpy,
  'Pandas': SiPandas,
  'Google Colab': SiGooglecolab,

  /* Tools and deployment */
  'Git': SiGit,
  'GitHub': SiGithub,
  'Docker': SiDocker,
  'Vercel': SiVercel,
  'Figma': SiFigma,

  /* General */
  'Programming': TbCode,
}

/* ---------------------------------------------------------
   02. FALLBACK ICON
   --------------------------------------------------------- */

/*
   Used when a technology name does not
   exist in the registry.

   This prevents missing icons from
   breaking the interface.
*/

export const fallbackTechnologyIcon: IconType = TbCode

/* ---------------------------------------------------------
   03. ICON LOOKUP HELPER
   --------------------------------------------------------- */

export function getTechnologyIcon(
  technology: string
): IconType {
  return (
    technologyIcons[technology] ??
    fallbackTechnologyIcon
  )
}
