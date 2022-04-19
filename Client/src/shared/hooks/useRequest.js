import { useCallback, useState, useMemo } from "react"

export function useRequest(req) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)

  const request = useCallback(
    async (...args) => {
      setLoading(true)
      try {
        const data = await req(...args)
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    },
    [req]
  )
  return useMemo(() => {
    return { request, data, error, loading }
  }, [request, data, error, loading])
}
