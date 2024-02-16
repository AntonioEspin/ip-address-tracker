import {config} from './config.js'
const input = document.querySelector('#ip-input')
const button = document.querySelector('.header label div')
button.addEventListener('click', handleModal)

let map
function handleModal () {
  const modal = document.querySelector('.modal')
  modal.style.display = 'flex'

  // Llama a la funcion que se encarga del fetch de datos
  getFetchData()
  .then(info => {

    const {lat, lng} = info.location

    if (map) {
      map.setView([lat, lng], 13)
    } else {
      map = L.map('map').setView([lat, lng], 13);
  
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
    }
    
    
    let marker = L.marker([lat, lng]).addTo(map);

    const ipInfo = info.ip
    const {region, city, timezone} = info.location
    const isp = info.isp

    // Obtener modal para agregarle dinamicamente valores de la API
      const modalsInfo = document.querySelectorAll('.modal-info')

      const infos = document.querySelectorAll('.info')

      if (infos) {
        infos.forEach(element => {
          element.remove()
        })
      }
      
      const firstChild = modalsInfo[0]
      const ipAddres = document.createElement('span')
      ipAddres.classList.add('info')
      ipAddres.textContent = `${ipInfo}`
      firstChild.appendChild(ipAddres)
    
      const secondChild = modalsInfo[1]
      const locationInfo = document.createElement('span')
      locationInfo.classList.add('info')
      locationInfo.textContent = `${region}, ${city}`
      secondChild.appendChild(locationInfo)
    
      const thirdChild = modalsInfo[2]
      const timezoneInfo = document.createElement('span')
      timezoneInfo.classList.add('info')
      timezoneInfo.textContent = `UTC ${timezone}`
      thirdChild.appendChild(timezoneInfo)
    
      const fourthChild = modalsInfo[3]
      const ispInfo = document.createElement('span')
      ispInfo.classList.add('info')
      ispInfo.textContent = `${isp}`
      fourthChild.appendChild(ispInfo)
  })
}

const API_KEY = config.API_KEY
const API = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=`


function getFetchData () {
  return fetch(`${API}${input.value}`)
    .then(res => res.json())
    .then(data => data)
}











