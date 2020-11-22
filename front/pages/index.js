import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

const baseUrl = process.env.NEXT_API_URL || 'http://localhost:8080/'

export default function Home(props) {
  const [data, setData] = useState({})
  const [loginId, setLoginId] = useState('test')
  const [password, setPassword] = useState('password')

  const onSubmit = async () => {
    const data = await axios.post(baseUrl + 'login', {
      loginId,
      password
    }, { withCredentials: true })
    if (data) {
      alert('login success')
    }
  }

  const onLogout = async () => {
    if (data) {
      alert('logout success')
    }
  }

  console.log('props', props)

  return (
    <div className="container">
      <div>
        <div>
          {JSON.stringify(data)}
        </div>
      </div>
      <button onClick={onSubmit}>Login</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export async function getServerSideProps(context) {
  console.log('header', context.req.headers.cookie)
  let user
  try {
    const res = await axios.get(baseUrl, { withCredentials: true, headers: {
        Cookie: context.req.headers.cookie
      }
    })
    console.log(res.request.cookie)
    user = res.data
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
      user: user || {}
    }, // will be passed to the page component as props
  }
}
