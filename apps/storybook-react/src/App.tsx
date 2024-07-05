/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-07-03 18:37:12
 * @LastEditors: caixin
 * @LastEditTime: 2024-07-05 16:38:52
 * @Description: file content
 */
import { useState,Suspense,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { atom, useAtom } from 'jotai'
import ErrorBounding from './components/ErrorBounding/index'
import { ErrorBoundary } from "react-error-boundary";
import {  animated, useSpring ,useSprings,useTrail} from '@react-spring/web'
import Transition from './components/TransitioGroup'

const userAtom = atom(async () => {
  const userId = 1;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}?_delay=2000`
  )
  return response.json()
})
const UserName = () => {
  const [user] = useAtom(userAtom)
  return <div>User name: {user.name}</div>
}

/**suspense errorbounding原理 */
// 如果 throw 的是 error，就是 error boundary 的处理逻辑，找最近的一个 ErrorBoundary 组件来处理。

// 如果 throw 的是 promise，则是 suspense boundary 的处理逻辑，找最近的 Suspense 组件来处理
let data, promise;
function fetchData() {
  if (data) return data;
  promise = new Promise(resolve => {
    setTimeout(() => {
      data = '取到的数据'
      resolve()
    }, 2000)
  })
  throw promise;
}

function Content() {
  const data = fetchData();
  return <p>{data}</p>
}
function Bbb() {
    useEffect(() => {
        throw new Error('xxx');
    }, [])
    return <div>bbb</div>
}
function App() {
   const [styles, api] = useSpring(() => {
    return {
      from: {
        width: 100,
        height: 100
      },
      config: {
        // duration: 2000
        mass: 2,
        friction: 10,
        tension: 400
      }
    }
  });
 console.log(api);
 
  function clickHandler() {
    api.start({
      width: 200,
      height: 200
    });
  }
  // const styles = useSpring({
  //   from: {
  //     width: 0,
  //     height: 0
  //   },
  //   to: {
  //     width: 200,
  //     height: 200
  //   },
  //   config: {
  //     duration: 2000
  //   }
  // });
  //  useEffect(() => {
  //   // width.start(300);
  // }, []);
  const [count, setCount] = useState(0)
  // const b = window.a.b;

   const [springs, ] = useSprings(
    3,
    () => ({
      from: { width: 0 },
      to: { width: 300 },
      config: {
        duration: 1000
      }
    })
   )
   const [springss, apiss] = useTrail(
    3,
    () => ({
      from: { width: 0 },
      config: {
        duration: 1000
      }
    })
  )

  useEffect(() => {
    apiss.start({ width: 300 });
  }, [])
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Hello, Somebody!</h1>
        <p className="mt-4 text-gray-600">学的不仅是技术，更是梦想！</p>
        <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
         点我试试
        </button>
      </div>
    </div>
      <Transition></Transition>
      <Viewpager></Viewpager>
       {springss.map(styles => (
      <animated.div style={styles} className='box'></animated.div>
    ))}
        {springs.map(styless => (
      <animated.div style={styless} className='box'></animated.div>
    ))}
      <animated.div className="box" style={{ ...styles }} onClick={clickHandler}></animated.div>
      <ErrorBoundary fallbackRender={({ error }) => {
        return <div>
        <p>出错了：</p>
        <div>{error.message}</div>
    </div>
  }}>
    <Bbb></Bbb>
  </ErrorBoundary>
    <Suspense fallback={'loading data'}>
      <Content />
    </Suspense>
      <div>
        <Suspense fallback="Loading...">
          <UserName />
        </Suspense>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
        </p>
    </>
  )
}
const WrapError = () => {
  return <ErrorBounding><App /></ErrorBounding>
}
export default WrapError


const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
]

function Viewpager() {
  const width = window.innerWidth;

  const [props, api] = useSprings(pages.length, i => ({
    x: i * width,
    scale: 1
  }));

  return (
    <div className='wrapper'>
      {props.map(({ x, scale }, i) => (
        <animated.div className='page' key={i} style={{ x }}>
          <animated.div style={{ scale, backgroundImage: `url(${pages[i]})` }} />
        </animated.div>
      ))}
    </div>
  )
}
