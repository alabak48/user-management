import type { ReactNode } from "react"

export interface Column<T> {
    key: string
    header: string,
    render?: (row: T) => ReactNode
}

interface TableProps<T> {
    data: T[]
    columns: Column<T>[]
    rowKey: (row: T) => string | number
    emptyMessage?: string
}

function Table<T>({ data, columns, rowKey, emptyMessage = "No data"}: TableProps<T>) {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>
                    {col.header}
                        </th>
                    ))}             
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length}>
                            {emptyMessage}
                        </td>
                    </tr>
                ) : (
                    data.map((row) => (
                        <tr key={rowKey(row)}>
                            {columns.map((col) => (
                                <td key={col.key}>
                                    {col.render ? col.render(row) : String((row as any)[col.key] ?? "" )}
                                </td>
                            ))}
                        </tr>
                    ))
                )
            }
            </tbody>
        </table>
    )
}

export default Table