import { create } from 'zustand';

type MyState = {
  EditorValue: string;
  setEditorValue: (newValue: string) => void;
};

const useEditorStore = create<MyState>((set) => ({
  EditorValue: '',
  setEditorValue: (newValue) => set({ EditorValue: newValue }),
}));

export default useEditorStore;
