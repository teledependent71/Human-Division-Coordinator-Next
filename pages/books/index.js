import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import booksPageInitialProps68c5cResource from '../../resources/books-page-initial-props-68c5c'

const Books = (props) => {
  return (
    <>
      <div className="books-container">
        <Head>
          <title>Books - Human Division Coordinator</title>
          <meta
            property="og:title"
            content="Books - Human Division Coordinator"
          />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(BooksEntities) => (
                  <>
                    <div className="books-container1">
                      <h1>{BooksEntities?.title}</h1>
                      <span>{BooksEntities?.title}</span>
                      <span>{BooksEntities?.price}</span>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.booksEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .books-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .books-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Books.defaultProps = {
  booksEntities: [],
}

Books.propTypes = {
  booksEntities: PropTypes.array,
}

export default Books

export async function getStaticProps(context) {
  try {
    const response = await booksPageInitialProps68c5cResource({
      ...context?.params,
    })
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        booksEntities: response,
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
