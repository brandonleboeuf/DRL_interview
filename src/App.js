import './App.css'
import { useEffect, useState } from 'react'
const url = 'https://jsonplaceholder.typicode.com/users'

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    async function getData() {
      const res = await fetch(url).then((result) => result.json())
      setData([...res])
    }
    getData()
  }, [])

  const firstNames = []

  for (let name of data) {
    firstNames.push(name.name)
  }

  let connectedNames = firstNames.join(', ')
  console.log(firstNames)

  return (
    <div className="App">
      {data
        ?.filter((person) => person.name[0] !== 'M')
        .filter((person) => person.name[0] !== 'K')
        .map((item) => {
          return (
            <section key={item.id} className="contact">
              <div>
                {item.name} | {item.email}
              </div>
              <div className="phone">
                <p>#</p>{' '}
                <p className="center">
                  {item.phone.replace(/[)]/g, '-').replace(/[(]/g, '-')}
                </p>
                <p> </p>
              </div>
            </section>
          )
        })}
      <p className="numberThree">{connectedNames}</p>
    </div>
  )
}

export default App
