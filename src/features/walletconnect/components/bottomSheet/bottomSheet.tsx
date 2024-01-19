import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import {
  INIT_BOTTOM_SHEET_INDEX,
  SNAP_POINTS,
  useWalletConnectBottomSheetState,
} from '../../context/bottomSheetProvider';
import {CustomBottomSheetBackdrop} from './backdrop';
import {ApprovalSheet} from './sheets/approval';
import {SendTransactionSheet} from './sheets/sendTransaction';
import {SignSheet} from './sheets/sign';
import {SignTypedDataSheet} from './sheets/signTypedData';

export function WalletConnectBottomSheet(): React.JSX.Element {
  const {bottomSheetType} = useWalletConnectBottomSheetState();
  const {bottomSheetRef} = useWalletConnectBottomSheetState();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={INIT_BOTTOM_SHEET_INDEX}
      snapPoints={SNAP_POINTS}
      backdropComponent={CustomBottomSheetBackdrop}
      enablePanDownToClose
      // backgroundStyle={isDarkTheme ? styles.bottomSheet_dark : styles.bottomSheet_light}
    >
      {bottomSheetType === 'approval' && <ApprovalSheet />}
      {bottomSheetType === 'sign' && <SignSheet />}
      {bottomSheetType === 'sendTransaction' && <SendTransactionSheet />}
      {bottomSheetType === 'signTypedData' && <SignTypedDataSheet />}
    </BottomSheet>
  );
}

// const styles = StyleSheet.create({
//   bottomSheet_light: {
//     backgroundColor: COLORS.BG_PRIMARY,
//   },
//   bottomSheet_dark: {
//     backgroundColor: COLORS.BG_PRIMARY_DARK,
//   },
// });
