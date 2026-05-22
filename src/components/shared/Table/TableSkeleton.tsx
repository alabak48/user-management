import Skeleton from '../Skeleton'
import styles from './TableSkeleton.module.css'

interface TableSkeletonProps {
  columnKeys: string[]
  rows: number
  trClassName: string
  tdClassName: string
}

const SKELETON_WIDTHS = [75, 85, 55, 70, 60, 40]

function TableSkeleton({ columnKeys, rows, trClassName, tdClassName }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <tr key={i} className={trClassName}>
          {columnKeys.map((key, j) => (
            <td key={key} className={tdClassName}>
              <div className={styles.skeletonContent}>
                <Skeleton
                  className={styles.skeletonCell}
                  style={{ width: `${SKELETON_WIDTHS[(i + j) % SKELETON_WIDTHS.length]}%` }}
                  animationDelay={`${i * 0.06}s`}
                />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export default TableSkeleton
