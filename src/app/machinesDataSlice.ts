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

const initialState: MachinesDataState = {
  // first machine selected as asked in task
  selected: {name: "Machine 1", id: "1", ipAddress: '200.136.20.129'},
  machines: [
    {
      name: "Machine 1",
      id: "1",
      ipAddress: '200.136.20.129',
      status: "idle",
      programs: [
        {
          id: 1,
          name: "program 1",
          startTime: 1655069938903,
          CPU: 0.75,
          memory: 23464,
        },
        {
          id: 2,
          name: "program 2",
          startTime: 1655055746545,
          CPU: 0.12,
          memory: 1400,
        },
        {
          id: 3,
          name: "program 3",
          startTime: 1655054655445,
          CPU: 0.23,
          memory: 811,
        },
        {
          id: 4,
          name: "program 4",
          startTime: 1655053564345,
          CPU: 0.05,
          memory: 11424,
        },
        {
          id: 5,
          name: "program 5",
          startTime: 1655052473245,
          CPU: 0.32,
          memory: 2344,
        },
        {
          id: 6,
          name: "program 6",
          startTime: 1655052382145,
          CPU: 0.46,
          memory: 566,
        },
        {
          id: 7,
          name: "program 7",
          startTime: 1655050291045,
          CPU: 0.6,
          memory: 7243,
        },
      ],
      charts: [
        {
          coordinates: [
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 350 },
            { time: 1655099921471, amount: 270 },
            { time: 1655099921471, amount: 550 },
            { time: 1655099921471, amount: 670 },
            { time: 1655099921471, amount: 820 },
          ],
          name: "CPU usage",
          id: 'CPUchart'
        },
        {
          coordinates: [
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 350 },
            { time: 1655099921471, amount: 270 },
            { time: 1655099921471, amount: 550 },
            { time: 1655099921471, amount: 670 },
            { time: 1655099921471, amount: 820 },
          ],
          name: "Memory",
          id: 'MemoryChart'
        },
        {
          coordinates: [
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 350 },
            { time: 1655099921471, amount: 270 },
            { time: 1655099921471, amount: 550 },
            { time: 1655099921471, amount: 670 },
            { time: 1655099921471, amount: 820 },
          ],
          name: "Connections",
          id: 'ConnectionChart'
        },
      ],
    },
    {
      name: "Machine 2",
      id: "2",
      ipAddress: '45.133.75.234',
      status: "idle",
      charts: [
        {
          coordinates: [
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 350 },
            { time: 1655099921471, amount: 270 },
            { time: 1655099921471, amount: 550 },
            { time: 1655099921471, amount: 670 },
            { time: 1655099921471, amount: 820 },
          ],
          name: "CPU usage",
          id: 'CPUChart'
        },
      ],
      programs: [
        {
          id: 1,
          name: "program 11111",
          startTime: 1655056837645,
          CPU: 0.75,
          memory: 23464,
        },
      ],
    },
    {
      name: "Machine 3",
      id: "3",
      ipAddress: '177.75.183.25',
      status: "idle",
      charts: [
        {
          coordinates: [
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 400 },
            { time: 1655099921471, amount: 350 },
            { time: 1655099921471, amount: 270 },
            { time: 1655099921471, amount: 550 },
            { time: 1655099921471, amount: 670 },
            { time: 1655099921471, amount: 820 },
          ],
          name: "CPU usage",
          id: 'CPUChart'
        },
      ],
      programs: [
        {
          id: 1,
          name: "program A",
          startTime: 1655056837645,
          CPU: 0.75,
          memory: 23464,
        },
        {
          id: 2,
          name: "program B",
          startTime: 1655055746545,
          CPU: 0.12,
          memory: 1400,
        },
      ],
    },
  ],
};

export const machinesDataSlice = createSlice({
  name: "machineData",
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
