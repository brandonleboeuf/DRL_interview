import { useEffect, useState } from 'react'
import './App.css'

const url = 'https://jsonplaceholder.typicode.com/users'

const App = () => {
  const [data, setData] = useState([])

  // The first time the app renders, it will fetch the data from the api
  useEffect(() => {
    async function getData() {
      const res = await fetch(url).then((result) => result.json())
      setData([...res])
    }
    getData()
  }, [])

  // this adds the first names to a new array to be displayed at the bottom of the page
  const firstNames = []
  for (let fullName of data) {
    // breaks out only the first two parts of each name 
    let firstTwo = fullName.name.split(' ')
    firstNames.push(`${firstTwo[0]} ${firstTwo[1]}`)
  }

  let connectedNames = firstNames.join(', ')

  return (
    <div className="App">
      {/* only displays the names which do not start with 'M' or 'K' */}
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
                  {/* replaces all "(" or ")" with dashes  */}
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
