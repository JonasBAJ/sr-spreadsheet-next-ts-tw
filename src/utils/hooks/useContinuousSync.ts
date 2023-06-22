// import { useCallback, useEffect, useRef } from 'react';
// import { Api } from '../../apis/api';
// import { sheetToCsv } from '../csv';
// import { toast } from 'react-hot-toast';
// import { useGlobalState } from './useGlobalState';

// export const useContinuousSync = () => {
//   const initialRun = useRef(true);
//   const { sheets } = useGlobalState();
//   const sheet = sheets.selectedSheet;
//   const updatedAtRef = useRef(sheet?.updatedAt);

//   console.log({
//     status: sheets.selectedSheet?.status,
//     serverId: sheets.selectedSheet?.serverId,
//     updatedAt: sheets.selectedSheet?.updatedAt,
//   })

//   const checkStatus = useCallback(async () => {
//     try {
//       if (sheet?.serverId) {
//         const res = await Api.getStaus(sheet.serverId);
//         sheet?.setMeta(res.status);
//         if (!sheet.updatedAt) {
//           sheet.updateTimestamp()
//         }
//       }
//     } catch (e) {
//       console.log(e);
//       sheet?.setMeta('ERROR');
//       toast.error('Error while checking status... Retying now!');
//     }
//   }, [sheet]);

//   const saveSheet = useCallback(async () => {
//     if (!sheet) return;
//     try {
//       const csv = sheetToCsv(sheet);
//       sheet?.setMeta('IN_PROGRESS');
//       const res = await Api.saveCsvSheet(csv);
//       sheet?.setMeta(res.status, res.id, res.done_at);
//     } catch (e: any) {
//       console.log(e);
//       sheet?.setMeta('ERROR');
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
//         console.log('IN_PROGRESS')
//         const timeout = setTimeout(checkStatus, 15000);
//         return () => clearTimeout(timeout);
//       }
//     }
//   }, [sheet?.status, initialRun])

//   // Save data after cell updates
//   useEffect(() => {
//     if (updatedAtRef.current !== sheet?.updatedAt) {
//       saveSheet();
//       updatedAtRef.current = sheet?.updatedAt;
//     }
//   }, [updatedAtRef, sheet?.updatedAt])
// }
