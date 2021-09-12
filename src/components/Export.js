import React, { useState } from "react"
import ExportService from "../services/ExportService"
import Select from 'react-select'

const Export = () => {
  const [exportType, setExportType] = useState("")
  const [exportField, setExportField] = useState("")
  const [exportedId, setExportedId] = useState("")
  const [exportedUrl, setExportedUrl] = useState("")

  const exportTypeChoice = [
    { value: 'CSV', label: 'CSV' },
    { value: 'XML', label: 'XML' }
  ]

  const exportColumnChoice = [
    { value: '', label: 'All' },
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' }
  ]

  const exportTypeSelected = (e) => {
    setExportType(e.value)
  }

  const exportFieldSelected = (e) => {
    setExportField(e.value)
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

  return (
    <div>
      <h3>Export Feature</h3>
      <div className="input-group mb-3 w-50">
        <span htmlFor="type" className="input-group-text">Type</span>
        <Select className="form-control" id="type" options={exportTypeChoice} onChange={exportTypeSelected}/>
      </div>

      <div className="input-group mb-3 w-50">
        <span htmlFor="field" className="input-group-text">Field</span>
        <Select className="form-control" id="field" options={exportColumnChoice} onChange={exportFieldSelected}/>
      </div>

      <div className="w-50 text-end" role="group">
        <button className="btn btn-sm btn-success" onClick={generateExport}>
          Export CSV
        </button>
      </div>
    </div>
  )
}

export default Export