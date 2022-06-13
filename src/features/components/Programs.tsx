import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { useAppSelector } from "../../app/hooks";
import {selectedMachine, selectedMachinePrograms} from "../../app/machinesDataSlice";
import moment from "moment";
import Title from "./Title";

interface Data {
  name: string;
  startTime: number;
  CPU: number;
  memory: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  date: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    date: false,
    disablePadding: true,
    label: "Program name",
  },
  {
    id: "startTime",
    date: true,
    disablePadding: false,
    label: "Start time",
  },
  {
    id: "CPU",
    date: false,
    disablePadding: false,
    label: "CPU usage",
  },
  {
    id: "memory",
    date: false,
    disablePadding: false,
    label: "Memory usage",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.date ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const selectedMachineID = useAppSelector(selectedMachine)?.id;
  const programs = useAppSelector(selectedMachinePrograms);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  if (!programs) return <></>;

  return (
    <TableContainer>
      <Title>Programs</Title>
      <Table
        sx={{ minWidth: 750 }}
        aria-labelledby="tableTitle"
        size={"medium"}
      >
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={programs.length}
        />
        <TableBody>
          {programs
            .slice()
            .sort(getComparator(order, orderBy))
            .map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={`${selectedMachineID}-${row.name}-${index}`}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">
                    {moment(row.startTime).format("DD/MM/YYYY hh:mm:ss")}
                  </TableCell>
                  <TableCell>{row.CPU * 100}%</TableCell>
                  <TableCell>{row.memory}mb</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
