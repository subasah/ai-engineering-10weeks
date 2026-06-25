import type { TableConfig } from "../data/curriculum";

interface ConceptTableProps {
  table: TableConfig;
}

export default function ConceptTable({ table }: ConceptTableProps) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #13162a 0%, #1a1f3c 100%)",
        border: "1px solid rgba(124, 58, 237, 0.2)",
      }}
    >
      <div
        className="px-5 py-3 border-b flex items-center gap-2"
        style={{ borderColor: "rgba(124, 58, 237, 0.15)" }}
      >
        <span className="text-lg">📊</span>
        <h3 className="text-white font-semibold text-sm">{table.title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr style={{ backgroundColor: "rgba(124, 58, 237, 0.1)" }}>
              {table.headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#a78bfa" }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                style={{
                  backgroundColor:
                    rowIdx % 2 === 0
                      ? "rgba(255, 255, 255, 0.02)"
                      : "transparent",
                  borderTop: "1px solid rgba(124, 58, 237, 0.08)",
                }}
              >
                {table.headers.map((header, colIdx) => (
                  <td
                    key={header}
                    className="px-4 py-3 text-sm leading-relaxed"
                    style={{
                      color: colIdx === 0 ? "#e2e8f0" : "#94a3b8",
                      fontWeight: colIdx === 0 ? "600" : "400",
                    }}
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
