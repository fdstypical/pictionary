import { WindowSize } from '@/utils/typings';

export default (): WindowSize => ({
  width: window.innerWidth,
  height: window.innerHeight,
});
