import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import testPageResource from '../resources/test-page'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Human Division Coordinator</title>
          <meta
            property="og:title"
            content="test-page - Human Division Coordinator"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_scjnce) => (
            <>
              <h1>{context_scjnce?.name}</h1>
            </>
          )}
          initialData={props.contextScjnceProp}
          persistDataDuringLoading={true}
          key={props?.contextScjnceProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextScjnceProp = await testPageResource({
      ...context?.params,
    })
    return {
      props: {
        contextScjnceProp: contextScjnceProp?.data?.[0],
      },
    }
  } catch (errro) {
    return {
      notFound: true,
    }
  }
}
