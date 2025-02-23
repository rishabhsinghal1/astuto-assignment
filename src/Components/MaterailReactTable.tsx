import {
  MaterialReactTable,
  MRT_Cell,
  type MRT_ColumnDef,
} from "material-react-table";
import React, { ReactNode, useMemo, useState } from "react";
import tableDataJson from "../jsondata/tableData.json";
import tableSchemaJson from "../jsondata/tableSchema.json";
import { getShade, getTooltipData } from "../HelperFunctions/getShade";

// Define TypeScript interfaces for Table Schema & Data
interface TableColumn {
  header: string;
  accessorKey: string;
  type: "text" | "number" | "image" | "status" | "tags";
}

interface TableSchema {
  columns: TableColumn[];
  pagination: boolean;
  rowSelection: boolean;
}

interface TableRow {
  id: number;
  profilePic: string;
  name: string;
  username: string;
  status: string;
  role: string;
  email: string;
  teams: string[];
}

// Parse and cast JSON correctly
const tableSchema: {
  columns: TableColumn[];
  pagination: boolean;
  rowSelection: boolean;
} = tableSchemaJson as TableSchema;

const tableData: TableRow[] = tableDataJson as TableRow[];

const TableComponent: React.FC = () => {
  const getEachColumnWidth = (index: number) => {
    switch (index) {
      case 0:
        return 200; // Name column
      case 1:
        return 10; // Status
      case 2:
        return 200; // Role
      case 3:
        return 250; // Email
      case 4:
        return 300; // Teams
      default:
        return 150; // Default column width
    }
  };

  const columns = useMemo<MRT_ColumnDef<TableRow>[]>(() => {
    return tableSchema.columns.map((col, index) => ({
      accessorKey: col.accessorKey,
      header: col.header,
      size: getEachColumnWidth(index), // Set the column width in pixels
      Cell: ({ cell }: { cell: MRT_Cell<TableRow, unknown> }): ReactNode => {
        if (col.type === "image") {
          return (
            <div className="relative flex justify-start items-center gap-2">
              <img
                src={cell.row.original.profilePic}
                className="rounded-full w-10 h-10"
              />
              <div className="flex flex-col">
                <span className="text-[#2E2E2E] text-sm">
                  {cell.row.original.name}
                </span>
                <span className="text-[#2E2E2E] text-xs">
                  @{cell.row.original.username}
                </span>
              </div>
            </div>
          );
        }
        if (col.type === "status") {
          return (
            <span className="px-2 py-1 bg-[#CCE6FF] rounded-full text-[#0080FF]">
              {cell.getValue<string>()}
            </span>
          );
        }
        if (col.type === "tags") {
          return (
            <div className="flex items-center gap-2">
              {cell
                .getValue<string[]>()
                .slice(0, 3)
                .map((tag: string, index: number) => (
                  <span
                    key={index}
                    className={`py-0.5 px-2 rounded-full ${getShade(index)}`}
                  >
                    {tag}
                  </span>
                ))}
              {cell.getValue<string[]>().length > 3 && (
                <span
                  className="py-0.5 px-2 bg-[#F2F2F2] rounded-full text-[#2E2E2E] font-medium"
                  title={getTooltipData(cell.getValue<string[]>().slice(3))}
                >
                  +{cell.getValue<string[]>().length - 3}
                </span>
              )}
            </div>
          );
        }
        return cell.getValue() as ReactNode;
      },
    }));
  }, []);

  // Row selection state
  /* eslint-disable-next-line */
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h2>Incremental Configuration: With Material React Table v2</h2>
      <div className="p-5 w-full">
        <MaterialReactTable
          columns={columns}
          data={tableData}
          enablePagination={tableSchema.pagination}
          enableRowSelection={tableSchema.rowSelection}
          getRowId={(row) => row.id.toString()}
          onRowSelectionChange={setRowSelection}
          muiTableBodyRowProps={{ sx: { cursor: "pointer" } }}
        />
      </div>
    </div>
  );
};

export default TableComponent;
