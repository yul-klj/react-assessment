import React, { useState, useEffect, useMemo, useRef } from "react"
import BookDataService from "../services/BookService"
import { useTable, useSortBy, usePagination } from "react-table"

const BookList = (props) => {
  const [books, setBooks] = useState([])
  const [searchKeyword, setSearchKeyword] = useState("")
  const bookRef = useRef()

  bookRef.current = books

  useEffect(() => {
    retrieveBooks()
  }, [])

  const onChangeSearchKeyword = (e) => {
    const searchKeyword = e.target.value
    setSearchKeyword(searchKeyword)
  }

  const retrieveBooks = () => {
    BookDataService.getAll()
      .then((response) => {
        setBooks(response.data.content.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const findByKeyword = () => {
    BookDataService.search(searchKeyword)
      .then((response) => {
        setBooks(response.data.content.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const bookDetail = (rowIndex) => {
    const id = bookRef.current[rowIndex].id

    props.history.push("/book/" + id)
  }

  const deleteBook = (rowIndex) => {
    const id = bookRef.current[rowIndex].id

    if (window.confirm('Are you sure you wish to delete this book?')) {
      BookDataService.remove(id)
        .then((response) => {
          props.history.push("/books")

          let newBook = [...bookRef.current]
          newBook.splice(rowIndex, 1)

          setBooks(newBook)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  const generateExport = () => {
    ExportService.generate(exportType, exportField)
      .then((response) => {
        setExportedId(response.data.content.data.id)
        console.log('initialized')
      })
      .then(() => {
        console.log('retrieving')
        const timer = setTimeout(() => {
          retrieveExport()
        }, 5000)
      })
      .catch((e) => {
        console.log(e)
      })

    
  }

  const retrieveExport = () => {
    console.log('called')
    console.log(exportedId);

    ExportService.retrieve(exportedId)
      .then((response) => {
        if (response.data.content.data.location) {
          console.log(response.data.content.data.location)
          setExportedUrl(response.data.content.data.location)
          setExportedId(null)
          const link = document.createElement('a');
          link.href = exportedUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .catch((e) => {
        console.log(e)
      })


    // if (exportedUrl) {
    //   console.log('window open')
    //   window.open(exportedUrl, '_blank')
    //   return () => clearTimeout(timer)
    // }

  }

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Author",
        accessor: "author",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id
          return (
            <div className="btn-toolbar" role="toolbar">
              <div className="btn-group me-2" role="group">
                <span onClick={() => bookDetail(rowIdx)}>
                  <i className="far fa-edit action mr-2"></i>
                </span>
              </div>
              <div className="btn-group me-2" role="group">
                <span onClick={() => deleteBook(rowIdx)}>
                  <i className="fas fa-trash action"></i>
                </span>
              </div>
            </div>
          )
        },
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: {pageIndex},
    prepareRow,
  } = useTable({
      columns,
      data: books
    },
    useSortBy,
    usePagination
  )

  return (
    <div className="list row">
      <div className="col-md-12">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by keyword"
            value={searchKeyword}
            onChange={onChangeSearchKeyword}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByKeyword}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (! column.isSortedDesc ? '⬆' : '⬇') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="flexbox text-end">
          <span>
            Page{' '}
            <strong>{pageIndex + 1} of {pageOptions.length}</strong>
          </span>{' '}
          <button className="btn btn-sm btn-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>◀</button>
          <button className="btn btn-sm btn-secondary" onClick={() => nextPage()} disabled={!canNextPage}>▶</button>
        </div>
      </div>
    </div>
  )
}

export default BookList