import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ChartData {
  coordinates: { time: number; amount: number }[];
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
  status: "idle" | "loading" | "failed";
  programs: Program[];
  charts: ChartData[];
}

export interface MachinesDataState {
  selected?: { name: string; id: string };
  machines: Machine[];
}

const initialState: MachinesDataState = {
  selected: undefined,
  machines: [
    {
      name: "Machine 1",
      id: "1",
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
        },
      ],
    },
    {
      name: "Machine 2",
      id: "2",
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
        },
      ],
      programs: [
        {
          id: 1,
          name: "program 1",
          startTime: 1655056837645,
          CPU: 0.75,
          memory: 23464,
        },
        {
          id: 2,
          name: "program 1",
          startTime: 1655055746545,
          CPU: 0.12,
          memory: 1400,
        },
        {
          id: 3,
          name: "program 1",
          startTime: 1655054655445,
          CPU: 0.23,
          memory: 811,
        },
        {
          id: 4,
          name: "program 1",
          startTime: 1655053564345,
          CPU: 0.05,
          memory: 11424,
        },
        {
          id: 5,
          name: "program 1",
          startTime: 1655052473245,
          CPU: 0.32,
          memory: 2344,
        },
        {
          id: 6,
          name: "program 1",
          startTime: 1655052382145,
          CPU: 0.46,
          memory: 566,
        },
        {
          id: 7,
          name: "program 1",
          startTime: 1655050291045,
          CPU: 0.6,
          memory: 7243,
        },
      ],
    },
    {
      name: "Machine 3",
      id: "3",
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
        },
      ],
      programs: [
        {
          id: 1,
          name: "program 1",
          startTime: 1655056837645,
          CPU: 0.75,
          memory: 23464,
        },
        {
          id: 2,
          name: "program 1",
          startTime: 1655055746545,
          CPU: 0.12,
          memory: 1400,
        },
        {
          id: 3,
          name: "program 1",
          startTime: 1655054655445,
          CPU: 0.23,
          memory: 811,
        },
        {
          id: 4,
          name: "program 1",
          startTime: 1655053564345,
          CPU: 0.05,
          memory: 11424,
        },
        {
          id: 5,
          name: "program 1",
          startTime: 1655052473245,
          CPU: 0.32,
          memory: 2344,
        },
        {
          id: 6,
          name: "program 1",
          startTime: 1655052382145,
          CPU: 0.46,
          memory: 566,
        },
        {
          id: 7,
          name: "program 1",
          startTime: 1655050291045,
          CPU: 0.6,
          memory: 7243,
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
      action: PayloadAction<{ name: string; id: string }>
    ) => {
      state.selected = action.payload;
    },
  },
});

export const { selectMachine } = machinesDataSlice.actions;

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
  console.log(state.machinesData);
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
