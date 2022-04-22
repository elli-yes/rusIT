import { useMemo } from "react"

export const useSortedStreams = (streams, selectedSort) => {
  console.log("LEN", streams)
  const sortedStreams = useMemo(() => {
    if (selectedSort === "status") {
      return [...streams].sort((a, b) =>
        a[selectedSort] > b[selectedSort] ? -1 : 1
      )
    } else {
      return [...streams].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      )
    }
  }, [selectedSort, streams])
  return sortedStreams
}

export const useStreams = (streams, sort, searchQuerry) => {
  const sortedStreams = useSortedStreams(streams, sort)

  const sortedAndSearched = useMemo(() => {
    return sortedStreams.filter(
      (stream) =>
        stream.stream_title
          .toLowerCase()
          .includes(searchQuerry.toLowerCase()) ||
        stream.username.toLowerCase().includes(searchQuerry.toLowerCase())
    )
  }, [searchQuerry, sortedStreams])
  return sortedAndSearched
}
