import { useMemo } from "react"
import { PerfTacker, query } from "src/utils"

/** 性能埋点hooks */
const usePerfTrack = (cid?: string) => {
  const _cid = cid ? cid : query().cid
  const perfTrack = useMemo(() => new PerfTacker({ cid: _cid }), [_cid])
  return perfTrack
}

export default usePerfTrack
