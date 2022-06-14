import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import StorageIcon from "@mui/icons-material/Storage";
import ListItemText from "@mui/material/ListItemText";
import { selectMachine } from "../slices/machinesDataSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

export default function MachineList({
  machines,
}: {
  machines: { name: string; id: string }[];
}) {
  const dispatch = useAppDispatch();

  //avoiding inline function
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
        <ListItemButton key={machine.id} onClick={machineSelection(machine.id)}>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary={machine.name} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
}
