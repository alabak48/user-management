import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import Button from "../Button"
import styles from "./Pager.module.css"

interface PagerProps {
  page: number
  total: number
  pageSize: number
  onChange: (page: number) => void
}

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | "…")[] = [1]
  if (current > 3) pages.push("…")
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 2) pages.push("…")
  pages.push(total)
  return pages
}

function Pager({ page, total, pageSize, onChange }: PagerProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)
  const pageNumbers = getPageNumbers(page, totalPages)

  return (
    <div className={styles.pager}>
      <span className={styles.info}>
        {total === 0 ? "No results" : `Showing ${from}–${to} of ${total}`}
      </span>

      <div className={styles.controls}>
        <Button
          variant="custom"
          className={styles.btn}
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          startIcon={FiChevronLeft}
          iconSize={14}
        />

        {pageNumbers.map((n, i) =>
          n === "…" ? (
            <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
          ) : (
            <Button
              key={n}
              variant="custom"
              className={[styles.btn, n === page ? styles.btnActive : ""].filter(Boolean).join(" ")}
              onClick={() => onChange(n)}
              aria-label={`Page ${n}`}
              aria-current={n === page ? "page" : undefined}
            >
              {n}
            </Button>
          )
        )}

        <Button
          variant="custom"
          className={styles.btn}
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          startIcon={FiChevronRight}
          iconSize={14}
        />
      </div>
    </div>
  )
}

export default Pager
