'use client'

import { useEffect, useRef, useState } from 'react'
import getLiveData from '@/lib/api/getLiveData'
import { readLocalStorage, writeLocalStorage } from '@/utils/localstorage'

const fetchDataWithCache = async (
  key: string,
  lifetime: number,
  use_local_storage: boolean = true,
) => {
  const cache_key: string = `sdd_api_cache_${key}`

  // check for cached data in localStorage
  if (use_local_storage) {
    const data = readLocalStorage(cache_key)

    if (data) {
      return data
    }
  }

  // fetch new data if cache is expired or doesn't exist
  try {
    const payload = await getLiveData(key, lifetime)

    if (payload !== null && payload !== '') {
      if (use_local_storage) {
        writeLocalStorage(cache_key, payload, lifetime)
      }

      return payload
    }
  } catch (error) {
    throw new Error('Failed to fetch data')
  }

  return null
}

export default function useApi<T>(
  key: string,
  lifetime: number = 30,
  auto_update: boolean = true,
) {
  const [data, setData] = useState<T | null>(null)
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const isFetching = useRef(false)

  useEffect(() => {
    const fetchData = () => {
      if (isFetching.current) {
        return
      }

      isFetching.current = true
      setStatus('loading')

      fetchDataWithCache(key, lifetime)
        .then(result => {
          if (result) {
            setData(result)
            setStatus('success')
          } else {
            setData(null)
            setStatus('error')
          }
        })
        .catch(() => {
          setData(null)
          setStatus('error')
        })
        .finally(() => {
          isFetching.current = false
        })
    }

    // fetch data immediately
    fetchData()

    // set up interval to refresh data after the defined lifetime
    if (auto_update && lifetime > 0) {
      const interval = setInterval(fetchData, lifetime * 60 * 1000)

      // cleanup interval on component unmount
      return () => clearInterval(interval)
    }
  }, [key, lifetime])

  return { data, status }
}
