import type { ConfigurableWindow } from '@vueuse/core'
import { defaultWindow, pausableWatch, useEventListener } from '@vueuse/core'
import { reactive } from 'vue'

export type UrlParams = Record<string, string[] | string>

export interface UseUrlSearchParamsOptions<T> extends ConfigurableWindow {
  /**
   * @default true
   */
  removeNullishValues?: boolean

  /**
   * @default false
   */
  removeFalsyValues?: boolean

  /**
   * @default {}
   */
  initialValue?: T

  /**
   * @default true
   */
  clearOnDefault?: boolean

  /**
   * Write back to `window.history` automatically
   *
   * @default true
   */
  write?: boolean

  /**
   * Write mode for `window.history` when `write` is enabled
   * - `replace`: replace the current history entry
   * - `push`: push a new history entry
   * @default 'push'
   */
  writeMode?: 'replace' | 'push'
}

/**
 * Reactive URLSearchParams
 *
 * @see https://vueuse.org/useUrlSearchParams
 * @param mode
 * @param options
 */
export function useQueryState<T extends Record<string, any> = UrlParams>(
  mode: 'history' | 'hash' | 'hash-params' = 'history',
  options: UseUrlSearchParamsOptions<T> = {},
): T {
  const {
    initialValue = {} as T,
    clearOnDefault = true,
    removeNullishValues = true,
    removeFalsyValues = false,
    write: enableWrite = true,
    writeMode = 'push',
    window = defaultWindow!,
  } = options

  if (!window)
    return reactive(initialValue) as T

  const state: Record<string, any> = reactive({}) as T

  function getRawParams() {
    if (mode === 'history') {
      return window.location.search || ''
    }
    else if (mode === 'hash') {
      const hash = window.location.hash || ''
      const index = hash.indexOf('?')
      return index > 0 ? hash.slice(index) : ''
    }
    else {
      return (window.location.hash || '').replace(/^#/, '')
    }
  }

  function constructQuery(params: URLSearchParams) {
    const stringified = params.toString()

    if (mode === 'history')
      return `${stringified ? `?${stringified}` : ''}${window.location.hash || ''}`
    if (mode === 'hash-params')
      return `${window.location.search || ''}${stringified ? `#${stringified}` : ''}`
    const hash = window.location.hash || '#'
    const index = hash.indexOf('?')
    if (index > 0)
      return `${window.location.search || ''}${hash.slice(0, index)}${stringified ? `?${stringified}` : ''}`
    return `${window.location.search || ''}${hash}${stringified ? `?${stringified}` : ''}`
  }

  function read() {
    return new URLSearchParams(getRawParams())
  }

  function updateState(params: URLSearchParams) {
    const unusedKeys = new Set(Object.keys(state))
    for (const key of params.keys()) {
      const paramsForKey = params.getAll(key)
      state[key]
        = paramsForKey.length > 1 ? paramsForKey : params.get(key) || ''
      unusedKeys.delete(key)
    }

    Object.keys(initialValue).forEach((key) => {
      if (!(key in state) || state[key] === undefined) {
        state[key] = initialValue[key]
      }
    })

    Array.from(unusedKeys).forEach(key => delete state[key])
  }

  const { pause, resume } = pausableWatch(
    state,
    () => {
      const params = new URLSearchParams('')
      Object.keys(state).forEach((key) => {
        const mapEntry = state[key]
        if (
          mapEntry === initialValue[key]
          || (mapEntry === '' && clearOnDefault)
        ) {
          params.delete(key)
        }
        else if (Array.isArray(mapEntry)) {
          mapEntry.forEach(value => params.append(key, value))
        }
        else if (removeNullishValues && mapEntry == null) {
          params.delete(key)
        }
        else if (removeFalsyValues && !mapEntry) {
          params.delete(key)
        }
        else {
          params.set(key, mapEntry)
        }
      })
      write(params, false)
    },
    { deep: true },
  )

  function write(params: URLSearchParams, shouldUpdate: boolean) {
    pause()

    if (shouldUpdate)
      updateState(params)

    if (writeMode === 'replace') {
      window.history.replaceState(
        window.history.state,
        window.document.title,
        window.location.pathname + constructQuery(params),
      )
    }
    else {
      window.history.pushState(
        window.history.state,
        window.document.title,
        window.location.pathname + constructQuery(params),
      )
    }

    resume()
  }

  function onChanged() {
    if (!enableWrite)
      return

    write(read(), true)
  }

  useEventListener(window, 'popstate', onChanged, false)
  if (mode !== 'history')
    useEventListener(window, 'hashchange', onChanged, false)

  const initial = read()
  if (initial.keys().next().value) {
    updateState(initial)
  }
  else {
    Object.assign(state, initialValue)
  }

  return state as T
}

export function getDefaultThrottle() {
  if (typeof window === 'undefined')
    return 50
  // https://stackoverflow.com/questions/7944460/detect-safari-browser
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const isSafari = Boolean(window.GestureEvent)
  if (!isSafari) {
    return 50
  }
  try {
    const match = navigator.userAgent?.match(/version\/([\d.]+) safari/i)
    return Number.parseFloat(match![1]!) >= 17 ? 120 : 320
  }
  catch {
    return 320
  }
}
