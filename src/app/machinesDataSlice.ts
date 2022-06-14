import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

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
  selected: { name: string; id: string; ipAddress: string };
  machines: Machine[];
}
import mockedData from "./mockedData.json";

const initialState = mockedData as MachinesDataState;

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
