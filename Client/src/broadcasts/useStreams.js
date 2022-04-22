import { useMemo } from "react"

export const useSortedStreams = (streams, selectedSort) => {
  if (selectedSort === "status") {
    return [...streams].sort((a, b) =>
      a[selectedSort] > b[selectedSort] ? -1 : 1
    )
  } else {
    return [...streams].sort((a, b) =>
      a[selectedSort].localeCompare(b[selectedSort])
    )
  }
}

export const useStreams = (streams, sort, searchQuerry) => {
  const sortedStreams = useSortedStreams(streams, sort)
  const sortedAndSearched = () => {
    return sortedStreams.filter(
      (stream) =>
        stream.stream_title
          .toLowerCase()
          .includes(searchQuerry.toLowerCase()) ||
        stream.username.toLowerCase().includes(searchQuerry.toLowerCase())
    )
  }
  return sortedAndSearched
}
