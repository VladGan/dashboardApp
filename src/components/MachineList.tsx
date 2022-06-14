import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import StorageIcon from "@mui/icons-material/Storage";
import ListItemText from "@mui/material/ListItemText";
import { selectMachine } from "../app/machinesDataSlice";
import { useAppDispatch } from "../app/hooks";

export default function MachineList({
  machines,
}: {
  machines: { name: string; id: string }[];
}) {
  const dispatch = useAppDispatch();

  const machineSelection = (id: string) => {
    return () => {
      dispatch(selectMachine({ id }));
    };
  };
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Active machines
      </ListSubheader>

      {machines.map((machine) => (
        <ListItemButton onClick={machineSelection(machine.id)}>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary={machine.name} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
}
