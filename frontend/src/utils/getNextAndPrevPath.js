const getNextAndPrevPath = (menu, location) => {
  const { pathname, state } = location
  const result = { prev: '', next: '' }
  if (pathname === '/') {
    result.prev = {
      pathname: '/contact',
      state: { prev: true, index: 10 }
    }
    result.next = {
      pathname: `/${menu[0].meta.slug}`,
      state: { prev: true, index: -1 }
    }
  } else {
    for (let i = 0; i < menu.length; i += 1) {
      if (pathname === `/${menu[i].meta.slug}`) {
        if (i === 0) {
          result.prev = {
            pathname: `/`,
            state: { prev: false, index: -1 }
          }
          result.next = {
            pathname: `/${menu[i + 1].meta.slug}`,
            state: { prev: state ? state.index < i : false }
          }
        } else {
          result.prev = {
            pathname: `/${menu[i - 1].meta.slug}`,
            state: { prev: state ? state.index < i : false }
          }
          if (i < menu.length - 1) {
            result.next = {
              pathname: `/${menu[i + 1].meta.slug}`,
              state: { prev: state ? state.index < i : false }
            }
          }
        }
        if (i === menu.length - 1) {
          result.next = {
            pathname: '/contact',
            state: { prev: true, index: 10 }
          }
        }
      }
    }
  }

  return result
}

export default getNextAndPrevPath
