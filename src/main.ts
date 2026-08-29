const MAX_IMAGE_SIDE = 4096;
const DEFAULT_GRID = 4;
const MIN_GRID = 1;
const MAX_GRID = 64;

type GridAxis = 'rows' | 'columns';

interface AppState {
  rows: number;
  columns: number;
  image: HTMLImageElement | null;
  fileName: string;
  objectUrl: string | null;
}

const state: AppState = {
  rows: DEFAULT_GRID,
  columns: DEFAULT_GRID,
  image: null,
  fileName: '',
  objectUrl: null,
};

const requireElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing required element: ${selector}`);
  return element;
};

const rowsInput = requireElement<HTMLInputElement>('#rows');
const columnsInput = requireElement<HTMLInputElement>('#columns');
const fileInput = requireElement<HTMLInputElement>('#fileInput');
const dropZone = requireElement<HTMLButtonElement>('#dropZone');
const emptyState = requireElement<HTMLDivElement>('#emptyState');
const loadedState = requireElement<HTMLDivElement>('#loadedState');
const canvas = requireElement<HTMLCanvasElement>('#spriteCanvas');
const errorMessage = requireElement<HTMLParagraphElement>('#errorMessage');
const replaceButton = requireElement<HTMLButtonElement>('#replaceButton');
const resetButton = requireElement<HTMLButtonElement>('#resetButton');
const fileNameElement = requireElement<HTMLSpanElement>('#fileName');
const fileResolutionElement = requireElement<HTMLSpanElement>('#fileResolution');
const gridMetric = requireElement<HTMLElement>('#gridMetric');
const frameMetric = requireElement<HTMLElement>('#frameMetric');
const cellMetric = requireElement<HTMLElement>('#cellMetric');
const sourceMetric = requireElement<HTMLElement>('#sourceMetric');
const presetButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-grid]'));
const stepButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-step-target]'));

const clampGridValue = (value: number): number => {
  if (!Number.isFinite(value)) return DEFAULT_GRID;
  return Math.min(MAX_GRID, Math.max(MIN_GRID, Math.round(value)));
};

const formatDimension = (value: number): string => {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.00$/, '');
};

const setError = (message = ''): void => {
  errorMessage.textContent = message;
  errorMessage.hidden = message.length === 0;
};

const syncPresetState = (): void => {
  presetButtons.forEach((button) => {
    const size = Number(button.dataset.grid);
    button.classList.toggle('is-active', state.rows === size && state.columns === size);
  });
};

const syncInputs = (): void => {
  rowsInput.value = String(state.rows);
  columnsInput.value = String(state.columns);
  syncPresetState();
};

const updateMetrics = (): void => {
  gridMetric.textContent = `${state.columns} × ${state.rows}`;
  frameMetric.textContent = String(state.rows * state.columns);

  if (!state.image) {
    cellMetric.textContent = '—';
    sourceMetric.textContent = '—';
    return;
  }

  const cellWidth = state.image.naturalWidth / state.columns;
  const cellHeight = state.image.naturalHeight / state.rows;
  cellMetric.textContent = `${formatDimension(cellWidth)} × ${formatDimension(cellHeight)} px`;
  sourceMetric.textContent = `${state.image.naturalWidth} × ${state.image.naturalHeight} px`;
};

const renderCanvas = (): void => {
  if (!state.image) return;

  const width = state.image.naturalWidth;
  const height = state.image.naturalHeight;
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    setError('Your browser could not create a 2D canvas context.');
    return;
  }

  context.clearRect(0, 0, width, height);
  context.imageSmoothingEnabled = false;
  context.drawImage(state.image, 0, 0, width, height);

  const cellWidth = width / state.columns;
  const cellHeight = height / state.rows;
  const lineWidth = Math.max(1, Math.min(width, height) / 900);

  context.save();
  context.strokeStyle = 'rgba(95, 225, 255, 0.92)';
  context.lineWidth = lineWidth;

  for (let column = 1; column < state.columns; column += 1) {
    const x = column * cellWidth;
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let row = 1; row < state.rows; row += 1) {
    const y = row * cellHeight;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  context.strokeStyle = 'rgba(95, 225, 255, 1)';
  context.lineWidth = lineWidth * 1.4;
  context.strokeRect(lineWidth / 2, lineWidth / 2, width - lineWidth, height - lineWidth);
  context.restore();
};

const refreshGrid = (): void => {
  syncInputs();
  updateMetrics();
  renderCanvas();
};

const setGridAxis = (axis: GridAxis, rawValue: number): void => {
  state[axis] = clampGridValue(rawValue);
  setError();
  refreshGrid();
};

const revokeObjectUrl = (): void => {
  if (state.objectUrl) {
    URL.revokeObjectURL(state.objectUrl);
    state.objectUrl = null;
  }
};

const showLoadedState = (): void => {
  emptyState.hidden = true;
  loadedState.hidden = false;
};

const validateFile = (file: File): string | null => {
  const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
  if (!isPng) return 'SpriteFix F01 currently accepts PNG files only.';
  return null;
};

const loadFile = (file: File): void => {
  const fileError = validateFile(file);
  if (fileError) {
    setError(fileError);
    return;
  }

  setError();
  const nextUrl = URL.createObjectURL(file);
  const image = new Image();

  image.onload = () => {
    if (image.naturalWidth > MAX_IMAGE_SIDE || image.naturalHeight > MAX_IMAGE_SIDE) {
      URL.revokeObjectURL(nextUrl);
      setError(`This image is ${image.naturalWidth}×${image.naturalHeight}px. F01 supports up to ${MAX_IMAGE_SIDE}×${MAX_IMAGE_SIDE}px.`);
      return;
    }

    revokeObjectUrl();
    state.objectUrl = nextUrl;
    state.image = image;
    state.fileName = file.name;

    fileNameElement.textContent = file.name;
    fileResolutionElement.textContent = `${image.naturalWidth} × ${image.naturalHeight} px`;
    showLoadedState();
    refreshGrid();
  };

  image.onerror = () => {
    URL.revokeObjectURL(nextUrl);
    setError('SpriteFix could not decode this PNG. Try exporting the image again.');
  };

  image.src = nextUrl;
};

const openPicker = (): void => {
  fileInput.value = '';
  fileInput.click();
};

rowsInput.addEventListener('input', () => setGridAxis('rows', Number(rowsInput.value)));
columnsInput.addEventListener('input', () => setGridAxis('columns', Number(columnsInput.value)));
rowsInput.addEventListener('blur', syncInputs);
columnsInput.addEventListener('blur', syncInputs);

stepButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const axis = button.dataset.stepTarget as GridAxis | undefined;
    const step = Number(button.dataset.step ?? 0);
    if (!axis || (axis !== 'rows' && axis !== 'columns')) return;
    setGridAxis(axis, state[axis] + step);
  });
});

presetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const size = clampGridValue(Number(button.dataset.grid));
    state.rows = size;
    state.columns = size;
    setError();
    refreshGrid();
  });
});

dropZone.addEventListener('click', openPicker);
replaceButton.addEventListener('click', openPicker);

resetButton.addEventListener('click', () => {
  state.rows = DEFAULT_GRID;
  state.columns = DEFAULT_GRID;
  setError();
  refreshGrid();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files?.[0];
  if (file) loadFile(file);
});

const preventDefault = (event: DragEvent): void => {
  event.preventDefault();
};

document.addEventListener('dragenter', preventDefault);
document.addEventListener('dragover', preventDefault);

dropZone.addEventListener('dragenter', () => dropZone.classList.add('is-dragging'));
dropZone.addEventListener('dragover', () => dropZone.classList.add('is-dragging'));
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('is-dragging'));
dropZone.addEventListener('drop', () => dropZone.classList.remove('is-dragging'));

document.addEventListener('drop', (event) => {
  event.preventDefault();
  const file = event.dataTransfer?.files?.[0];
  if (file) loadFile(file);
});

window.addEventListener('beforeunload', revokeObjectUrl);

syncInputs();
updateMetrics();
