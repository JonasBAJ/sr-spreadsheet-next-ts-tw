import { useCallback, useEffect, useRef } from 'react';
import { ISheetsState, useSheets } from '../../state/sheets'
import { Api } from '../../apis/api';
import { sheetToCsv } from '../csv';
import { toast } from 'react-hot-toast';

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

  const checkStatus = useCallback(async () => {
    try {
      if (sheet?.serverId) {
        const res = await Api.getStaus(sheet.serverId);
        updateSheet({
          status: res.status,
        });
      }
    } catch (e) {
      console.log(e);
      updateSheet({ status: 'ERROR' });
    }
  }, [sheet]);

  const saveSheet = useCallback(async () => {
    if (!sheet) return;
    try {
      const csv = sheetToCsv(sheet);
      updateSheet({ status: 'IN_PROGRESS' });
      const res = await Api.saveCsvSheet(csv);
      updateSheet({
        serverId: res.id,
        savedAt: res.done_at,
        status: res.status,
      });
    } catch (e: any) {
      console.log(e);
      updateSheet({ status: 'ERROR' });
    }
  }, [sheet])

  useEffect(() => {
    if (updatedAtRef.current !== sheet?.updatedAt) {
      saveSheet();
      console.log('saveSheet')
      updatedAtRef.current = sheet?.updatedAt;
    }
  }, [sheet?.updatedAt]);

  useEffect(() => {
    if (sheet?.status === 'ERROR') {
      console.log('reSaveSheet')
      // saveSheet();
    } else if (sheet?.status === 'IN_PROGRESS' && sheet?.savedAt) {
      const now = new Date();
      const savedAt = new Date(sheet?.savedAt);
      if (now > savedAt) {
        checkStatus()
      }
    }
  }, [sheet?.status])
}
