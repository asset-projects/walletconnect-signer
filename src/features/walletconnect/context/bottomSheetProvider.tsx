import BottomSheet from '@gorhom/bottom-sheet';
import type {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {
  createContext,
  useContext,
  type PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from 'react';

type SheetType =
  | 'none'
  | 'approval'
  | 'sign'
  | 'signTypedData'
  | 'sendTransaction';

export const INIT_BOTTOM_SHEET_INDEX = -1;
export const SNAP_POINTS = ['70%'];

const StateContext = createContext<{
  bottomSheetRef: React.RefObject<BottomSheetMethods> | null;
  bottomSheetType: SheetType;
}>({
  bottomSheetRef: null,
  bottomSheetType: 'approval',
});

const DispatchContext = createContext<{
  openBottomSheet: (sheetType: SheetType) => void;
  closeBottomSheet: () => void;
}>({
  openBottomSheet: _ => {},
  closeBottomSheet: () => {},
});

type Props = {};

export function WalletConnectBottomSheetProvider({
  children,
}: PropsWithChildren<Props>): React.JSX.Element {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetType, setBottomSheetType] = useState<SheetType>('none');

  const openBottomSheet = useCallback((sheetType: SheetType) => {
    setBottomSheetType(sheetType);
    bottomSheetRef.current?.expand();
  }, []);

  const closeBottomSheet = useCallback(() => {
    setBottomSheetType('none');
    bottomSheetRef.current?.close();
  }, []);

  return (
    <StateContext.Provider value={{bottomSheetRef, bottomSheetType}}>
      <DispatchContext.Provider value={{openBottomSheet, closeBottomSheet}}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export const useWalletConnectBottomSheetState = () => useContext(StateContext);
export const useWalletConnectBottomSheetDispatch = () =>
  useContext(DispatchContext);
