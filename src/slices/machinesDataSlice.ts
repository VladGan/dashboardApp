import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import mockedData from "../mocks/mockedData.json";

// some types defined for data structure as well as initial data imported.

export interface Coordinates {
  time: number;
  amount: number
}

export interface ChartData {
  id: string;
  coordinates: Coordinates[];
  name: string;
}

interface Program {
  name: string;
  id: number;
  startTime: number;
  CPU: number;
  memory: number;
}

interface Machine {
  name: string;
  id: string;
  ipAddress: string;
  status: "idle" | "loading" | "failed";
  programs: Program[];
  charts: ChartData[];
}

export interface MachinesDataState {
  //only 'light' meta data kept in 'selected machine'
  selected: { name: string; id: string; ipAddress: string };
  machines: Machine[];
}

// the whole data kept in one tree like object to potentially allow it to be merged with updated data from the
// web socket connection from the server without complex logic (automatic deep merge of 2 objects).
const initialState = mockedData as MachinesDataState;

// Only 2 actions defined: select machine and update chart coordinates.
// In real scenario data coming from the server would be just merged with the state
// and coordinates would be updated automatically.
export const machinesDataSlice = createSlice({
  name: "machinesData",
  initialState,
  reducers: {
    selectMachine: (
      state,
      action: PayloadAction<{ id: string; }>
    ) => {
      const selectedMachine = state.machines.find(machine => machine.id === action.payload.id);
      if (!selectedMachine) return;
      state.selected = {name: selectedMachine.name, ipAddress: selectedMachine.ipAddress, id: selectedMachine.id};
    },
    updateData: (
      state,
      action: PayloadAction<{ machineID: string; chartID: string; coordinates: Coordinates[]; }>
    ) => {
      const selectedMachine = state.machines.find(machine => machine.id === action.payload.machineID);
      if (!selectedMachine) return;
      const selectedChart = selectedMachine.charts.find(chart => chart.id === action.payload.chartID);
      if (!selectedChart) return;
      selectedChart.coordinates = action.payload.coordinates;
    },
  },
});

export const { selectMachine, updateData } = machinesDataSlice.actions;

// a couple selectors for easy data access
export const selectedMachine = (state: RootState) =>
  state.machinesData.selected;

export const machinesList = (state: RootState) => {
  return state.machinesData.machines.map((machine) => ({
    name: machine.name,
    id: machine.id,
  }));
};

export const selectedMachineCharts = (state: RootState) => {
  if (!state.machinesData.selected) return undefined;
  const selectedMachineID = state.machinesData.selected.id;
  return state.machinesData.machines.find(
    (machine) => machine.id === selectedMachineID
  )?.charts;
};

export const selectedMachinePrograms = (state: RootState) => {
  if (!state.machinesData.selected) return undefined;
  const selectedMachineID = state.machinesData.selected.id;
  return state.machinesData.machines.find(
    (machine) => machine.id === selectedMachineID
  )?.programs;
};

export default machinesDataSlice.reducer;
