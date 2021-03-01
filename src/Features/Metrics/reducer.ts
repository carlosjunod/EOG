import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricSelected = {
  getSelectedMetrics: [];
};
export type MetricState = {
  getMetrics: [];
};
export type ApiErrorAction = {
  error: string;
};

const initialState = {
  avialableMetrics: [],
  selectedMetrics: [],
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<MetricState>) => {
      state.avialableMetrics = action?.payload?.getMetrics;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    setSelectedMetrics: (state, action: PayloadAction<[]>) => {
      state.selectedMetrics = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
