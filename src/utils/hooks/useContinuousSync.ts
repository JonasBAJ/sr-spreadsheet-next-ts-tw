import { useCallback, useEffect, useRef } from 'react';
import { ISheetsState, useSheets } from '../../state/sheets'
import { Api } from '../../apis/api';
import { sheetToCsv } from '../csv';


const selector = (s: ISheetsState) => {
  const selectedId = s.selectedSheetId;
  const sheet = selectedId ? s.sheets[selectedId] : null;
  return {
    sheet,
    updateSheet: s.updateSheet,
  }
}

export const useContinuousSync = () => {
  const { sheet, updateSheet } = useSheets(selector);
  const updatedAtRef = useRef(sheet?.updatedAt);

  const saveSheet = async () => {
    try {
      const csv = sheetToCsv(sheet);
      const res = await Api.saveCsvSheet(csv);
      updateSheet({
        serverId: res.id,
        savedAt: res.done_at,
        status: res.status,
      });
    } catch (e) {
      console.log(e);
    }
  }

  const checkStatus = async () => {
    try {
      if (sheet?.serverId) {
        const res = await Api.getStaus(sheet.serverId);
        updateSheet({
          status: res.status,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  const syncSheet = useCallback(() => {
    if (!sheet) return;
    if (!sheet?.serverId) {
      saveSheet();
    } else if (sheet?.status === 'DONE' && sheet?.savedAt && sheet?.updatedAt) {
      const savedAt = new Date(sheet.savedAt);
      const updatedAt = new Date(sheet.updatedAt);
      if (updatedAt > savedAt) {
        saveSheet();
      }
    } else if (sheet?.status === 'IN_PROGRESS') {
      checkStatus();
    }
  }, [checkStatus, saveSheet, sheet]);

  useEffect(() => {
    if (updatedAtRef.current !== sheet?.updatedAt) {
      syncSheet();
      updatedAtRef.current = sheet?.updatedAt;
    }
  }, [sheet?.updatedAt]);
}
