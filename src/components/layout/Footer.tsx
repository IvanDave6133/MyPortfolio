
import { profile } from '../../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-[#D5D9DE] py-8">
      <div className="container-custom flex flex-col justify-between gap-3 text-sm text-[#515A65] sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name}.
          All rights reserved.
        </p>

        <a
          href="#home"
          className="font-medium text-[#345B80] hover:text-[#172B46]"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
