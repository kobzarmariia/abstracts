# Features

## Next.js

https://github.com/zeit/next.js/

```
npm install --save next react react-dom
```

and add a script to your package.json like this:

```
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

Routing

```
import Link from 'next/router';
import Router from 'next/router';

<p>Go to: <Link href="/auth"><a>Auth</a></Link></p>
<button onClick={() => Router.push('/auth')}>Go to Auth</button>
```

File-system routing: ./pages (folder) + components folder

Styling

We bundle styled-jsx to provide support for isolated scoped CSS.

```
function HelloWorld() {
  return (
    <div>
      Hello world
      <p>scoped!</p>
      <style jsx>{` //Attention
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style>
    </div>
  )
}

export default HelloWorld
```

Custom error handling

404 or 500 errors are handled both client and server side by a default component \_error.js (in pages folder)

```
import React from 'react'

const Error = () => (
  <div>
    <h1>Error</h1>
    <p>Try go to: <Link href="/"><a>home</a></Link></p>
  </div>
)

export default Error
```

Fetching data and component lifecycle

Init props before page is loaded.

Using a function component:

```
import fetch from 'isomorphic-unfetch'

function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page
```

Using a class component:

```
import React from 'react'

class HelloUA extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    return <div>Hello World {this.props.userAgent}</div>
  }
}

export default HelloUA
```
