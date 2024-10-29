import React from 'react'

const Table = ({data}) => {
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Pet</th>
                    <th>Breed</th>
                    <th>Name</th>
                    <th>Mail</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row)=>(
                    <tr>
                        <td>{row.petName}</td>
                        <td>{row.breed}</td>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.number}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table
