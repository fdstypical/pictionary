import { useState, useEffect } from 'react';

import { WindowSize } from '@/utils/typings';
import getSize from '@/utils/common/getWindowSize';

const useResize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>(getSize);

  useEffect(() => {
    function handleResize() {
      setSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

export default useResize;
