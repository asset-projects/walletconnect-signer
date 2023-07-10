import BottomSheet from '@gorhom/bottom-sheet';
import type {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
  useMemo,
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

export const WalletConnectBottomSheetProvider: FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetType, setBottomSheetType] = useState<SheetType>('none');

  const dispatchValues = useMemo(() => {
    const openBottomSheet = (sheetType: SheetType) => {
      setBottomSheetType(sheetType);
      bottomSheetRef.current?.expand();
    };

    const closeBottomSheet = () => {
      setBottomSheetType('none');
      bottomSheetRef.current?.close();
    };

    return {
      openBottomSheet,
      closeBottomSheet,
    };
  }, []);

  return (
    <StateContext.Provider value={{bottomSheetRef, bottomSheetType}}>
      <DispatchContext.Provider value={dispatchValues}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useWalletConnectBottomSheetState = () => useContext(StateContext);
export const useWalletConnectBottomSheetDispatch = () =>
  useContext(DispatchContext);
