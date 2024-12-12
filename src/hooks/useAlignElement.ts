import { useSetRecoilState } from 'recoil';
import { alignState } from '../store/recoil';
import { ALIGN_DIRECTIONS, ALIGN_KEYS } from '../constants';

const useAlignElement = () => {
  const setAlignment = useSetRecoilState(alignState);

  const handleAlignElement = (key: string, selectedGroupId?: string) => {
    if (key === ALIGN_KEYS.ALL_VERTICAL || key === ALIGN_KEYS.ALL_HORIZONTAL) {
      // 전체 정렬 상태 업데이트
      setAlignment((prev) => ({
        ...prev,
        global: key === ALIGN_KEYS.ALL_VERTICAL ? ALIGN_DIRECTIONS.VERTICAL : ALIGN_DIRECTIONS.HORIZONTAL,
      }));
    } else if ((key === ALIGN_KEYS.GROUP_VERTICAL || key === ALIGN_KEYS.GROUP_HORIZONTAL) && selectedGroupId) {
      // 그룹별 정렬 상태 업데이트
      setAlignment((prev) => ({
        ...prev,
        groups: {
          ...prev.groups,
          [selectedGroupId]:
            key === ALIGN_KEYS.GROUP_VERTICAL ? ALIGN_DIRECTIONS.VERTICAL : ALIGN_DIRECTIONS.HORIZONTAL,
        },
      }));
    }
  };

  return { handleAlignElement };
};

export default useAlignElement;
