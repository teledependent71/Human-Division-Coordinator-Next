import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import Markdown from 'markdown-to-jsx'
import PropTypes from 'prop-types'

import booksPageInitialPaths79d82Resource from '../../resources/books-page-initial-paths-79d82'
import booksPageInitialPropsA63b2Resource from '../../resources/books-page-initial-props-a63b2'

const Books11 = (props) => {
  return (
    <>
      <div className="books11-container">
        <Head>
          <title>Books1 - Human Division Coordinator</title>
          <meta
            property="og:title"
            content="Books1 - Human Division Coordinator"
          />
        </Head>
        <DataProvider
          renderSuccess={(BooksEntity) => (
            <>
              <div className="books11-container1">
                <h1>{BooksEntity?.title}</h1>
                <span>{BooksEntity?.price}</span>
                <span>{BooksEntity?.Description}</span>
                <div className="books11-container2">
                  <Markdown>{BooksEntity?.Content}</Markdown>
                </div>
              </div>
            </>
          )}
          initialData={props.booksEntity}
          persistDataDuringLoading={true}
          key={props?.booksEntity?.id}
        />
      </div>
      <style jsx>
        {`
          .books11-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .books11-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .books11-container2 {
            width: 100%;
            align-self: stretch;
          }
        `}
      </style>
    </>
  )
}

Books11.defaultProps = {
  booksEntity: [],
}

Books11.propTypes = {
  booksEntity: PropTypes.array,
}

export default Books11

export async function getStaticPaths() {
  const response = await booksPageInitialPaths79d82Resource({})
  return {
    paths: (response?.data || []).map((item) => {
      return {
        params: {
          id: (item?.id).toString(),
        },
      }
    }),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  try {
    const response = await booksPageInitialPropsA63b2Resource({
      ...context?.params,
    })
    if (!response?.data?.[0]) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        booksEntity: response?.data?.[0],
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
