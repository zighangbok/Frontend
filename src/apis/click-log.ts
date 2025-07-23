import { axiosInstance } from '@/lib/axios';
import { ClickLogBody } from '@/types/click-log';

// click log
export async function postClickLog({ deviceId, itemId }: ClickLogBody) {
  const res = await axiosInstance.post('/click-log', {
    deviceId,
    itemId,
  });
  return res.data;
}
