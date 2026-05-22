import type { ReactNode } from "react"
import TableSkeleton from "./TableSkeleton"
import styles from "./Table.module.css"

export interface Column<T> {
    key: string
    header: string
    width?: string
    align?: "left" | "center" | "right"
    render?: (row: T) => ReactNode
}

interface TableProps<T> {
    data: T[]
    columns: Column<T>[]
    rowKey: (row: T) => string | number
    emptyMessage?: string
    loading?: boolean
    skeletonRows?: number
    scrollable?: boolean
    footer?: ReactNode
}

function Table<T>({
    data,
    columns,
    rowKey,
    emptyMessage = "No data",
    loading = false,
    skeletonRows = 6,
    scrollable = false,
    footer,
}: TableProps<T>) {
    return (
        <div className={[styles.wrapper, scrollable ? styles.wrapperScrollable : ""].filter(Boolean).join(" ")}>
            <table className={styles.table}>
                <colgroup>
                    {columns.map((col) => (
                        <col key={col.key} style={col.width ? { width: col.width } : undefined} />
                    ))}
                </colgroup>
                <thead className={[styles.thead, scrollable ? styles.theadSticky : ""].filter(Boolean).join(" ")}>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={styles.th}
                                style={col.align ? { textAlign: col.align } : undefined}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {loading ? (
                        <TableSkeleton columnKeys={columns.map((c) => c.key)} rows={skeletonRows} trClassName={styles.tr} tdClassName={styles.td} />
                    ) : data.length === 0 ? (
                        <tr className={styles.tr}>
                            <td colSpan={columns.length} className={styles.empty}>
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr key={rowKey(row)} className={styles.tr}>
                                {columns.map((col) => (
                                    <td key={col.key} className={styles.td} data-label={col.header}>
                                        {col.render ? col.render(row) : String((row as any)[col.key] ?? "")}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {footer && <div className={[styles.tableFooter, scrollable ? styles.tableFooterSticky : ""].filter(Boolean).join(" ")}>{footer}</div>}
        </div>
    )
}

export default Table
