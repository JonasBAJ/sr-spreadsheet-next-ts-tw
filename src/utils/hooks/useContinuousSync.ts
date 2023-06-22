// import { useCallback, useEffect, useRef } from 'react';
// import { ISheetsState, useSheets } from '../../state/sheets'
// import { Api } from '../../apis/api';
// import { sheetToCsv } from '../csv';
// import { toast } from 'react-hot-toast';

// const selector = (s: ISheetsState) => {
//   const selectedId = s.selectedSheetId;
//   const sheet = selectedId ? s.sheets[selectedId] : null;
//   return {
//     sheet,
//     updateSheet: s.updateSheet,
//   }
// }

// export const useContinuousSync = () => {
//   const initialRun = useRef(true);
//   const { sheet, updateSheet } = useSheets(selector);
//   const updatedAtRef = useRef(sheet?.updatedAt);

//   const checkStatus = useCallback(async () => {
//     try {
//       if (sheet?.serverId) {
//         const res = await Api.getStaus(sheet.serverId);
//         updateSheet({
//           status: res.status,
//         });
//       }
//     } catch (e) {
//       console.log(e);
//       updateSheet({ status: 'ERROR' });
//       toast.error('Error while checking status... Retying now!');
//     }
//   }, [sheet]);

//   const saveSheet = useCallback(async () => {
//     if (!sheet) return;
//     try {
//       const csv = sheetToCsv(sheet);
//       updateSheet({ status: 'IN_PROGRESS' });
//       const res = await Api.saveCsvSheet(csv);
//       updateSheet({
//         serverId: res.id,
//         savedAt: res.done_at,
//         status: res.status,
//       });
//     } catch (e: any) {
//       console.log(e);
//       updateSheet({ status: 'ERROR' });
//       toast.error('Error while saving data... Retying now!')
//     }
//   }, [sheet])

//   // Check or save data on initial load
//   useEffect(() => {
//     if (sheet && initialRun.current) {
//       if (!sheet?.serverId) {
//         saveSheet();
//       } else if (sheet.status !== 'DONE') {
//         checkStatus();
//       }
//       initialRun.current = false;
//     }
//   }, [sheet, initialRun, checkStatus, saveSheet])

//   // Handle Error and InProgress cases
//   useEffect(() => {
//     if (!initialRun.current) {
//       if (sheet?.status === 'ERROR') {
//         saveSheet();
//       } else if (sheet?.status === 'IN_PROGRESS') {
//         const timeout = setTimeout(checkStatus, 15000);
//         return () => clearTimeout(timeout);
//       }
//     }
//   }, [sheet, initialRun])

//   // Save data after cell updates
//   useEffect(() => {
//     if (updatedAtRef.current !== sheet?.updatedAt) {
//       saveSheet();
//       updatedAtRef.current = sheet?.updatedAt;
//     }
//   }, [updatedAtRef, sheet])
// }
